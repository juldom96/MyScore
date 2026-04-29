import { useEffect } from 'react';
import audioSource from '../assets/audio/success-trumpets.mp3';

const SoundComponent = () => {
  useEffect(() => {
    const playSound = async () => {
      try {
        const audio = new Audio(audioSource);
        audio.volume = 0.2;
        await audio.play();
      } catch (error) {
        console.error('Sound konnte nicht abgespielt werden:', error);
      }
    };

    playSound();
  }, []);

  return;
};

export default SoundComponent;
