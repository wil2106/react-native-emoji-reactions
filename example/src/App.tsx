import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  Reactions,
  type EmojiType,
  type ReactionType,
} from 'react-native-emoji-reactions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CURRENT_USER = {
  id: 88787,
  name: 'john',
  avatarUrl: 'https://picsum.photos/300',
};

const REACTIONS = [
  {
    id: 34,
    user: {
      id: 88787,
      name: 'john',
      avatarUrl: 'https://picsum.photos/301',
    },
    emoji: {
      emoji: '😃',
      toneEnabled: false,
      name: 'grinning face with big eyes',
      slug: 'grinning_face_with_big_eyes',
      unicode_version: '0.6',
      emoji_version: '0.6',
    },
  },
  {
    id: 877,
    user: {
      id: 15454,
      name: 'jake',
      avatarUrl: 'https://picsum.photos/302',
    },
    emoji: {
      emoji: '😇',
      toneEnabled: false,
      name: 'smiling face with halo',
      slug: 'smiling_face_with_halo',
      unicode_version: '1.0',
      emoji_version: '1.0',
    },
  },
  {
    id: 877,
    user: {
      id: 15454,
      name: 'lea',
      avatarUrl: 'https://picsum.photos/303',
    },
    emoji: {
      emoji: '🐌',
      toneEnabled: false,
      name: 'snail',
      slug: 'snail',
      unicode_version: '0.6',
      emoji_version: '0.6',
    },
  },
  {
    id: 154,
    user: {
      id: 887845,
      name: 'marc',
    },
    emoji: {
      emoji: '🌶️',
      toneEnabled: false,
      name: 'hot pepper',
      slug: 'hot_pepper',
      unicode_version: '0.7',
      emoji_version: '0.7',
    },
  },
  {
    id: 87787,
    user: {
      id: 878,
      name: 'billy',
      avatarUrl: 'https://picsum.photos/304',
    },
    emoji: {
      emoji: '🍛',
      toneEnabled: false,
      name: 'curry rice',
      slug: 'curry_rice',
      unicode_version: '0.6',
      emoji_version: '0.6',
    },
  },
  {
    id: 87984,
    user: {
      id: 1544,
      name: 'alice',
      avatarUrl: 'https://picsum.photos/305',
    },
    emoji: {
      emoji: '🏠',
      toneEnabled: false,
      name: 'house',
      slug: 'house',
      unicode_version: '0.6',
      emoji_version: '0.6',
    },
  },
  {
    id: 9518,
    user: {
      id: 369,
      name: 'barry',
      avatarUrl: 'https://picsum.photos/306',
    },
    emoji: {
      emoji: '🎪',
      toneEnabled: false,
      name: 'circus tent',
      slug: 'circus_tent',
      unicode_version: '0.6',
      emoji_version: '0.6',
    },
  },
  {
    id: 7583,
    user: {
      id: 147,
      name: 'eric',
      avatarUrl: 'https://picsum.photos/307',
    },
    emoji: {
      emoji: '🚄',
      toneEnabled: false,
      name: 'high-speed train',
      slug: 'high_speed_train',
      unicode_version: '0.6',
      emoji_version: '0.6',
    },
  },
  {
    id: 96,
    user: {
      id: 7814,
      name: 'garry',
      avatarUrl: 'https://picsum.photos/308',
    },
    emoji: {
      emoji: '😃',
      toneEnabled: false,
      name: 'grinning face with big eyes',
      slug: 'grinning_face_with_big_eyes',
      unicode_version: '0.6',
      emoji_version: '0.6',
    },
  },
  {
    id: 7494,
    user: {
      id: 15843,
      name: 'louie',
      avatarUrl: 'https://picsum.photos/309',
    },
    emoji: {
      emoji: '🎳',
      toneEnabled: false,
      name: 'bowling',
      slug: 'bowling',
      unicode_version: '0.6',
      emoji_version: '0.6',
    },
  },
];

export default function App() {
  const [reactions, setReactions] = React.useState<ReactionType[]>(REACTIONS);

  const onAddReaction = (emoji: EmojiType) => {
    setReactions((prevState) => [
      ...prevState,
      { id: Date.now(), user: CURRENT_USER, emoji, createdAt: new Date() },
    ]);
  };

  const onRemoveReaction = (slug: string) => {
    setReactions((prevState) =>
      prevState.filter(
        (reaction) =>
          !(
            reaction.emoji.slug === slug && reaction.user.id === CURRENT_USER.id
          )
      )
    );
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Reactions
        currentUserId={CURRENT_USER.id}
        reactions={reactions}
        onAddReaction={onAddReaction}
        onRemoveReaction={onRemoveReaction}
        onOpenUserProfile={(id) =>
          console.log(`Open user profile with id: ${id}`)
        }
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
});
