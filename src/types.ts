import type { ImageStyle } from 'expo-image';
import type { ViewStyle, TextStyle } from 'react-native';

export type ReactionsProps = {
  currentUserId: string | number;
  reactions: ReactionType[];
  hideAddButton?: boolean;
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: (reactionId: string | number) => void;
  onOpenUserProfile?: (userId: string | number) => void;
  disableHaptics?: boolean;
  language?: string;
  newTranslations?: TranslationsType;
  reactionsRecordsEnableGroupChangeAnimation?: boolean;
  emojiPickerDisableSearch?: boolean;
  emojiPickerDisableRecentlyUsed?: boolean;
  theme?: Theme;
  styles?: Styles;
};

export type Theme = {
  reactions?: ReactionsTheme;
  reactionsRecords?: ReactionsRecordsTheme;
  emojiPicker?: EmojiPickerTheme;
};

export type Styles = {
  reactions?: ReactionsStyles;
  reactionsRecords?: ReactionsRecordsStyles;
  emojiPicker?: EmojiPickerStyles;
};

export type ReactionType = {
  id: string | number;
  emoji: string;
  user: UserType;
};

export type UserType = {
  id: string | number;
  name: string;
  avatarUrl?: string;
};

export type ReactionsRecordsProps = {
  open: boolean;
  reactionsGroups: ReactionGroupType[];
  onClose: () => void;
  onOpenUserProfile?: (id: string | number) => void;
  theme?: ReactionsRecordsTheme;
  styles?: ReactionsRecordsStyles;
  enableGroupChangeAnimation?: boolean;
};

export type EmojiPickerProps = {
  open: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
  disableSearch?: boolean;
  disableRecentlyUsed?: boolean;
  language?: string;
  newTranslations?: TranslationsType;
  theme?: EmojiPickerTheme;
  styles?: EmojiPickerStyles;
};

export type ReactionGroupType = {
  reactions: ReactionType[];
  currentUserInIt: boolean;
  emoji: string;
};

export const CATEGORIES_NAVIGATION = [
  { icon: 'Smile', category: 'smileys_emotion' },
  { icon: 'Users', category: 'people_body' },
  { icon: 'Trees', category: 'animals_nature' },
  { icon: 'Pizza', category: 'food_drink' },
  { icon: 'Plane', category: 'travel_places' },
  { icon: 'Football', category: 'activities' },
  { icon: 'Lightbulb', category: 'objects' },
  { icon: 'Ban', category: 'symbols' },
  { icon: 'Flag', category: 'flags' },
  { icon: 'Clock', category: 'recently_used' },
  { icon: 'Search', category: 'search' },
] as const;

export type IconNames = (typeof CATEGORIES_NAVIGATION)[number]['icon'];
export type CategoryTypes = (typeof CATEGORIES_NAVIGATION)[number]['category'];

export type ReactionsTheme = {
  reactionButton?: ReactionButtonTheme;
  addReactionButton?: AddReactionButtonTheme;
};

export type ReactionsRecordsTheme = {
  knob?: string;
  background?: string;
  tabBar?: ReactionsRecordsTabBarTheme;
  userItem?: UserItemTheme;
};

export type UserItemTheme = {
  name?: string;
  avatar?: AvatarTheme;
};

export type AvatarTheme = {
  background?: string;
  icon?: string;
};

export type ReactionsRecordsTabBarTheme = {
  divider?: string;
  activeHeaderGroupText?: string;
  inactiveHeaderGroupText?: string;
  activeHeaderBar?: string;
};

export type ReactionButtonTheme = {
  inactiveChipBackground?: string;
  activeChipBackground?: string;
  inactiveChipText?: string;
  activeChipText?: string;
};
export type AddReactionButtonTheme = {
  background?: string;
  icon?: string;
};

