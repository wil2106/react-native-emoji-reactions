import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAX_RECENT_EMOJIS, STORAGE_KEY } from './constants';
import type { JsonEmoji } from './types';

export const formatNumber = (num: number, precision = 0) => {
  const map = [
    { suffix: 't', threshold: 1e12 },
    { suffix: 'b', threshold: 1e9 },
    { suffix: 'm', threshold: 1e6 },
    { suffix: 'k', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
};

export const getRecentEmojisFromLocalStorage = async () => {
  const recentEmojisStr = await AsyncStorage.getItem(STORAGE_KEY);
  const recentEmojis = JSON.parse(recentEmojisStr || '[]');
  return recentEmojis;
};

export const setRecentEmojisInLocalStorage = async (emojis: JsonEmoji[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(emojis));
};

export const addRecentEmojiToLocalStorage = async (emoji: JsonEmoji) => {
  const recentEmojis = await getRecentEmojisFromLocalStorage();
  // replace if exists, add on top of stack and limit to n max emojis
  const newRecentEmojis = [
    emoji,
    ...recentEmojis.filter((emj: JsonEmoji) => emj.slug !== emoji.slug),
  ].slice(0, MAX_RECENT_EMOJIS);
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRecentEmojis));
  return newRecentEmojis;
};
