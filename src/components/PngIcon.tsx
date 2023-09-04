import * as React from 'react';
import { Image, type ImageSourcePropType } from 'react-native';

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
