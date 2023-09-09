import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PngIcon from './PngIcon';
import type { AddReactionButtonStyles, AddReactionButtonTheme } from '../types';

export default function ReactionButton({
  onPress,
  onLongPress,
  styles,
  theme,
}: {
  onPress: () => void;
  onLongPress?: () => void;
  theme?: AddReactionButtonTheme;
  styles?: AddReactionButtonStyles;
}) {
  return (
    <TouchableOpacity
      style={[
        defaultStyles.container,
        styles?.container,
        theme?.background ? { backgroundColor: theme.background } : {},
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <PngIcon
        styles={styles?.icon}
        fill={theme?.icon ?? '#1C1C1C'}
        source={require('../assets/icons/add.png')}
      />
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
    backgroundColor: '#F8F8F8',
  },
});
