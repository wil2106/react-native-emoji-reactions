import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import type {
  EmojiPickerSearchBarStyles,
  EmojiPickerSearchBarTheme,
} from '../../src/types';

export const EmojiPickerSearchBar = ({
  value,
  placeholder,
  onChangeText,
  onDebounceChangeText,
  debounceTime = 500,
  onFocus,
  onBlur,
  theme,
  styles,
}: {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onDebounceChangeText: (text: string) => void;
  debounceTime?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  theme?: EmojiPickerSearchBarTheme;
  styles?: EmojiPickerSearchBarStyles;
}) => {
  const timerRef = useRef<NodeJS.Timeout>();

  const onChange = (text: string) => {
    onChangeText(text);
    // debounce
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onDebounceChangeText(text);
    }, debounceTime);
  };

  const onClear = () => {
    onChange('');
  };

  return (
    <View
      style={[
        defaultStyles.searchInputContainer,
        styles?.searchInputContainer,
        theme?.searchInputContainerBackground
          ? {
              backgroundColor: theme.searchInputContainerBackground,
            }
          : {},
      ]}
    >
      <Image
        source={require('../assets/icons/search.png')}
        style={[
          defaultStyles.searchIcon,
          styles?.searchIcon,
          theme?.searchIcon
            ? {
                tintColor: theme.searchIcon,
              }
            : {},
        ]}
      />
      <BottomSheetTextInput
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme?.searchInputPlaceholderText ?? '#848388'}
        onChangeText={onChange}
        style={[
          defaultStyles.searchInputText,
          styles?.searchInputText,
          theme?.searchInputText
            ? {
                color: theme.searchInputText,
              }
            : {},
        ]}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Image
            source={require('../assets/icons/clear.png')}
            style={[
              defaultStyles.clearIcon,
              styles?.clearIcon,
              theme?.clearIcon
                ? {
                    tintColor: theme.clearIcon,
                  }
                : {},
            ]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  searchIcon: {
    tintColor: '#838287',
    width: 22,
    height: 22,
  },
  clearIcon: {
    tintColor: '#838287',
    width: 18,
    height: 18,
  },
  searchInputContainer: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    backgroundColor: '#EEEEF0',
  },
  searchInputText: {
    paddingVertical: 8,
    flex: 1,
  },
});
