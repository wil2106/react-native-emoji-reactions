import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetVirtualizedList,
} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import CustomBackdrop from './components/CustomBackdrop';
import type { EmojiPickerProps } from './types';
import { Modal } from 'react-native';
import emojisByCategory from 'unicode-emoji-json/data-by-group.json';
import { View } from 'react-native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import EmojiPickerTabBar from './components/EmojiPickerTabBar';
import { CATEGORIES_KEYS } from './constants';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEFAULT_EMOJI_CELL_WIDTH = 50;
const DEFAULT_EMOJI_CELL_HEIGHT = 50;

export default function EmojiPicker({ open, onClose }: EmojiPickerProps) {
  const snapPoints = useMemo(() => ['45%', '95%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    if (open) {
      // open bottom sheet
      bottomSheetRef.current?.present();
    }
  }, [open]);

  const nbEmojisPerRow = useMemo(
    () => Math.floor(DEVICE_WIDTH / DEFAULT_EMOJI_CELL_WIDTH),
    []
  );

  const emojiRowsByCategory = useMemo(() => {
    let theEmojiRowsByCategory = [];
    for (const [category, emojis] of Object.entries(emojisByCategory)) {
      if (category === 'default') continue;
      let theEmojiRows = [];
      let emojiRow = [];
      for (let i = 0; i < emojis.length; i++) {
        if (i !== 0 && i % nbEmojisPerRow === 0) {
          theEmojiRows.push(emojiRow);
          emojiRow = [];
        }
        const emoji = emojis[i];
        emojiRow.push(emoji);
      }
      //add remaining emojis
      if (emojiRow.length > 0) {
        // fill array with empty items
        const lastRowEmojisCount = emojiRow.length;
        for (let a = lastRowEmojisCount; a < nbEmojisPerRow; a++) {
          emojiRow.push(null);
        }
        theEmojiRows.push(emojiRow);
      }
      theEmojiRowsByCategory.push({
        category: CATEGORIES_KEYS[category] ?? 'unknown',
        emojiRows: theEmojiRows,
      });
    }
    return theEmojiRowsByCategory;
  }, [nbEmojisPerRow]);

  const onSelectCategory = (index: number) => {
    setCurrentCategoryIndex(index);
    scrollViewRef.current?.scrollTo({
      x: DEVICE_WIDTH * index,
      animated: false,
    });
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View style={defaultStyles.emojiRowContainer}>
        {item.map(
          (
            emoji:
              | {
                  emoji: string;
                  skin_tone_support: boolean;
                  name: string;
                  slug: string;
                  unicode_version: string;
                  emoji_version: string;
                }
              | null
              | undefined,
            index: number
          ) => (
            <>
              {emoji !== null && emoji !== undefined ? (
                <TouchableOpacity
                  style={defaultStyles.emojiContainer}
                  key={`${emoji.slug}-${index}`}
                >
                  <Text style={defaultStyles.emojiText}>{emoji.emoji}</Text>
                </TouchableOpacity>
              ) : (
                <View
                  key={`empty-${index}`}
                  style={defaultStyles.emojiContainer}
                />
              )}
            </>
          )
        )}
      </View>
    ),
    []
  );

  // const renderItem = useCallback(({ item }) => {
  //   return <Text>ok</Text>;
  // }, []);

  return (
    <Modal transparent={true} visible={open}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={CustomBackdrop}
          enablePanDownToClose={true}
          onDismiss={onClose}
          footerComponent={({ animatedFooterPosition }) => (
            <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
              <EmojiPickerTabBar
                selectedIndex={currentCategoryIndex}
                setSelectedIndex={onSelectCategory}
                categories={emojiRowsByCategory.map((cat) => cat.category)}
              />
            </BottomSheetFooter>
          )}
        >
          <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            snapToInterval={DEVICE_WIDTH}
            decelerationRate={0}
            snapToAlignment="start"
          >
            {emojiRowsByCategory.map((category, index) => (
              <BottomSheetVirtualizedList
                key={`${category.category}-${index}`}
                data={category.emojiRows}
                keyExtractor={(_, rowIndex) =>
                  `${category.category}-row-${rowIndex}`
                }
                getItemCount={(data) => data.length}
                getItem={(data, rowIndex) => data[rowIndex]}
                renderItem={renderItem}
                style={{ width: DEVICE_WIDTH }}
                contentContainerStyle={defaultStyles.listContainer}
                getItemLayout={(_, rowIndex) => ({
                  length: DEFAULT_EMOJI_CELL_HEIGHT,
                  offset: DEFAULT_EMOJI_CELL_HEIGHT * index,
                  index: rowIndex,
                })}
              />
            ))}
          </ScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Modal>
  );
}

const defaultStyles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
  },
  knob: {
    backgroundColor: '#DDDDDD',
  },
  listContainer: {
    alignItems: 'center',
  },
  emojiRowContainer: {
    flexDirection: 'row',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEFAULT_EMOJI_CELL_WIDTH,
    height: DEFAULT_EMOJI_CELL_HEIGHT,
  },
  emojiText: {
    fontSize: 22,
  },
});
