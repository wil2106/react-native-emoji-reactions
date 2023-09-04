import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { formatNumber } from '../../src/utils';
import PngIcon from './PngIcon';

export default function ButtonChip({
  emoji,
  count,
  onPress,
  onLongPress,
  selected,
  inactiveChipBackgroundColor = '#F8F8F8',
  activeChipBackgroundColor = '#E6F4FB',
  inactiveChipTextColor = '#1C1C1C',
  activeChipTextColor = '#0066A8',
  addIconColor = '#1C1C1C',
}: {
  emoji?: string;
  count?: number;
  onPress: () => void;
  onLongPress?: () => void;
  selected?: boolean;
  inactiveChipBackgroundColor?: string;
  activeChipBackgroundColor?: string;
  inactiveChipTextColor?: string;
  activeChipTextColor?: string;
  addIconColor?: string;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: selected
            ? activeChipBackgroundColor
            : inactiveChipBackgroundColor,
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {emoji !== undefined && count !== undefined && count > 0 ? (
        <Text
          style={[
            styles.content,
            {
              color: selected ? activeChipTextColor : inactiveChipTextColor,
            },
          ]}
        >
          {emoji} {formatNumber(count)}
        </Text>
      ) : (
        <PngIcon
          fill={addIconColor}
          source={require('../assets/icons/add.png')}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 1000,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  content: {
    fontSize: 12,
    fontWeight: '600',
  },
});
