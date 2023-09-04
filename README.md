<p align="center" >
    React native emoji reactions component inspired by Slack<br />
    No native elements<br />
  <a href="https://github.com/wil2106/rn-emoji-reactions">rn-emoji-reactions</a>
</p>

## 🪄 Installation

```sh
yarn add react-native-emoji-reactions
```

### Dependencies
This library needs these dependencies to be installed in your project before you can use it:
```sh
yarn add react-native-reanimated react-native-gesture-handler
```

Using Expo?
```sh
expo install react-native-reanimated react-native-gesture-handler
```
## ⚡️ Example

https://github.com/wil2106/react-native-emoji-reactions/assets/25795688/96c63424-9bce-41aa-9a25-b2b70198b8dd

```js
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
  avatarUrl: 'https://picsum.photos/200',
};

const REACTIONS = [
  {
    id: 34,
    user: {
      id: 88787,
      name: 'john',
      avatarUrl: 'https://picsum.photos/200',
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
      avatarUrl: 'https://picsum.photos/200',
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
```

## 📖 Documentation

### ReactionsProps

| Property                                        | Type                                                  | Description |
| ----------------------------------------------- | ----------------------------------------------------- | ----------- |
| `currentUserId`                                | `string | number`                                     | The ID of the current user. |
| `reactions`                                    | `ReactionType[]`                                      | An array of `ReactionType` objects. |
| `hideAddButton`                                | `boolean` (optional)                                   | If `true`, the add reaction button is hidden. |
| `onAddReaction`                                | `(emoji: EmojiType) => void`                           | A function to handle adding a reaction. |
| `onRemoveReaction`                             | `(slug: string) => void`                               | A function to handle removing a reaction by its slug. |
| `onOpenUserProfile`                            | `(id: string | number) => void` (optional)                        | A function to handle opening a user's profile by their ID. |
| `reactionsTheme`                               | `ReactionsTheme` (optional)                            | The theme for reactions. |
| `reactionsRecordsTheme`                        | `ReactionRecordsTheme` (optional)                     | The theme for reaction records. |
| `reactionsRecordsEnableGroupChangeAnimation`    | `boolean` (optional)                                   | Enable group change animation for reaction records. |
| `emojiPickerTheme`                             | `EmojiPickerTheme` (optional)                         | The theme for the emoji picker. |
| `emojiPickerEmojiSize`                         | `number` (optional)                                   | The size of emojis in the picker. |
| `emojiPickerExpandable`                        | `boolean` (optional)                                   | If `true`, the emoji picker is expandable. |
| `emojiPickerHideHeader`                        | `boolean` (optional)                                   | If `true`, the emoji picker header is hidden. |
| `emojiPickerDefaultHeight`                     | `number | string` (optional)                            | The default height of the emoji picker. |
| `emojiPickerExpandedHeight`                    | `number | string` (optional)                            | The expanded height of the emoji picker. |
| `emojiPickerTranslation`                       | `CategoryTranslation` (optional)                      |Translation for emoji categories. |
| `emojiPickerDisabledCategories`                | `CategoryTypes[]` (optional)                          | Categories of emojis to be disabled. |
| `emojiPickerEnableRecentlyUsed`                | `boolean` (optional)                                   | Enable recently used emojis in the picker. |
| `emojiPickerCategoryPosition`                  | `CategoryPosition` (optional)                         | Position of emoji categories in the picker. |
| `emojiPickerEnableSearchBar`                   | `boolean` (optional)                                   | Enable the search bar in the emoji picker. |
| `emojiPickerCategoryOrder`                     | `CategoryTypes[]` (optional)                          | Order of emoji categories in the picker. |
| `emojiPickerDisableSafeArea`                   | `boolean` (optional)                                   | Disable safe area for the emoji picker. |
| `emojiPickerEnableSearchAnimation`             | `boolean` (optional)                                   | Enable search animation in the emoji picker. |
| `emojiPickerEnableCategoryChangeAnimation`     | `boolean` (optional)                                   | Enable category change animation in the emoji picker. |
| `emojiPickerEnableCategoryChangeGesture`       | `boolean` (optional)                                   | Enable category change gesture in the emoji picker. |
| `emojiPickerEmojisByCategory`                  | `EmojisByCategory[]` (optional)                        | Emojis grouped by category. |

### EmojiType

| Property           | Type       | Description |
| ------------------ | ---------- | ----------- |
| `emoji`            | `string`   | The emoji character itself. |
| `name`             | `string`   | The name or description of the emoji. |
| `slug`             | `string`   | A unique slug or identifier for the emoji. |
| `unicode_version`  | `string`   | The Unicode version of the emoji. |
| `toneEnabled`      | `boolean`  | Indicates whether tone is enabled for the emoji. |
| `alreadySelected`  | `boolean` (optional) | Indicates if the emoji is already selected. |

