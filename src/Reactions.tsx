import React, { useCallback, useMemo, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { StyleSheet, View } from 'react-native';
import EmojiPicker from './EmojiPicker';
import ReactionsRecords from './ReactionsRecords';
import AddReactionButton from './components/AddReactionButton';
import ReactionButton from './components/ReactionButton';
import type { ReactionGroupType, ReactionsProps } from './types';

export default function Reactions({
  currentUserId,
  reactions,
  hideAddButton,
  onAddReaction,
  onRemoveReaction,
  onOpenUserProfile,
  disableHaptics,
  language,
  newTranslations,
  reactionsRecordsEnableGroupChangeAnimation = true,
  emojiPickerDisableSearch,
  emojiPickerDisableRecentlyUsed,
  theme,
  styles,
}: ReactionsProps) {
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);
  const [reactionsRecordsOpened, setReactionsRecordsOpened] = useState(false);

  // useRecentPicksPersistence({
  //   initialization: async () => {
  //     const item = await AsyncStorage.getItem(STORAGE_KEY);
  //     return JSON.parse(item || '[]');
  //   },
  //   onStateChange: (next) =>
  //     AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)),
  // });

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
    if (!disableHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setReactionsRecordsOpened(true);
  }, [disableHaptics]);

  const onPressAdd = () => {
    if (!disableHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setEmojiPickerOpened(true);
  };

  const onPressButtonChip = useCallback(
    (reactionGroup: ReactionGroupType) => {
      if (reactionGroup.currentUserInIt) {
        const reaction = reactionGroup.reactions.find(
          (reac) =>
            reac.emoji === reactionGroup.emoji && reac.user.id === currentUserId
        );
        if (reaction?.id) {
          onRemoveReaction(reaction.id);
        }
      } else {
        onAddReaction(reactionGroup.emoji);
      }
    },
    [onAddReaction, onRemoveReaction, currentUserId]
  );

  const onSelectEmoji = (emoji: string) => {
    // check if not already added
    if (
      reactions.some(
        (reaction) =>
          reaction.user.id === currentUserId && reaction.emoji === emoji
      )
    ) {
      return;
    }
    if (!disableHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onAddReaction(emoji);
  };

  return (
    <>
      <View
        style={{ ...defaultStyles.container, ...styles?.reactions?.container }}
      >
        {groupedReactions.map((reactionGroup, index) => (
          <ReactionButton
            key={`${reactionGroup.emoji}-${index}`}
            emoji={reactionGroup.emoji}
            selected={reactionGroup.currentUserInIt}
            onPress={() => onPressButtonChip(reactionGroup)}
            count={reactionGroup.reactions.length}
            onLongPress={onLongPress}
            theme={theme?.reactions?.reactionButton}
            styles={styles?.reactions?.reactionButton}
          />
        ))}
        {!hideAddButton && (
          <AddReactionButton
            onPress={onPressAdd}
            onLongPress={onLongPress}
            theme={theme?.reactions?.addReactionButton}
            styles={styles?.reactions?.addReactionButton}
          />
        )}
      </View>
      <ReactionsRecords
        open={reactionsRecordsOpened}
        reactionsGroups={groupedReactions}
        onClose={() => setReactionsRecordsOpened(false)}
        onOpenUserProfile={onOpenUserProfile}
        theme={theme?.reactionsRecords}
        styles={styles?.reactionsRecords}
        enableGroupChangeAnimation={reactionsRecordsEnableGroupChangeAnimation}
      />
      <EmojiPicker
        open={emojiPickerOpened}
        onClose={() => setEmojiPickerOpened(false)}
        onSelectEmoji={onSelectEmoji}
        disableSearch={emojiPickerDisableSearch}
        disableRecentlyUsed={emojiPickerDisableRecentlyUsed}
        language={language}
        newTranslations={newTranslations}
        theme={theme?.emojiPicker}
        styles={styles?.emojiPicker}
      />
    </>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
