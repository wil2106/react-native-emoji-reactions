import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { UserItemStyles, UserItemTheme, UserType } from '../../src/types';
import Avatar from './Avatar';
import { View } from 'react-native';

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
      <View style={[defaultStyles.contentContainer, styles?.contentContainer]}>
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
        {!!user.description && (
          <Text
            style={[
              defaultStyles.description,
              styles?.description,
              theme?.description
                ? {
                    color: theme.description,
                  }
                : {},
            ]}
          >
            {user.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contentContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  description: {
    fontSize: 10,
    color: '#5F5F5F',
  },
});
