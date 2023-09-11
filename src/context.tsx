import { createContext } from 'react';
import type { EmojiPickerTabBarStyles, EmojiPickerTabBarTheme } from './types';

export const EmojiPickerTabBarContext = createContext<{
  categories: string[];
  currentCategoryIndex: number;
  setCurrentCategoryIndex: (index: number) => void;
  theme?: EmojiPickerTabBarTheme;
  styles?: EmojiPickerTabBarStyles;
}>({
  categories: [],
  currentCategoryIndex: 0,
  setCurrentCategoryIndex: () => {},
});
