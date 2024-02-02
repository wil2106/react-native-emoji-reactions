import * as React from 'react';
import type { ImageStyle } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Image } from 'react-native';
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
    resizeMode: 'contain',
    width: 22,
    height: 22,
  },
});
