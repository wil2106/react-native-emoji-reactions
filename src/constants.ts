import type { ImageSourcePropType } from 'react-native';

export const CATEGORIES_ICONS_SOURCES: {
  [category: string]: ImageSourcePropType;
} = {
  recently_used: require('./assets/icons/clock.png'),
  smileys_emotion: require('./assets/icons/smile.png'),
  people_body: require('./assets/icons/users.png'),
  animals_nature: require('./assets/icons/trees.png'),
  food_drink: require('./assets/icons/pizza.png'),
  travel_places: require('./assets/icons/plane.png'),
  activities: require('./assets/icons/football.png'),
  objects: require('./assets/icons/lightbulb.png'),
  symbols: require('./assets/icons/ban.png'),
  flags: require('./assets/icons/flag.png'),
  unknown: require('./assets/icons/questionMark.png'),
};

export const CATEGORIES_KEYS: { [category: string]: string } = {
  'Recently used': 'recently_used',
  'Smileys & Emotion': 'smileys_emotion',
  'People & Body': 'people_body',
  'Animals & Nature': 'animals_nature',
  'Food & Drink': 'food_drink',
  'Travel & Places': 'travel_places',
  'Activities': 'activities',
  'Objects': 'objects',
  'Symbols': 'symbols',
  'Flags': 'flags',
};
