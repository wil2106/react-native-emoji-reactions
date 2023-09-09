import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { UserItemStyles, UserItemTheme, UserType } from '../../src/types';
import Avatar from './Avatar';

export default function UserItem({
  user,
  onPress,
  theme,
  styles,
}: {
  user: UserType;
  onPress?: () => void;
  theme?: UserItemTheme;
  styles?: UserItemStyles;
}) {
  return (
    <TouchableOpacity
      style={[defaultStyles.container, styles?.container]}
      onPress={onPress}
    >
      <Avatar
        uri={user.avatarUrl}
        theme={theme?.avatar}
        styles={styles?.avatar}
      />
      <Text
        style={[
          defaultStyles.name,
          styles?.name,
          theme?.name
            ? {
                color: theme.name,
              }
            : {},
        ]}
      >
        {user.name}
      </Text>
    </TouchableOpacity>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1C',
  },
});
