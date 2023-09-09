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

  reactionsTheme?: ReactionsTheme;
  reactionsStyles?: ReactionsStyles;

  reactionsRecordsTheme?: ReactionsRecordsTheme;
  reactionsRecordsEnableGroupChangeAnimation?: boolean;
  reactionsrecordsStyles?: ReactionsRecordsStyles;

  emojiPickerTheme?: EmojiPickerTheme;
  emojiPickerStyles?: EmojiPickerStyles;
  emojiPickerEmojiSize?: number;
  emojiPickerExpandable?: boolean;
  emojiPickerHideHeader?: boolean;
  emojiPickerDefaultHeight?: number | string;
  emojiPickerExpandedHeight?: number | string;
  emojiPickerTranslation?: CategoryTranslation;
  emojiPickerDisabledCategories?: CategoryTypes[];
  emojiPickerEnableRecentlyUsed?: boolean;
  emojiPickerCategoryPosition?: CategoryPosition;
  emojiPickerEnableSearchBar?: boolean;
  emojiPickerCategoryOrder?: CategoryTypes[];
  emojiPickerDisableSafeArea?: boolean;
  emojiPickerEnableSearchAnimation?: boolean;
  emojiPickerEnableCategoryChangeAnimation?: boolean;
  emojiPickerEnableCategoryChangeGesture?: boolean;
  emojiPickerEmojisByCategory?: EmojisByCategory[];
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
  reactionsRecordsEnableGroupChangeAnimation?: boolean;
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

export type OnEmojiSelected = (emoji: string) => void;

export type CategoryTranslation = {
  [key in CategoryTypes]: string;
};

export type CategoryPosition = 'floating' | 'top' | 'bottom';

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
  backdrop?: string;
  knob?: string;
  container?: string;
  header?: string;
  skinTonesContainer?: string;
  category?: {
    icon?: string;
    iconActive?: string;
    container?: string;
    containerActive?: string;
  };
  search?: {
    background?: string;
    text?: string;
    placeholder?: string;
    icon?: string;
  };
  emoji?: {
    selected?: string;
  };
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
  reactionsGroupTitle?: TextStyle;
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
  container?: ViewStyle;
  header?: TextStyle;
  knob?: ViewStyle;
  category?: {
    container?: ViewStyle;
    icon?: TextStyle;
  };
  searchBar?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
  emoji?: {
    selected?: ViewStyle;
  };
};

export type EmojisByCategory = {
  title: CategoryTypes;
  data: JsonEmoji[];
};

export type JsonEmoji = {
  emoji: string;
  name: string;
  v: string;
  toneEnabled: boolean;
  keywords?: string[];
};
