import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import PngIcon from './PngIcon';
import { CATEGORIES_ICONS_SOURCES } from '../../src/constants';
import { TouchableOpacity } from 'react-native';

export const TABBAR_BOTTOM_SPACE = 20;
export const ICON_WIDTH = 22;
export const ICON_CONTAINER_PADING = 6;
export const DIVIDER_WITDH = 1;

export default function EmojiPickerTabBar({
  categories,
  selectedIndex,
  setSelectedIndex,
}: {
  categories: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}) {
  return (
    <View style={defaultStyles.container}>
      <View style={defaultStyles.tabBar}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={`${category}-${index}`}
            style={defaultStyles.iconContainer}
            onPress={() => setSelectedIndex(index)}
          >
            <PngIcon
              fill="black"
              source={
                CATEGORIES_ICONS_SOURCES[category] ??
                CATEGORIES_ICONS_SOURCES.unknown!
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    alignItems: 'center',
    bottom: TABBAR_BOTTOM_SPACE,
  },
  tabBar: {
    backgroundColor: '#EAE2E2',
    flexDirection: 'row',
    borderRadius: 5,
  },
  iconContainer: {
    padding: ICON_CONTAINER_PADING,
  },
});
