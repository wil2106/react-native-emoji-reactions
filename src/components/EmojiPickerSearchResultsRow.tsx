import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type {
  EmojiPickerSearchResultsRowStyles,
  EmojiPickerSearchResultsRowTheme,
  JsonEmoji,
} from '../../src/types';

export const EMOJI_PICKER_SEARCH_RESULT_ROW_VERTICAL_PADDING = 6;
export const EMOJI_PICKER_SEARCH_RESULT_ROW_HEIGHT = 50;

export const EmojiPickerSearchResultsRow = ({
  emoji,
  onPress,
  theme,
  styles,
}: {
  emoji: JsonEmoji;
  onPress: () => void;
  theme?: EmojiPickerSearchResultsRowTheme;
  styles?: EmojiPickerSearchResultsRowStyles;
}) => {
  return (
    <TouchableOpacity
      style={[
        defaultStyles.rowContainer,
        styles?.rowContainer,
        theme?.rowContainerBackground
          ? {
              backgroundColor: theme.rowContainerBackground,
            }
          : {},
      ]}
      onPress={onPress}
    >
      <Text style={[defaultStyles.emojiText, styles?.emojiText]}>
        {emoji.emoji}
      </Text>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          defaultStyles.nameText,
          styles?.nameText,
          theme?.nameText
            ? {
                color: theme.nameText,
              }
            : {},
        ]}
      >
        {emoji.name}
      </Text>
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: EMOJI_PICKER_SEARCH_RESULT_ROW_HEIGHT,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: EMOJI_PICKER_SEARCH_RESULT_ROW_VERTICAL_PADDING,
    gap: 10,
  },
  emojiText: {
    fontSize: 18,
  },
  nameText: {
    flex: 1,
    fontSize: 18,
    color: '#1C1C1C',
  },
});
