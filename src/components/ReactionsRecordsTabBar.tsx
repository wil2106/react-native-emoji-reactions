import React, { useEffect, useMemo, useRef } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type {
  ReactionGroupType,
  ReactionsRecordsTabBarStyles,
  ReactionsRecordsTabBarTheme,
} from '../../src/types';

const MIN_ITEM_WIDTH = 60;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default function ReactionsRecordsTabBar({
  reactionsGroups,
  selectedGroupIndex,
  setSelectedGroupIndex,
  theme,
  styles,
}: {
  reactionsGroups: ReactionGroupType[];
  selectedGroupIndex: number;
  setSelectedGroupIndex: (index: number) => void;
  theme?: ReactionsRecordsTabBarTheme;
  styles?: ReactionsRecordsTabBarStyles;
}) {
  const scrollViewRef = useRef<ScrollView>(null);

  const itemWidth = useMemo(() => {
    const calculatedItemWidth = DEVICE_WIDTH / reactionsGroups.length;
    if (calculatedItemWidth > MIN_ITEM_WIDTH) {
      return calculatedItemWidth;
    } else {
      return MIN_ITEM_WIDTH;
    }
  }, [reactionsGroups]);

  const activeIndexBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(itemWidth * selectedGroupIndex),
        } as never,
      ],
    };
  });

  useEffect(() => {
    // scroll selected group to middle
    scrollViewRef.current?.scrollTo({
      animated: true,
      x: itemWidth * selectedGroupIndex + itemWidth / 2 - DEVICE_WIDTH / 2,
    });
  }, [selectedGroupIndex, itemWidth]);

  return (
    <View>
      <View
        style={[
          defaultStyles.divider,
          styles?.divider,
          theme?.divider
            ? {
                backgroundColor: theme?.divider,
              }
            : {},
        ]}
      />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {reactionsGroups.map((reactionsgroup, index) => (
          <Pressable
            key={`${reactionsgroup.emoji}-${index}`}
            style={[
              defaultStyles.reactionsGroupContainer,
              styles?.reactionsGroupContainer,
              { width: itemWidth },
            ]}
            onPress={() => setSelectedGroupIndex(index)}
          >
            <Text
              style={[
                defaultStyles.reactionsGroupTitle,
                index === selectedGroupIndex
                  ? defaultStyles?.activeHeaderGroupText
                  : defaultStyles?.inactiveHeaderGroupText,
                styles?.reactionsGroupTitle,
                index === selectedGroupIndex && theme?.activeHeaderGroupText
                  ? { color: theme.activeHeaderGroupText }
                  : {},
                index !== selectedGroupIndex && theme?.inactiveHeaderGroupText
                  ? { color: theme.inactiveHeaderGroupText }
                  : {},
              ]}
            >
              {reactionsgroup.emoji} {reactionsgroup.reactions.length}
            </Text>
          </Pressable>
        ))}
        <Animated.View
          style={[
            defaultStyles.activeIndexBar,
            styles?.activeIndexBar,
            theme?.activeHeaderBar
              ? { backgroundColor: theme?.activeHeaderBar }
              : {},
            { width: itemWidth },
            activeIndexBarAnimatedStyle,
          ]}
        />
      </ScrollView>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  divider: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
    backgroundColor: '#DDDDDD',
  },
  activeHeaderGroupText: { color: '#0066A8' },
  inactiveHeaderGroupText: { color: '#1C1C1C' },
  reactionsGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  reactionsGroupTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeIndexBar: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#0066A8',
  },
});
