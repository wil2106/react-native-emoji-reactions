import * as React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  fill: string;
  source: ImageSourcePropType;
  dimensions?: { width: number; height: number };
};

export const ICON_DIMENSIONS = { width: 22, height: 22 };

export default function PngIcon({
  fill,
  source,
  dimensions = ICON_DIMENSIONS,
}: Props) {
  return <Image source={source} style={[{ tintColor: fill }, dimensions]} />;
}
