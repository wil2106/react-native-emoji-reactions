import * as React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Reactions, type ReactionType } from 'react-native-emoji-reactions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import fr from './translations/fr';

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

const CUSTOM_THEME = {
  reactions: {
    reactionButton: {
      inactiveChipBackground: '#2F3538',
      activeChipBackground: '#004D90',
      inactiveChipText: '#D0D3D2',
      activeChipText: '#FFFFFF',
    },
    addReactionButton: {
      background: '#2F3538',
      icon: '#D2D2D2',
    },
  },
  reactionsRecords: {
    knob: '#2F3538',
    background: '#1C1D21',
    tabBar: {
      divider: '#2D3235',
      activeHeaderGroupText: '#009DD6',
      inactiveHeaderGroupText: '#D2D2D2',
      activeHeaderBar: '#009DD6',
    },
    userItem: {
      name: '#D2D2D2',
      avatar: {
        background: '#510F4B',
        icon: '#F5F3F6',
      },
    },
  },
  emojiPicker: {
    background: '#1C1D21',
    knob: '#2F3538',
    divider: '#2E3538',
    listContainerBackground: '#1C1D21',
    searchListContainerBackground: '#1C1D21',
    titleText: '#9B9C9E',
    searchContainerBackground: '#1C1D21',
    cancelSearchText: '#D2D2D2',
    searchEmptyText: '#767779',
    listRow: {
      emojiRowContainerBackground: '#1C1D21',
      emojiContainerBackground: '#1C1D21',
    },
    searchBar: {
      searchIcon: '#A1A1AB',
      clearIcon: '#A1A1AB',
      searchInputContainerBackground: '#313237',
      searchInputText: '#D2D2D2',
      searchInputPlaceholderText: '#A1A1AB',
    },
    searchResultsRow: {
      rowContainerBackground: '#1C1D21',
      nameText: '#D2D2D2',
    },
    tabBar: {
      tabBarBackground: '#414045',
      activeIcon: '#FEFEFE',
      inactiveIcon: '#D1D1D1',
      divider: '#56555D',
      selectedItemBackgroundBack: '#1C1D21',
    },
  },
};

const CUSTOM_STYLE = {
  reactionsRecords: {
    userItem: {
      avatar: {
        container: {
          borderRadius: 1000,
        },
      },
    },
  },
};

export default function App() {
  const [reactions, setReactions] = React.useState<ReactionType[]>(REACTIONS);
  const [enableCustomTheme, toggleEnableCustomTheme] = React.useReducer(
    (prevState) => !prevState,
    false
  );
  const [enableCustomStyle, toggleEnableCustomStyle] = React.useReducer(
    (prevState) => !prevState,
    false
  );
  const [enableCustomTranslation, toggleEnableCustomTranslation] =
    React.useReducer((prevState) => !prevState, false);

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
      <View style={styles.row}>
        <Text>Enable custom theme:</Text>
        <Switch
          onValueChange={toggleEnableCustomTheme}
          value={enableCustomTheme}
        />
      </View>
      <View style={styles.row}>
        <Text>Enable custom style:</Text>
        <Switch
          onValueChange={toggleEnableCustomStyle}
          value={enableCustomStyle}
        />
      </View>
      <View style={styles.row}>
        <Text>Enable custom translation:</Text>
        <Switch
          onValueChange={toggleEnableCustomTranslation}
          value={enableCustomTranslation}
        />
      </View>
      <Reactions
        currentUserId={CURRENT_USER.id}
        reactions={reactions}
        onAddReaction={onAddReaction}
        onRemoveReaction={onRemoveReaction}
        onOpenUserProfile={(userId) =>
          console.log(`Open user profile with id: ${userId}`)
        }
        language={enableCustomTranslation ? 'fr' : undefined}
        newTranslations={{ fr }}
        theme={enableCustomTheme ? CUSTOM_THEME : {}}
        styles={enableCustomStyle ? CUSTOM_STYLE : {}}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
