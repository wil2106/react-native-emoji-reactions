import { createContext } from 'react';
import type {
  Category,
  EmojiPickerProps,
  EmojiPickerTabBarStyles,
  EmojiPickerTabBarTheme,
  ReactionsRecordsProps,
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

export const EmojiPickerContext = createContext<EmojiPickerProps>({
  open: false,
  onClose: () => {},
  onSelectEmoji: () => {},
});
export const ReactionRecordsContext = createContext<ReactionsRecordsProps>({
  open: false,
  reactionsGroups: [],
  onClose: () => {},
});