export type EmojiPickerTheme = {
  background?: string;
  knob?: string;
  divider?: string;
  listContainerBackground?: string;
  searchListContainerBackground?: string;
  titleText?: string;
  searchContainerBackground?: string;
  cancelSearchText?: string;
  searchEmptyText?: string;
  listRow: EmojiPickerListRowTheme;
  searchBar: EmojiPickerSearchBarTheme;
  searchResultsRow: EmojiPickerSearchResultsRowTheme;
  tabBar: EmojiPickerTabBarTheme;
};

export type EmojiPickerListRowTheme = {
  emojiRowContainerBackground?: string;
  emojiContainerBackground?: string;
};

export type EmojiPickerSearchBarTheme = {
  searchIcon?: string;
  clearIcon?: string;
  searchInputContainerBackground?: string;
  searchInputText?: string;
  searchInputPlaceholderText?: string;
};

export type EmojiPickerSearchResultsRowTheme = {
  rowContainerBackground?: string;
  nameText?: string;
};

export type EmojiPickerTabBarTheme = {
  tabBarBackground?: string;
  activeIcon?: string;
  inactiveIcon?: string;
  divider?: string;
  selectedItemBackgroundBack?: string;
};

export type ReactionsStyles = {
  container?: ViewStyle;
  reactionButton?: ReactionButtonStyles;
  addReactionButton?: AddReactionButtonStyles;
};

export type ReactionButtonStyles = {
  container?: ViewStyle;
  emoji?: TextStyle;
  text?: TextStyle;
};

export type AddReactionButtonStyles = {
  container?: ViewStyle;
  icon?: ImageStyle;
};

export type ReactionsRecordsStyles = {
  knob?: ViewStyle;
  listContainer?: ViewStyle;
  tabBar?: ReactionsRecordsTabBarStyles;
  userItem?: UserItemStyles;
};

export type ReactionsRecordsTabBarStyles = {
  divider?: ViewStyle;
  reactionsGroupContainer?: ViewStyle;
  reactionsGroupEmojiText?: TextStyle;
  reactionsGroupCountText?: TextStyle;
  activeIndexBar?: ViewStyle;
};

export type UserItemStyles = {
  container?: ViewStyle;
  name?: TextStyle;
  avatar?: AvatarStyles;
};

export type AvatarStyles = {
  container?: ViewStyle;
  image?: ImageStyle;
  defaultImage?: ImageStyle;
};

export type EmojiPickerStyles = {
  background?: ViewStyle;
  knob?: ViewStyle;
  listContainer?: ViewStyle;
  searchListContainer?: ViewStyle;
  titleText?: TextStyle;
  searchContainer?: ViewStyle;
  cancelSearchText?: TextStyle;
  searchEmptyText?: TextStyle;
  listRow: EmojiPickerListRowStyles;
  searchBar: EmojiPickerSearchBarStyles;
  searchResultsRow: EmojiPickerSearchResultsRowStyles;
  tabBar: EmojiPickerTabBarStyles;
};

export type EmojiPickerListRowStyles = {
  emojiRowContainer?: ViewStyle;
  emojiContainer?: ViewStyle;
  emojiText?: TextStyle;
};

export type EmojiPickerSearchBarStyles = {
  searchIcon?: ImageStyle;
  clearIcon?: ImageStyle;
  searchInputContainer?: ViewStyle;
  searchInputText?: TextStyle;
};

export type EmojiPickerSearchResultsRowStyles = {
  rowContainer?: ViewStyle;
  emojiText?: TextStyle;
  nameText?: TextStyle;
};

export type EmojiPickerTabBarStyles = {
  container?: ViewStyle;
  tabBar?: ViewStyle;
  categoryContainer?: ViewStyle;
  iconContainer?: ViewStyle;
  icon?: ImageStyle;
  divider?: ViewStyle;
  selectedItemBackgroundContainer?: ViewStyle;
  selectedItemBackground?: ViewStyle;
};

export type JsonEmoji = {
  emoji?: string;
  name: string;
  slug: string;
  group: string;
  emoji_version: string;
  unicode_version: string;
  skin_tone_support: boolean;
};

export type TranslationListType = { [key: string]: string };

export type TranslationsType = { [code: string]: TranslationListType };
