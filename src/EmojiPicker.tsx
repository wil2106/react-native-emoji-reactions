import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetVirtualizedList,
  BottomSheetVirtualizedListMethods,
} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import {
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import emojis from 'unicode-emoji-json/data-by-emoji.json';
import emojisByCategory from 'unicode-emoji-json/data-by-group.json';
import CustomBackdrop from './components/CustomBackdrop';
import EmojiPickerListRow, {
  EMOJI_CELL_SIZE,
} from './components/EmojiPickerListRow';
import { EmojiPickerSearchBar } from './components/EmojiPickerSearchBar';
import {
  EMOJI_PICKER_SEARCH_RESULT_ROW_HEIGHT,
  EmojiPickerSearchResultsRow,
} from './components/EmojiPickerSearchResultsRow';
import {
  ICON_CONTAINER_PADDING,
  ICON_SIZE,
  TABBAR_BOTTOM_SPACE,
} from './components/EmojiPickerTabBar';
import EmojiPickerTabBarFooter from './components/EmojiPickerTabBarFooter';
import { CATEGORIES_KEYS, MAX_RECENT_EMOJIS } from './constants';
import { EmojiPickerContext, EmojiPickerTabBarContext } from './context';
import { t } from './translation';
import type { Category, EmojiPickerProps, EmojiRow, JsonEmoji } from './types';
import {
  getRecentEmojisFromLocalStorage,
  setRecentEmojisInLocalStorage,
} from './utils';

const DEVICE_WIDTH = Dimensions.get('window').width;
const TOP_INSET = 50;

const EmojiPickerwithHOC = gestureHandlerRootHOC(() => {
  const {
    open,
    onClose,
    onSelectEmoji,
    disableSearch,
    disableRecentlyUsed,
    language,
    newTranslations,
    theme,
    styles,
  } = useContext(EmojiPickerContext);
  const snapPoints = useMemo(() => ['45%', '95%'], []);
  let lastScrollCheckAt = useRef<number>().current;
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const emojiListRef = useRef<BottomSheetVirtualizedListMethods>(null);
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
    () => Math.floor(DEVICE_WIDTH / EMOJI_CELL_SIZE),
    []
  );

  const emojiRows = useMemo(() => {
    let theEmojiRows: EmojiRow[] = [];

    for (const [categoryName, categoryEmojis] of Object.entries(
      emojisByCategory
    )) {
      if (categoryName === 'default') continue;

      const key = CATEGORIES_KEYS[categoryName] ?? 'unknown';
      theEmojiRows.push({
        title: {
          key,
          name: t(key, language, newTranslations, categoryName),
        },
      });

      let emojiRow: (JsonEmoji | null)[] = [];
      for (let i = 0; i < categoryEmojis.length; i++) {
        if (i !== 0 && i % nbEmojisPerRow === 0) {
          theEmojiRows.push({ emojis: emojiRow });
          emojiRow = [];
        }
        const emoji = categoryEmojis[i];
        if (emoji) {
          emojiRow.push(emoji);
        }
      }
      //add remaining emojis
      if (emojiRow.length > 0) {
        // fill array with empty items
        const lastRowEmojisCount = emojiRow.length;
        for (let a = lastRowEmojisCount; a < nbEmojisPerRow; a++) {
          emojiRow.push(null);
        }
        theEmojiRows.push({ emojis: emojiRow });
      }
    }
    return theEmojiRows;
  }, [nbEmojisPerRow, language, newTranslations]);

  const recentEmojiRows = useMemo(() => {
    let theRecentEmojiRows: EmojiRow[] = [
      {
        title: {
          key: 'recently_used',
          name: t('recently_used', language, newTranslations, 'Recently used'),
        },
      },
    ];
    let emojiRow: (JsonEmoji | null)[] = [];
    for (let i = 0; i < recentEmojis.length; i++) {
      if (i !== 0 && i % nbEmojisPerRow === 0) {
        theRecentEmojiRows.push({ emojis: emojiRow });
        emojiRow = [];
      }
      const emoji = recentEmojis[i];
      if (emoji) {
        emojiRow.push(emoji);
      }
    }
    //add remaining emojis
    if (emojiRow.length > 0) {
      // fill array with empty items
      const lastRowEmojisCount = emojiRow.length;
      for (let a = lastRowEmojisCount; a < nbEmojisPerRow; a++) {
        emojiRow.push(null);
      }
      theRecentEmojiRows.push({ emojis: emojiRow });
    }
    return theRecentEmojiRows;
  }, [nbEmojisPerRow, recentEmojis, language, newTranslations]);

  const finalEmojiRows = useMemo(() => {
    return [...(disableRecentlyUsed ? [] : recentEmojiRows), ...emojiRows];
  }, [emojiRows, recentEmojiRows, disableRecentlyUsed]);

  const categories = useMemo(() => {
    const theCategories: Category[] = [];
    for (let i = 0; i < finalEmojiRows.length; i++) {
      const emojiRow = finalEmojiRows[i];
      if (emojiRow?.title) {
        theCategories.push({
          key: emojiRow?.title.key,
          name: emojiRow?.title.name,
          yOffset: i * EMOJI_CELL_SIZE,
        });
      }
    }
    return theCategories;
  }, [finalEmojiRows]);

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

  const renderEmojiPickerRow = useCallback(
    ({ item }: { item: EmojiRow }) => (
      <EmojiPickerListRow
        item={item}
        onChooseEmoji={onChooseEmoji}
        nbEmojisPerRow={nbEmojisPerRow}
        theme={theme?.listRow}
        styles={styles?.listRow}
      />
    ),
    [onChooseEmoji, theme, styles, nbEmojisPerRow]
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

  const onSelectCategory = (index: number) => {
    setCurrentCategoryIndex(index);
    bottomSheetRef.current?.expand();
    if (emojiListRef.current && categories[index] !== undefined) {
      setTimeout(() => {
        // disable scroll check for 1s
        lastScrollCheckAt = Date.now() + 1000;
        emojiListRef.current!.scrollToOffset({
          animated: false,
          offset: categories[index]!.yOffset,
        });
      }, 1000);
    }
  };

  const onEmojiListScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    //throttle
    const now = Date.now();
    if (lastScrollCheckAt !== undefined && now - lastScrollCheckAt < 500) {
      return;
    }
    lastScrollCheckAt = now;
    const yOffset = event.nativeEvent.contentOffset.y;
    for (let i = 0; i < categories.length; i++) {
      if (
        categories[i]!.yOffset <= yOffset &&
        (categories[i + 1]?.yOffset ?? Infinity) > yOffset
      ) {
        setCurrentCategoryIndex(i);
        break;
      }
    }
  };

  return (
    <EmojiPickerTabBarContext.Provider
      value={{
        categories,
        currentCategoryIndex,
        onSelectCategory,
        theme: theme?.tabBar,
        styles: styles?.tabBar,
      }}
    >
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={CustomBackdrop}
          enablePanDownToClose={true}
          onDismiss={onClose}
          footerComponent={searchMode ? undefined : EmojiPickerTabBarFooter}
          topInset={TOP_INSET}
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
                placeholder={t('search_placeholder', language, newTranslations)}
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
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="none"
            />
          ) : (
            <BottomSheetVirtualizedList
              ref={emojiListRef}
              data={finalEmojiRows}
              onScroll={onEmojiListScroll}
              keyExtractor={(_, rowIndex) => rowIndex + ''}
              getItemCount={(data) => data.length}
              getItem={(data, rowIndex) => data[rowIndex]}
              renderItem={renderEmojiPickerRow}
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
                length: EMOJI_CELL_SIZE,
                offset: EMOJI_CELL_SIZE * rowIndex,
                index: rowIndex,
              })}
            />
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </EmojiPickerTabBarContext.Provider>
  );
});

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
  return (
    <Modal visible={open} transparent>
      <EmojiPickerContext.Provider
        value={{
          open,
          onClose,
          onSelectEmoji,
          disableSearch,
          disableRecentlyUsed,
          language,
          newTranslations,
          theme,
          styles,
        }}
      >
        <EmojiPickerwithHOC />
      </EmojiPickerContext.Provider>
    </Modal>
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
