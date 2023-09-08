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
    user: {
      id: 88787,
      name: 'john',
      avatarUrl: 'https://picsum.photos/301',
    },
    emoji: '😃',
  },
  {
    user: {
      id: 15454,
      name: 'jake',
      avatarUrl: 'https://picsum.photos/302',
    },
    emoji: '😇',
  },
  {
    user: {
      id: 15454,
      name: 'lea',
      avatarUrl: 'https://picsum.photos/303',
    },
    emoji: '🐌',
  },
  {
    user: {
      id: 887845,
      name: 'marc',
    },
    emoji: '🌶️',
  },
  {
    user: {
      id: 878,
      name: 'billy',
      avatarUrl: 'https://picsum.photos/304',
    },
    emoji: '🍛',
  },
  {
    user: {
      id: 1544,
      name: 'alice',
      avatarUrl: 'https://picsum.photos/305',
    },
    emoji: '🏠',
  },
  {
    user: {
      id: 369,
      name: 'barry',
      avatarUrl: 'https://picsum.photos/306',
    },
    emoji: '🎪',
  },
  {
    user: {
      id: 147,
      name: 'eric',
      avatarUrl: 'https://picsum.photos/307',
    },
    emoji: '🚄',
  },
  {
    user: {
      id: 7814,
      name: 'garry',
      avatarUrl: 'https://picsum.photos/308',
    },
    emoji: '😃',
  },
  {
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

  const onRemoveReaction = (emoji: string) => {
    setReactions((prevState) =>
      prevState.filter(
        (reaction) =>
          !(reaction.emoji === emoji && reaction.user.id === CURRENT_USER.id)
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
