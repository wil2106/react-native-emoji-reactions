import { createContext } from 'react';
import type {
  Category,
  EmojiPickerTabBarStyles,
  EmojiPickerTabBarTheme,
} from './types';

export const EmojiPickerTabBarContext = createContext<{
  categories: Category[];
  currentCategoryIndex: number;
  onSelectCategory: (index: number) => void;
  theme?: EmojiPickerTabBarTheme;
  styles?: EmojiPickerTabBarStyles;
}>({
  categories: [],
  currentCategoryIndex: 0,
  onSelectCategory: () => {},
});