### ReactionType

| Property  | Type                   | Description                             |
| --------- | ---------------------- | --------------------------------------- |
| `id`      | `string | number`       | The unique identifier for the reaction. |
| `emoji`   | `EmojiType`            | The emoji associated with the reaction. |
| `user`    | `UserType`             | The user who created the reaction.     |

### ReactionsTheme

| Property                  | Type     | Description                                 |
| ------------------------- | -------- | ------------------------------------------- |
| `inactiveChipBackground`   | `string` (optional) | The background color for inactive chips.    |
| `activeChipBackground`     | `string` (optional) | The background color for active chips.      |
| `inactiveChipText`         | `string` (optional) | The text color for inactive chips.          |
| `activeChipText`           | `string` (optional) | The text color for active chips.            |
| `addIcon`                 | `string` (optional) | The icon used for adding reactions.         |

### ReactionRecordsTheme

| Property                  | Type     | Description                                           |
| ------------------------- | -------- | ----------------------------------------------------- |
| `handle`                  | `string` (optional) | The handle or identifier text color.                 |
| `background`              | `string` (optional) | The background color for the reaction records.       |
| `activeHeaderBar`         | `string` (optional) | The background color for the active header bar.      |
| `activeHeaderGroupText`   | `string` (optional) | The text color for active header group text.         |
| `headerGroupText`         | `string` (optional) | The text color for header group text.                |
| `userItemNameText`        | `string` (optional) | The text color for user item names.                  |
| `divider`                 | `string` (optional) | The color of dividers separating items.              |
| `userItemAvatarBackground` | `string` (optional) | The background color for user item avatars.         |
| `userItemAvatar`          | `string` (optional) | The color of user item avatars.                      |

### EmojiPickerTheme

| Property               | Type     | Description                                |
| ---------------------- | -------- | ------------------------------------------ |
| `backdrop`             | `string` (optional) | The backdrop color.                        |
| `knob`                 | `string` (optional) | The knob color.                            |
| `container`            | `string` (optional) | The container background color.            |
| `header`               | `string` (optional) | The header background color.               |
| `skinTonesContainer`   | `string` (optional) | The skin tones container background color. |
| `category.icon`        | `string` (optional) | The icon color for categories.             |
| `category.iconActive`  | `string` (optional) | The active icon color for categories.      |
| `category.container`   | `string` (optional) | The container background color for categories. |
| `category.containerActive` | `string` (optional) | The active container background color for categories. |
| `search.background`    | `string` (optional) | The background color for the search bar.   |
| `search.text`          | `string` (optional) | The text color for the search bar.         |
| `search.placeholder`   | `string` (optional) | The placeholder text color for the search bar. |
| `search.icon`          | `string` (optional) | The icon color for the search bar.         |
| `emoji.selected`       | `string` (optional) | The color of selected emojis.              |

### CategoryTranslation

| Property    | Type     | Description                                   |
| ----------- | -------- | --------------------------------------------- |
| `[key] in CategoryTypes`     | `string` | The translation for a specific category type. |

### CategoryTypes

| Value                |
| -------------------- |
| `smileys_emotion`    |
| `people_body`        |
| `animals_nature`     |
| `food_drink`         |
| `travel_places`      |
| `activities`         |
| `objects`            |
| `symbols`            |
| `flags`              |
| `recently_used`      |
| `search`             |

### CategoryPosition

| Value          |
| -------------- |
| `floating`     |
| `top`          |
| `bottom`       |

### EmojisByCategory

| Property  | Type           | Description                                      |
| --------- | -------------- | ------------------------------------------------ |
| `title`   | `CategoryTypes` | The category type for the emojis in this group. |
| `data`    | `JsonEmoji[]`  | An array of emojis belonging to the category.   |

### JsonEmoji

| Property           | Type       | Description                                          |
| ------------------ | ---------- | ---------------------------------------------------- |
| `emoji`            | `string`   | The emoji character itself.                          |
| `name`             | `string`   | The name or description of the emoji.               |
| `v`                | `string`   | The Unicode version of the emoji.                   |
| `toneEnabled`      | `boolean`  | Indicates whether tone is enabled for the emoji.    |
| `keywords`         | `string[]` (optional) | An array of keywords associated with the emoji. |


## ⚖️ License

**[MIT](/LICENSE)**

## 📝 Contribute

If you want to contribute read the [CONTRIBUTING.md](/CONTRIBUTING.md) guide.
