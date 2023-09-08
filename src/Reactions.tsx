import React, { cloneElement, useCallback, useMemo, useState } from 'react';
import EmojiPicker, { useRecentPicksPersistence } from 'rn-emoji-keyboard';
import type { ReactionGroupType, ReactionsProps } from './types';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import ButtonChip from './components/ButtonChip';
import ReactionsRecords from './ReactionsRecords';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'REACT-NATIVE-EMOJI-REACTIONS_RECENT';

export default function Reactions({
  currentUserId,
  reactions,
  hideAddButton,
  onAddReaction,
  onRemoveReaction,
  onOpenUserProfile,

  reactionsTheme,

  reactionsRecordsTheme,
  reactionsRecordsEnableGroupChangeAnimation = true,

  emojiPickerTheme,
  emojiPickerEmojiSize,
  emojiPickerExpandable,
  emojiPickerHideHeader,
  emojiPickerDefaultHeight,
  emojiPickerExpandedHeight,
  emojiPickerTranslation,
  emojiPickerDisabledCategories,
  emojiPickerEnableRecentlyUsed = true,
  emojiPickerCategoryPosition,
  emojiPickerEnableSearchBar = true,
  emojiPickerCategoryOrder,
  emojiPickerDisableSafeArea,
  emojiPickerEnableSearchAnimation,
  emojiPickerEnableCategoryChangeAnimation,
  emojiPickerEnableCategoryChangeGesture,
  emojiPickerEmojisByCategory,
}: ReactionsProps) {
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);
  const [reactionsRecordsOpened, setReactionsRecordsOpened] = useState(false);

  useRecentPicksPersistence({
    initialization: async () => {
      const item = await AsyncStorage.getItem(STORAGE_KEY);
      return JSON.parse(item || '[]');
    },
    onStateChange: (next) =>
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)),
  });

  const groupedReactions: ReactionGroupType[] = useMemo(() => {
    const groupedReactionsObj = reactions.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.emoji]: {
          emoji: curr.emoji,
          currentUserInIt:
            prev[curr.emoji]?.currentUserInIt === true
              ? true
              : curr.user.id === currentUserId,
          reactions: prev[curr.emoji]?.reactions
            ? [...prev[curr.emoji]!.reactions, curr]
            : [curr],
        },
      }),
      {} as {
        [emoji: string]: ReactionGroupType;
      }
    );

    let groupedReactionsArr = [];

    for (const [_, reactionGroup] of Object.entries(groupedReactionsObj)) {
      groupedReactionsArr.push(reactionGroup);
    }

    return groupedReactionsArr;
  }, [currentUserId, reactions]);

  const onLongPress = useCallback(() => {
    setReactionsRecordsOpened(true);
  }, []);

  const onPressButtonChip = useCallback(
    (reactionGroup: ReactionGroupType) => {
      if (reactionGroup.currentUserInIt) {
        onRemoveReaction(reactionGroup.emoji);
      } else {
        onAddReaction(reactionGroup.emoji);
      }
    },
    [onAddReaction, onRemoveReaction]
  );

  const onSelectEmoji = (emoji: string) => {
    // check if not already added
    if (
      !reactions.some(
        (reaction) =>
          reaction.user.id === currentUserId && reaction.emoji === emoji
      )
    ) {
      onAddReaction(emoji);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {groupedReactions.map((reactionGroup, index) => (
          <ButtonChip
            key={`${reactionGroup.emoji}-${index}`}
            emoji={reactionGroup.emoji}
            selected={reactionGroup.currentUserInIt}
            onPress={() => onPressButtonChip(reactionGroup)}
            count={reactionGroup.reactions.length}
            onLongPress={onLongPress}
            inactiveChipBackgroundColor={reactionsTheme?.inactiveChipBackground}
            activeChipBackgroundColor={reactionsTheme?.activeChipBackground}
            inactiveChipTextColor={reactionsTheme?.inactiveChipText}
            activeChipTextColor={reactionsTheme?.activeChipText}
            addIconColor={reactionsTheme?.addIcon}
          />
        ))}
        {!hideAddButton && (
          <ButtonChip
            onPress={() => setEmojiPickerOpened(true)}
            onLongPress={onLongPress}
          />
        )}
      </View>
      <ReactionsRecords
        open={reactionsRecordsOpened}
        reactionsGroups={groupedReactions}
        onClose={() => setReactionsRecordsOpened(false)}
        onOpenUserProfile={onOpenUserProfile}
        theme={reactionsRecordsTheme}
        reactionsRecordsEnableGroupChangeAnimation={
          reactionsRecordsEnableGroupChangeAnimation
        }
      />
      {cloneElement(
        <EmojiPicker
          open={emojiPickerOpened}
          onClose={() => setEmojiPickerOpened(false)}
          onEmojiSelected={(emo) => onSelectEmoji(emo.emoji)}
          emojiSize={emojiPickerEmojiSize ?? 28}
          expandable={emojiPickerExpandable ?? true}
          hideHeader={emojiPickerHideHeader}
          defaultHeight={emojiPickerDefaultHeight}
          expandedHeight={emojiPickerExpandedHeight ?? '80%'}
          disabledCategories={emojiPickerDisabledCategories}
          enableRecentlyUsed={emojiPickerEnableRecentlyUsed}
          categoryPosition={emojiPickerCategoryPosition ?? 'floating'}
          enableSearchBar={emojiPickerEnableSearchBar ?? false}
          categoryOrder={emojiPickerCategoryOrder}
          disableSafeArea={emojiPickerDisableSafeArea}
          theme={emojiPickerTheme}
          enableSearchAnimation={emojiPickerEnableSearchAnimation}
          enableCategoryChangeAnimation={
            emojiPickerEnableCategoryChangeAnimation
          }
          enableCategoryChangeGesture={emojiPickerEnableCategoryChangeGesture}
          emojisByCategory={emojiPickerEmojisByCategory}
        />,
        {
          ...(emojiPickerTranslation
            ? { translation: emojiPickerTranslation }
            : {}),
        }
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
