import type { ViewStyle, TextStyle } from 'react-native';

export type ReactionsProps = {
  currentUserId: string | number;
  reactions: ReactionType[];
  hideAddButton?: boolean;
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: (slug: string) => void;
  onOpenUserProfile?: (id: string | number) => void;

  reactionsTheme?: ReactionsTheme;

  reactionsRecordsTheme?: ReactionRecordsTheme;
  reactionsRecordsEnableGroupChangeAnimation?: boolean;

  emojiPickerTheme?: EmojiPickerTheme;
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
  theme?: ReactionRecordsTheme;
  reactionsRecordsEnableGroupChangeAnimation?: boolean;
};

export type ReactionGroupType = {
  reactions: ReactionType[];
  currentUserInIt: boolean;
  emoji: string;
};

export type EmojiPickerProps = {
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
  inactiveChipBackground?: string;
  activeChipBackground?: string;
  inactiveChipText?: string;
  activeChipText?: string;
  addIcon?: string;
};

export type ReactionRecordsTheme = {
  handle?: string;
  background?: string;
  activeHeaderBar?: string;
  activeHeaderGroupText?: string;
  inactiveHeaderGroupText?: string;
  userItemNameText?: string;
  divider?: string;
  userItemAvatarBackground?: string;
  userItemAvatar?: string;
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

export type Styles = {
  container: ViewStyle;
  header: TextStyle;
  knob: ViewStyle;
  category: {
    container: ViewStyle;
    icon: TextStyle;
  };
  searchBar: {
    container: ViewStyle;
    text: TextStyle;
  };
  emoji: {
    selected: ViewStyle;
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
