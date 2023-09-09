import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { formatNumber } from '../utils';
import type { ReactionButtonStyles, ReactionButtonTheme } from '../types';

export default function ReactionButton({
  emoji,
  count,
  onPress,
  onLongPress,
  selected,
  styles,
  theme,
}: {
  emoji: string;
  count: number;
  onPress: () => void;
  onLongPress?: () => void;
  selected?: boolean;
  theme?: ReactionButtonTheme;
  styles?: ReactionButtonStyles;
}) {
  return (
    <TouchableOpacity
      style={[
        defaultStyles.container,
        selected ? defaultStyles.activeChip : defaultStyles.inactiveChip,
        styles?.container,
        selected && theme?.activeChipBackground
          ? { backgroundColor: theme.activeChipBackground }
          : {},
        !selected && theme?.inactiveChipBackground
          ? { backgroundColor: theme.inactiveChipBackground }
          : {},
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text style={styles?.emoji}>{emoji}</Text>
      <Text
        style={[
          defaultStyles.text,
          selected
            ? defaultStyles.activeChipText
            : defaultStyles.inactiveChipText,
          styles?.text,
          selected && theme?.activeChipText
            ? { color: theme.activeChipText }
            : {},
          !selected && theme?.inactiveChipText
            ? { color: theme.inactiveChipText }
            : {},
        ]}
      >
        {formatNumber(count)}
      </Text>
    </TouchableOpacity>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 1000,
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  inactiveChip: { backgroundColor: '#F8F8F8' },
  activeChip: { backgroundColor: '#E6F4FB' },
  inactiveChipText: { color: '#1C1C1C' },
  activeChipText: { color: '#0066A8' },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
