import * as React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import type {
  EmojiPickerListRowStyles,
  EmojiPickerListRowTheme,
  EmojiRow,
  JsonEmoji,
} from '../../src/types';

export const EMOJI_CELL_SIZE = 50;

const EmojiPickerListRow = ({
  item,
  onChooseEmoji,
  nbEmojisPerRow,
  theme,
  styles,
}: {
  item: EmojiRow;
  onChooseEmoji: (emoji: JsonEmoji) => void;
  nbEmojisPerRow: number;
  theme?: EmojiPickerListRowTheme;
  styles?: EmojiPickerListRowStyles;
}) => {
  if (item.emojis) {
    return (
      <View
        style={[
          defaultStyles.emojiRowContainer,
          styles?.emojiRowContainer,
          theme?.emojiRowContainerBackground
            ? {
                backgroundColor: theme.emojiRowContainerBackground,
              }
            : {},
        ]}
      >
        {item.emojis.map((emoji, index) => {
          if (emoji !== null && emoji !== undefined) {
            return (
              <TouchableOpacity
                style={[
                  defaultStyles.emojiContainer,
                  styles?.emojiContainer,
                  theme?.emojiRowContainerBackground
                    ? {
                        backgroundColor: theme.emojiRowContainerBackground,
                      }
                    : {},
                ]}
                key={`${emoji.slug}-${index}`}
                onPress={() => onChooseEmoji(emoji)}
              >
                <Text style={[defaultStyles.emojiText, styles?.emojiText]}>
                  {emoji.emoji}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <View
                key={`empty-${index}`}
                style={defaultStyles.emojiContainer}
              />
            );
          }
        })}
      </View>
    );
  } else if (item.title) {
    return (
      <View
        style={[
          defaultStyles.titleContainer,
          { width: nbEmojisPerRow * EMOJI_CELL_SIZE },
          styles?.titleContainer,
          theme?.titleContainerBackground
            ? {
                backgroundColor: theme.titleContainerBackground,
              }
            : {},
        ]}
      >
        <Text
          style={[
            defaultStyles.titleText,
            styles?.titleText,
            theme?.titleText
              ? {
                  color: theme.titleText,
                }
              : {},
          ]}
        >
          {item.title.name}
        </Text>
      </View>
    );
  } else {
    return <></>;
  }
};

export default React.memo(EmojiPickerListRow);

const defaultStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: EMOJI_CELL_SIZE,
  },
  titleText: {
    fontSize: 16,
    color: '#5F5F5F',
  },
  emojiRowContainer: {
    flexDirection: 'row',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: EMOJI_CELL_SIZE,
    height: EMOJI_CELL_SIZE,
  },
  emojiText: {
    fontSize: 24,
  },
});
