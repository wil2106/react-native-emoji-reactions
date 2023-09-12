import {
  BottomSheetFooter,
  type BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import React, { useContext } from 'react';
import { EmojiPickerTabBarContext } from '../context';
import EmojiPickerTabBar from './EmojiPickerTabBar';

const EmojiPickerTabBarFooter = ({
  animatedFooterPosition,
}: BottomSheetFooterProps) => {
  const { categories, currentCategoryIndex, onSelectCategory, theme, styles } =
    useContext(EmojiPickerTabBarContext);
  return (
    <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
      <EmojiPickerTabBar
        categories={categories}
        selectedIndex={currentCategoryIndex}
        onSelectCategory={onSelectCategory}
        theme={theme}
        styles={styles}
      />
    </BottomSheetFooter>
  );
};

export default EmojiPickerTabBarFooter;
