import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PngIcon from './PngIcon';

export default function Avatar({
  uri,
  avatarBackgroundColor = '#510F4B',
  avatarColor = '#ffffff',
}: {
  uri?: string | null;
  avatarBackgroundColor?: string;
  avatarColor?: string;
}) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: avatarBackgroundColor,
        },
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <PngIcon
          fill={avatarColor}
          source={require('../assets/icons/add.png')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    width: 40,
    height: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 22,
  },
});