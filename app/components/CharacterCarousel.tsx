'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { characters } from '../data/characters';
import styles from './CharacterCarousel.module.css';

interface Props {
  characters: any[];
  onHoverCharacter: (characterId: string | null) => void;
}

export default function CharacterCarousel({ characters, onHoverCharacter }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleCharacterClick = (id: string) => {
    // Navigate to the character specific page
    router.push(`/characters/${id}`);
  };

  return (
    <div className={styles.carouselContainer}>
      <div 
        className={styles.carouselTrack} 
        ref={scrollRef}
      >
        {characters.map((char, index) => (
          <motion.div
            key={char.id}
            className={styles.characterCard}
            onClick={() => handleCharacterClick(char.id)}
            onMouseEnter={() => onHoverCharacter(char.id)}
            onMouseLeave={() => onHoverCharacter(null)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={styles.characterImageContainer}>
              {/* Fallback silhouette if no image is available yet */}
              <div 
                className={styles.silhouette}
                style={{ backgroundColor: char.themeColor }}
              >
                {char.name}
              </div>
            </div>
            <div className={styles.characterName} style={{ color: char.themeColor }}>
              {char.name}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
