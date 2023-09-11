import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import PngIcon from './PngIcon';
import { CATEGORIES_ICONS_SOURCES } from '../constants';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type {
  EmojiPickerTabBarStyles,
  EmojiPickerTabBarTheme,
} from '../../src/types';
import type { ViewStyle } from 'react-native';

export const TABBAR_BOTTOM_SPACE = 24;
export const ICON_SIZE = 22;
export const ICON_CONTAINER_PADDING = 6;
export const DIVIDER_WIDTH = 1;

export default function EmojiPickerTabBar({
  categories,
  selectedIndex,
  setSelectedIndex,
  theme,
  styles,
}: {
  categories: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  theme?: EmojiPickerTabBarTheme;
  styles?: EmojiPickerTabBarStyles;
}) {
  const selectedItemBackgroundAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(
          (ICON_SIZE + 2 * ICON_CONTAINER_PADDING + DIVIDER_WIDTH) *
            selectedIndex
        ),
      } as never,
    ],
  }));

  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <View
        style={[
          defaultStyles.tabBar,
          styles?.tabBar,
          theme?.tabBarBackground
            ? {
                backgroundColor: theme.tabBarBackground,
              }
            : {},
        ]}
      >
        <Animated.View
          style={[
            defaultStyles.selectedItemBackgroundContainer,
            styles?.selectedItemBackgroundContainer,
            selectedItemBackgroundAnimatedStyle,
          ]}
        >
          <View
            style={[
              defaultStyles.selectedItemBackground,
              styles?.selectedItemBackground,
              theme?.selectedItemBackgroundBack
                ? {
                    backgroundColor: theme.selectedItemBackgroundBack,
                  }
                : {},
            ]}
          />
        </Animated.View>
        <EmojiPickerTabBarVerticalDivider
          hidden
          backgroundColor={theme?.divider}
          styles={styles?.divider}
        />
        {categories.map((category, index) => (
          <View
            style={[defaultStyles.categoryContainer, styles?.categoryContainer]}
            key={`${category}-${index}`}
          >
            <TouchableOpacity
              style={[defaultStyles.iconContainer, styles?.iconContainer]}
              onPress={() => setSelectedIndex(index)}
            >
              <PngIcon
                fill={
                  index === selectedIndex
                    ? theme?.activeIcon ?? '#1C1C1C'
                    : theme?.inactiveIcon ?? '#1C1C1C'
                }
                source={
                  CATEGORIES_ICONS_SOURCES[category] ??
                  CATEGORIES_ICONS_SOURCES.unknown!
                }
                styles={styles?.icon}
              />
            </TouchableOpacity>
            <EmojiPickerTabBarVerticalDivider
              hidden={
                index === selectedIndex ||
                index + 1 === selectedIndex ||
                index === categories.length - 1
              }
              backgroundColor={theme?.divider}
              styles={styles?.divider}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export const EmojiPickerTabBarVerticalDivider = ({
  hidden,
  backgroundColor,
  styles,
}: {
  hidden?: boolean;
  backgroundColor?: string;
  styles?: ViewStyle;
}) => {
  return (
    <View
      style={[
        defaultStyles.divider,
        styles,
        backgroundColor
          ? {
              backgroundColor,
            }
          : {},
        hidden ? { backgroundColor: 'transparent' } : {},
      ]}
    />
  );
};

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
    borderRadius: 6,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    padding: ICON_CONTAINER_PADDING,
  },
  divider: {
    width: DIVIDER_WIDTH,
    height: '100%',
    paddingVertical: 3,
    backgroundColor: '#CFCFCD',
  },
  selectedItemBackgroundContainer: {
    width: ICON_SIZE + 2 * ICON_CONTAINER_PADDING + 2 * DIVIDER_WIDTH,
    height: ICON_SIZE + 2 * ICON_CONTAINER_PADDING,
    padding: 4,
    position: 'absolute',
  },
  selectedItemBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
});
