import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetVirtualizedList,
} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, Modal, StyleSheet } from 'react-native';
import emojisByCategory from './constants/emojisByCategory';
import emojis from './constants/emojis';
import CustomBackdrop from './components/CustomBackdrop';
import EmojiPickerListRow, {
  DEFAULT_EMOJI_CELL_HEIGHT,
  DEFAULT_EMOJI_CELL_WIDTH,
} from './components/EmojiPickerListRow';
import {
  ICON_CONTAINER_PADDING,
  ICON_SIZE,
  TABBAR_BOTTOM_SPACE,
} from './components/EmojiPickerTabBar';
import EmojiPickerTabBarFooter from './components/EmojiPickerTabBarFooter';
import { CATEGORIES_KEYS, MAX_RECENT_EMOJIS } from './constants';
import { EmojiPickerTabBarContext } from './context';
import type { EmojiPickerProps, JsonEmoji } from './types';
import { Text } from 'react-native';
import { View } from 'react-native';
import { EmojiPickerSearchBar } from './components/EmojiPickerSearchBar';
import { TouchableOpacity } from 'react-native';
import { Keyboard } from 'react-native';
import {
  EMOJI_PICKER_SEARCH_RESULT_ROW_HEIGHT,
  EmojiPickerSearchResultsRow,
} from './components/EmojiPickerSearchResultsRow';
import { t } from './translation';
import {
  getRecentEmojisFromLocalStorage,
  setRecentEmojisInLocalStorage,
} from './utils';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function EmojiPicker({
  open,
  onClose,
  onSelectEmoji,
  disableSearch,
  disableRecentlyUsed,
  language,
  newTranslations,
  theme,
  styles,
}: EmojiPickerProps) {
  const snapPoints = useMemo(() => ['45%', '95%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [recentEmojis, setRecentEmojis] = useState<JsonEmoji[]>([]);

  useEffect(() => {
    if (disableRecentlyUsed) {
      return;
    }
    (async () => {
      const lsRecentEmojis = await getRecentEmojisFromLocalStorage();
      setRecentEmojis(lsRecentEmojis);
    })();
  }, [disableRecentlyUsed]);

  useEffect(() => {
    if (open) {
      // open bottom sheet
      bottomSheetRef.current?.present();
    } else {
      setCurrentCategoryIndex(0);
      setSearch('');
      setDebouncedSearch('');
      setSearchMode(false);
    }
  }, [open]);

  const nbEmojisPerRow = useMemo(
    () => Math.floor(DEVICE_WIDTH / DEFAULT_EMOJI_CELL_WIDTH),
    []
  );

  const emojiRowsByCategory = useMemo(() => {
    let theEmojiRowsByCategory = [];
    for (const [category, categoryEmojis] of Object.entries(emojisByCategory)) {
      if (category === 'default') continue;
      let theEmojiRows = [];
      let emojiRow = [];
      for (let i = 0; i < categoryEmojis.length; i++) {
        if (i !== 0 && i % nbEmojisPerRow === 0) {
          theEmojiRows.push(emojiRow);
          emojiRow = [];
        }
        const emoji = categoryEmojis[i];
        emojiRow.push(emoji);
      }
      //add remaining emojis
      if (emojiRow.length > 0) {
        // fill array with empty items
        const lastRowEmojisCount = emojiRow.length;
        for (let a = lastRowEmojisCount; a < nbEmojisPerRow; a++) {
          emojiRow.push(null);
        }
        theEmojiRows.push(emojiRow);
      }
      const key = CATEGORIES_KEYS[category] ?? 'unknown';
      theEmojiRowsByCategory.push({
        key: key,
        name: t(key, language, newTranslations, category),
        emojiRows: theEmojiRows,
      });
    }
    return theEmojiRowsByCategory;
  }, [nbEmojisPerRow, language, newTranslations]);

  const recentEmojiRowsCategory = useMemo(() => {
    let theRecentEmojiRows = [];
    let emojiRow = [];
    for (let i = 0; i < recentEmojis.length; i++) {
      if (i !== 0 && i % nbEmojisPerRow === 0) {
        theRecentEmojiRows.push(emojiRow);
        emojiRow = [];
      }
      const emoji = recentEmojis[i];
      emojiRow.push(emoji);
    }
    //add remaining emojis
    if (emojiRow.length > 0) {
      // fill array with empty items
      const lastRowEmojisCount = emojiRow.length;
      for (let a = lastRowEmojisCount; a < nbEmojisPerRow; a++) {
        emojiRow.push(null);
      }
      theRecentEmojiRows.push(emojiRow);
    }
    return {
      key: 'recently_used',
      name: t('recently_used', language, newTranslations, 'Recently used'),
      emojiRows: theRecentEmojiRows,
    };
  }, [nbEmojisPerRow, recentEmojis, language, newTranslations]);

  const finalEmojiRowsByCategory = useMemo(() => {
    return [
      ...(recentEmojiRowsCategory.emojiRows.length > 0
        ? [recentEmojiRowsCategory]
        : []),
      ...emojiRowsByCategory,
    ];
  }, [emojiRowsByCategory, recentEmojiRowsCategory]);

  const searchedEmojis = useMemo(() => {
    if (debouncedSearch.trim().length === 0) {
      return [];
    }
    let theSearchedEmojis = [];
    for (const [emoji, emojiData] of Object.entries(emojis)) {
      const translatedName = t(
        emojiData.slug,
        language,
        newTranslations,
        emojiData.name
      );
      if (
        translatedName
          .toLowerCase()
          .includes(debouncedSearch.trim().toLowerCase())
      ) {
        theSearchedEmojis.push({ ...emojiData, emoji, name: translatedName });
      }
    }
    return theSearchedEmojis;
  }, [debouncedSearch, language, newTranslations]);

  const currentCategory = useMemo(
    () =>
      finalEmojiRowsByCategory[currentCategoryIndex] ?? {
        key: 'unknown',
        name: 'unknown',
        emojiRows: [],
      },
    [finalEmojiRowsByCategory, currentCategoryIndex]
  );

  const categories = useMemo(
    () => finalEmojiRowsByCategory.map((cat) => cat.key),
    [finalEmojiRowsByCategory]
  );

  const translatedRecentEmojis = useMemo(
    () =>
      recentEmojis.map((emo) => ({
        ...emo,
        name: t(emo.slug, language, newTranslations, emo.name),
      })),
    [recentEmojis, language, newTranslations]
  );

  const onChooseEmoji = useCallback(
    (emoji: JsonEmoji) => {
      if (!emoji.emoji) {
        return;
      }
      bottomSheetRef.current?.close();
      onSelectEmoji(emoji.emoji);
      // add on top, remove duplicates, limit to MAX_RECENT_EMOJIS
      const newRecentEmojis = [
        emoji,
        ...recentEmojis.filter((emj: JsonEmoji) => emj.slug !== emoji.slug),
      ].slice(0, MAX_RECENT_EMOJIS);
      setRecentEmojis(newRecentEmojis);
      setRecentEmojisInLocalStorage(newRecentEmojis);
    },
    [onSelectEmoji, recentEmojis]
  );

  const renderEmojiPickerListRow = useCallback(
    ({ item }) => (
      <EmojiPickerListRow
        item={item}
        onChooseEmoji={onChooseEmoji}
        theme={theme?.listRow}
        styles={styles?.listRow}
      />
    ),
    [onChooseEmoji, theme, styles]
  );

  const renderEmojiPickerSearchResultsRow = useCallback(
    ({ item }) => (
      <EmojiPickerSearchResultsRow
        emoji={item}
        onPress={() => onChooseEmoji(item)}
        theme={theme?.searchResultsRow}
        styles={styles?.searchResultsRow}
      />
    ),
    [onChooseEmoji, theme, styles]
  );

  const renderEmptySearchComponent = () => {
    return searchedEmojis.length === 0 && debouncedSearch.trim().length > 0 ? (
      <Text
        style={[
          defaultStyles.searchEmptyText,
          styles?.searchEmptyText,
          theme?.searchEmptyText
            ? {
                color: theme.searchEmptyText,
              }
            : {},
        ]}
      >
        {t('search_results_empty', language, newTranslations, undefined, {
          value: search,
        })}
      </Text>
    ) : (
      <></>
    );
  };

  const onCancelSearch = () => {
    setSearchMode(false);
    setSearch('');
    setDebouncedSearch('');
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(1);
  };

  return (
    <EmojiPickerTabBarContext.Provider
      value={{
        categories,
        currentCategoryIndex,
        setCurrentCategoryIndex,
        theme: theme?.tabBar,
        styles: styles?.tabBar,
      }}
    >
      <Modal transparent={true} visible={open}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={CustomBackdrop}
            enablePanDownToClose={true}
            onDismiss={onClose}
            footerComponent={searchMode ? undefined : EmojiPickerTabBarFooter}
            handleIndicatorStyle={[
              styles?.knob,
              theme?.knob
                ? {
                    backgroundColor: theme.knob,
                  }
                : {},
            ]}
            backgroundStyle={[
              defaultStyles.background,
              theme?.background
                ? {
                    backgroundColor: theme.background,
                  }
                : {},
            ]}
          >
            {!disableSearch && (
              <View
                style={[
                  defaultStyles.searchContainer,
                  styles?.searchContainer,
                  theme?.searchContainerBackground
                    ? {
                        backgroundColor: theme.searchContainerBackground,
                      }
                    : {},
                  theme?.divider
                    ? {
                        borderColor: theme.divider,
                      }
                    : {},
                ]}
              >
                <EmojiPickerSearchBar
                  value={search}
                  onChangeText={setSearch}
                  onDebounceChangeText={setDebouncedSearch}
                  placeholder={t(
                    'search_placeholder',
                    language,
                    newTranslations
                  )}
                  onFocus={() => setSearchMode(true)}
                  theme={theme?.searchBar}
                  styles={styles?.searchBar}
                />
                {searchMode && (
                  <TouchableOpacity onPress={onCancelSearch}>
                    <Text
                      style={[
                        defaultStyles.cancelSearchText,
                        styles?.cancelSearchText,
                        theme?.cancelSearchText
                          ? {
                              color: theme.cancelSearchText,
                            }
                          : {},
                      ]}
                      numberOfLines={1}
                    >
                      {t('cancel', language, newTranslations, 'Cancel')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            {searchMode ? (
              <BottomSheetVirtualizedList
                data={
                  search.trim().length > 0
                    ? searchedEmojis
                    : translatedRecentEmojis
                }
                ListHeaderComponent={renderEmptySearchComponent}
                keyExtractor={(emoji: JsonEmoji) => emoji.slug}
                getItemCount={(data) => data.length}
                getItem={(data, rowIndex) => data[rowIndex]}
                renderItem={renderEmojiPickerSearchResultsRow}
                style={{ width: DEVICE_WIDTH }}
                contentContainerStyle={[
                  defaultStyles.searchListContainer,
                  styles?.searchListContainer,
                  theme?.searchListContainerBackground
                    ? {
                        backgroundColor: theme.searchListContainerBackground,
                      }
                    : {},
                ]}
                getItemLayout={(_, rowIndex) => ({
                  length: EMOJI_PICKER_SEARCH_RESULT_ROW_HEIGHT,
                  offset: EMOJI_PICKER_SEARCH_RESULT_ROW_HEIGHT * rowIndex,
                  index: rowIndex,
                })}
              />
            ) : (
              <>
                <View style={defaultStyles.titleContainer}>
                  <Text
                    style={[
                      defaultStyles.titleText,
                      styles?.titleText,
                      theme?.titleText
                        ? {
                            color: theme.titleText,
                          }
                        : {},
                    ]}
                  >
                    {currentCategory.name}
                  </Text>
                </View>
                <BottomSheetVirtualizedList
                  data={currentCategory.emojiRows}
                  keyExtractor={(_, rowIndex) =>
                    `${currentCategory.key}-row-${rowIndex}`
                  }
                  getItemCount={(data) => data.length}
                  getItem={(data, rowIndex) => data[rowIndex]}
                  renderItem={renderEmojiPickerListRow}
                  style={{ width: DEVICE_WIDTH }}
                  contentContainerStyle={[
                    defaultStyles.listContainer,
                    styles?.listContainer,
                    theme?.listContainerBackground
                      ? {
                          backgroundColor: theme.listContainerBackground,
                        }
                      : {},
                  ]}
                  getItemLayout={(_, rowIndex) => ({
                    length: DEFAULT_EMOJI_CELL_HEIGHT,
                    offset: DEFAULT_EMOJI_CELL_HEIGHT * rowIndex,
                    index: rowIndex,
                  })}
                />
              </>
            )}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Modal>
    </EmojiPickerTabBarContext.Provider>
  );
}

const defaultStyles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
  },
  knob: {
    backgroundColor: '#DDDDDD',
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: TABBAR_BOTTOM_SPACE + ICON_SIZE + ICON_CONTAINER_PADDING * 2,
  },
  searchListContainer: {},
  titleContainer: {
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 16,
    color: '#5F5F5F',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
  },
  cancelSearchText: {
    fontWeight: '600',
    alignSelf: 'center',
    color: '#1C1C1C',
  },
  searchEmptyText: {
    fontSize: 14,
    color: '#868686',
    alignSelf: 'center',
    marginTop: 20,
  },
});
