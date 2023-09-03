import React from 'react';
import { Button } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';

export default function Reactions() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button onPress={() => setIsOpen(true)} title="Go" />
      <EmojiPicker
        onEmojiSelected={(emoji) => console.log(emoji)}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
