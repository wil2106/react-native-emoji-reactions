import * as React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, ImageStyle } from 'expo-image';
import { StyleSheet } from 'react-native';

export default function PngIcon({
  fill,
  source,
  styles,
}: {
  fill?: string;
  source: ImageSourcePropType;
  styles?: ImageStyle;
}) {
  return (
    <Image
      source={source}
      style={[defaultStyle.image, styles, fill ? { tintColor: fill } : {}]}
    />
  );
}

const defaultStyle = StyleSheet.create({
  image: {
    width: 22,
    height: 22,
  },
});
