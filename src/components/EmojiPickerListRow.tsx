import * as React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import type {
  EmojiPickerListRowStyles,
  EmojiPickerListRowTheme,
  JsonEmoji,
} from '../../src/types';

export const DEFAULT_EMOJI_CELL_WIDTH = 50;
export const DEFAULT_EMOJI_CELL_HEIGHT = 50;

const EmojiPickerListRow = ({
  item,
  onChooseEmoji,
  theme,
  styles,
}: {
  item: (JsonEmoji | null | undefined)[];
  onChooseEmoji: (emoji: JsonEmoji) => void;
  theme?: EmojiPickerListRowTheme;
  styles?: EmojiPickerListRowStyles;
}) => {
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
      {item.map((emoji, index) => {
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
            <View key={`empty-${index}`} style={defaultStyles.emojiContainer} />
          );
        }
      })}
    </View>
  );
};

export default React.memo(EmojiPickerListRow);

const defaultStyles = StyleSheet.create({
  emojiRowContainer: {
    flexDirection: 'row',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEFAULT_EMOJI_CELL_WIDTH,
    height: DEFAULT_EMOJI_CELL_HEIGHT,
  },
  emojiText: {
    fontSize: 24,
  },
});
