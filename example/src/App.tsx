import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Reactions, type ReactionType } from 'react-native-emoji-reactions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CURRENT_USER = {
  id: 88787,
  name: 'john',
  avatarUrl: 'https://picsum.photos/300',
};

const REACTIONS = [
  {
    id: 1,
    user: {
      id: 88787,
      name: 'john',
      avatarUrl: 'https://picsum.photos/301',
    },
    emoji: '😃',
  },
  {
    id: 2,
    user: {
      id: 15454,
      name: 'jake',
      avatarUrl: 'https://picsum.photos/302',
    },
    emoji: '😇',
  },
  {
    id: 3,
    user: {
      id: 15454,
      name: 'lea',
      avatarUrl: 'https://picsum.photos/303',
    },
    emoji: '🐌',
  },
  {
    id: 4,
    user: {
      id: 887845,
      name: 'marc',
    },
    emoji: '🌶️',
  },
  {
    id: 5,
    user: {
      id: 878,
      name: 'billy',
      avatarUrl: 'https://picsum.photos/304',
    },
    emoji: '🍛',
  },
  {
    id: 6,
    user: {
      id: 1544,
      name: 'alice',
      avatarUrl: 'https://picsum.photos/305',
    },
    emoji: '🏠',
  },
  {
    id: 7,
    user: {
      id: 369,
      name: 'barry',
      avatarUrl: 'https://picsum.photos/306',
    },
    emoji: '🎪',
  },
  {
    id: 8,
    user: {
      id: 147,
      name: 'eric',
      avatarUrl: 'https://picsum.photos/307',
    },
    emoji: '🚄',
  },
  {
    id: 9,
    user: {
      id: 7814,
      name: 'garry',
      avatarUrl: 'https://picsum.photos/308',
    },
    emoji: '😃',
  },
  {
    id: 10,
    user: {
      id: 15843,
      name: 'louie',
      avatarUrl: 'https://picsum.photos/309',
    },
    emoji: '🎳',
  },
];

export default function App() {
  const [reactions, setReactions] = React.useState<ReactionType[]>(REACTIONS);

  const onAddReaction = (emoji: string) => {
    setReactions((prevState) => [
      ...prevState,
      { id: Date.now(), user: CURRENT_USER, emoji, createdAt: new Date() },
    ]);
  };

  const onRemoveReaction = (reactionId: string | number) => {
    setReactions((prevState) =>
      prevState.filter((reac) => reac.id !== reactionId)
    );
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Reactions
        currentUserId={CURRENT_USER.id}
        reactions={reactions}
        onAddReaction={onAddReaction}
        onRemoveReaction={onRemoveReaction}
        onOpenUserProfile={(userId) =>
          console.log(`Open user profile with id: ${userId}`)
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
