import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import CustomBackdrop from './components/CustomBackdrop';
import ReactionsRecordsTabBar from './components/ReactionsRecordsTabBar';
import UserItem from './components/UserItem';
import type { ReactionType, ReactionsRecordsProps } from './types';
import { Modal } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { ReactionRecordsContext } from './context';

const DEVICE_WIDTH = Dimensions.get('window').width;

const ReactionsRecordsWithHOC = gestureHandlerRootHOC(() => {
  const {
    open,
    reactionsGroups,
    onClose,
    onPressReaction,
    theme,
    styles,
    enableGroupChangeAnimation,
  } = useContext(ReactionRecordsContext);

  const snapPoints = useMemo(() => ['45%', '95%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

  useEffect(() => {
    if (open) {
      // open bottom sheet
      bottomSheetRef.current?.present();
    } else {
      // reset state
      setSelectedGroupIndex(0);
    }
  }, [open]);

  useEffect(() => {
    // on selected group index change, scroll horizontal snap scroll view to selected group
    scrollViewRef.current?.scrollTo({
      animated: enableGroupChangeAnimation,
      x: selectedGroupIndex * DEVICE_WIDTH,
    });
  }, [selectedGroupIndex, enableGroupChangeAnimation]);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    // on scroll view animation end, calculate and set displayed group index from x offset
    setSelectedGroupIndex(
      Math.ceil(event.nativeEvent.contentOffset.x / DEVICE_WIDTH)
    );
  };

  const onReactionPress = (reaction: ReactionType) => {
    if (!onPressReaction) return;
    // fire onPressReaction
    onPressReaction(reaction);
    // close bottomsheet
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        activeOffsetX={[-999, 999]}
        activeOffsetY={[-5, 5]}
        enableContentPanningGesture
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
        enablePanDownToClose={true}
        onDismiss={onClose}
        handleIndicatorStyle={[
          defaultStyles.knob,
          styles?.knob,
          theme?.knob
            ? {
                backgroundColor: theme.knob,
              }
            : {},
        ]}
        backgroundStyle={[
          defaultStyles.background,
          theme?.background
            ? {
                backgroundColor: theme.background,
              }
            : {},
        ]}
      >
        <ReactionsRecordsTabBar
          reactionsGroups={reactionsGroups}
          selectedGroupIndex={selectedGroupIndex}
          setSelectedGroupIndex={setSelectedGroupIndex}
          theme={theme?.tabBar}
          styles={styles?.tabBar}
        />
        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          snapToInterval={DEVICE_WIDTH}
          decelerationRate={0}
          snapToAlignment="start"
          onMomentumScrollEnd={onMomentumScrollEnd}
        >
          {reactionsGroups.map((reactionsGroup, reactionsGroupIndex) => (
            <BottomSheetFlatList
              key={`${reactionsGroup.emoji}-${reactionsGroupIndex}`}
              style={{ width: DEVICE_WIDTH }}
              data={reactionsGroup.reactions}
              contentContainerStyle={[
                defaultStyles.flatListContent,
                styles?.listContainer,
              ]}
              renderItem={({ item }) => (
                <UserItem
                  user={item.user}
                  onPress={() => onReactionPress(item)}
                  theme={theme?.userItem}
                  styles={styles?.userItem}
                />
              )}
              keyExtractor={(item, flatListItemIndex) =>
                `${item.emoji}-${item.user.id}-${flatListItemIndex}`
              }
            />
          ))}
        </ScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default function ReactionsRecords({
  open,
  reactionsGroups,
  onClose,
  onPressReaction,
  theme,
  styles,
  enableGroupChangeAnimation,
}: ReactionsRecordsProps) {
  return (
    <Modal visible={open} transparent>
      <ReactionRecordsContext.Provider
        value={{
          open,
          reactionsGroups,
          onClose,
          onPressReaction,
          theme,
          styles,
          enableGroupChangeAnimation,
        }}
      >
        <ReactionsRecordsWithHOC />
      </ReactionRecordsContext.Provider>
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
  flatListContent: {
    gap: 20,
    padding: 15,
  },
});
