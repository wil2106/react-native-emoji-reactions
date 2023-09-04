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
import type { ReactionGroupType } from '../../src/types';

const MIN_ITEM_WIDTH = 60;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default function ReactionsRecordsTabBar({
  reactionsGroups,
  selectedGroupIndex,
  setSelectedGroupIndex,
  dividerColor = '#DDDDDD',
  activeHeaderGroupText = '#0066A8',
  inactiveHeaderGroupText = '#1C1C1C',
  activeHeaderBar = '#0066A8',
}: {
  reactionsGroups: ReactionGroupType[];
  selectedGroupIndex: number;
  setSelectedGroupIndex: (index: number) => void;
  dividerColor?: string;
  activeHeaderGroupText?: string;
  inactiveHeaderGroupText?: string;
  activeHeaderBar?: string;
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
          styles.divider,
          {
            backgroundColor: dividerColor,
          },
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
            style={[styles.reactionsGroupContainer, { width: itemWidth }]}
            onPress={() => setSelectedGroupIndex(index)}
          >
            <Text
              style={[
                styles.reactionsGroupTitle,
                {
                  color:
                    index === selectedGroupIndex
                      ? activeHeaderGroupText
                      : inactiveHeaderGroupText,
                },
              ]}
            >
              {reactionsgroup.emoji.emoji} {reactionsgroup.reactions.length}
            </Text>
          </Pressable>
        ))}
        <Animated.View
          style={[
            activeIndexBarAnimatedStyle,
            styles.activeIndexBar,
            {
              backgroundColor: activeHeaderBar,
            },
            { width: itemWidth },
          ]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
  },
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
  },
});
