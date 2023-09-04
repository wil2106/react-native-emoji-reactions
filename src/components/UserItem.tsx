import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { UserType } from 'src/types';
import Avatar from './Avatar';

export default function UserItem({
  user,
  onPress,
  nameTextColor = '#1C1C1C',
  avatarBackgroundColor,
  avatarColor,
}: {
  user: UserType;
  onPress?: () => void;
  nameTextColor?: string;
  avatarBackgroundColor?: string;
  avatarColor?: string;
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar
        uri={user.avatarUrl}
        avatarBackgroundColor={avatarBackgroundColor}
        avatarColor={avatarColor}
      />
      <Text
        style={[
          styles.text,
          {
            color: nameTextColor,
          },
        ]}
      >
        {user.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
