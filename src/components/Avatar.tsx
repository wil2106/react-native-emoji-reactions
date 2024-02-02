import React from 'react';
import { StyleSheet, View } from 'react-native';
import PngIcon from './PngIcon';
import type { AvatarStyles, AvatarTheme } from '../../src/types';
import { Image } from 'react-native';

export default function Avatar({
  uri,
  theme,
  styles,
}: {
  uri?: string | null;
  theme?: AvatarTheme;
  styles?: AvatarStyles;
}) {
  return (
    <View
      style={[
        defaultStyle.container,
        styles?.container,
        theme?.background
          ? {
              backgroundColor: theme.background,
            }
          : {},
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={[defaultStyle.image, styles?.image]} />
      ) : (
        <PngIcon
          fill={theme?.icon}
          source={require('../assets/icons/user.png')}
          styles={{ ...defaultStyle.defautImage, ...styles?.defaultImage }}
        />
      )}
    </View>
  );
}

const defaultStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    width: 40,
    height: 40,
    backgroundColor: '#510F4B',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  defautImage: {
    tintColor: '#ffffff',
  },
});
