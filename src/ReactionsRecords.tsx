import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Dimensions, FlatList, ScrollView, StyleSheet } from 'react-native';
import CustomBackdrop from './components/CustomBackdrop';
import ReactionsRecordsTabBar from './components/ReactionsRecordsTabBar';
import UserItem from './components/UserItem';
import type { ReactionsRecordsProps } from './types';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function ReactionsRecords({
  open,
  reactionsGroups,
  onClose,
  onOpenUserProfile,
  theme,
  reactionsRecordsEnableGroupChangeAnimation,
}: ReactionsRecordsProps) {
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
      animated: reactionsRecordsEnableGroupChangeAnimation,
      x: selectedGroupIndex * DEVICE_WIDTH,
    });
  }, [selectedGroupIndex, reactionsRecordsEnableGroupChangeAnimation]);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    // on scroll view animation end, calculate and set displayed group index from x offset
    setSelectedGroupIndex(
      Math.floor(event.nativeEvent.contentOffset.x / DEVICE_WIDTH)
    );
  };

  const onUserItemPress = (id: string | number) => {
    if (!onOpenUserProfile) return;
    // close bottomsheet
    bottomSheetRef.current?.dismiss();
    // open user profile
    onOpenUserProfile(id);
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
        enablePanDownToClose={true}
        onDismiss={onClose}
        handleIndicatorStyle={{
          backgroundColor: theme?.handle ?? '#DDDDDD',
        }}
        backgroundStyle={{
          backgroundColor: theme?.background ?? '#FFFFFF',
        }}
      >
        <ReactionsRecordsTabBar
          reactionsGroups={reactionsGroups}
          selectedGroupIndex={selectedGroupIndex}
          setSelectedGroupIndex={setSelectedGroupIndex}
          dividerColor={theme?.divider}
          activeHeaderGroupText={theme?.activeHeaderGroupText}
          inactiveHeaderGroupText={theme?.inactiveHeaderGroupText}
          activeHeaderBar={theme?.activeHeaderBar}
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
            <FlatList
              key={`${reactionsGroup.emoji}-${reactionsGroupIndex}`}
              style={{ width: DEVICE_WIDTH }}
              data={reactionsGroup.reactions}
              contentContainerStyle={styles.flatListContent}
              renderItem={({ item }) => (
                <UserItem
                  user={item.user}
                  onPress={() => onUserItemPress(item.user.id)}
                  nameTextColor={theme?.userItemNameText}
                  avatarBackgroundColor={theme?.userItemAvatarBackground}
                  avatarColor={theme?.userItemAvatar}
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
}

const styles = StyleSheet.create({
  groupHeaderText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  flatListContent: {
    gap: 20,
    padding: 15,
  },
});
