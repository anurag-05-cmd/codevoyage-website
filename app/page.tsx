'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characters } from './data/characters';
import CharacterCarousel from './components/CharacterCarousel';
import styles from './Home.module.css';

export default function Home() {
  const [hoveredCharacterId, setHoveredCharacterId] = useState<string | null>(null);

  const activeCharacter = characters.find(c => c.id === hoveredCharacterId) || characters[0];

  return (
    <main className={styles.container}>
      {/* Aggressive Background Shapes */}
      <div className={styles.accentYellow} />
      <div className={styles.diagonalBg} />
      <div className={styles.accentCyan} />
      <div className={styles.accentCyanSmall} />

      <header className={styles.header}>
        <div className={styles.logo}>CODEVOYAGE</div>
        
        <nav className={styles.navLinks}>
          <span className={styles.navLink}>HERO</span>
          <span className={styles.slash}>/</span>
          <span className={styles.navLink}>NEWS</span>
          <span className={styles.slash}>/</span>
          <span className={styles.navLink}>CONTACT</span>
          <span className={styles.slash}>/</span>
          <span className={styles.navLink}>ABOUT US</span>
          <span className={styles.slash}>/</span>
          <span className={styles.navLink}>EVENT</span>
          
          <button className={styles.navButton}>SIGN UP</button>
        </nav>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          <motion.h1 
            className={styles.title}
            key={activeCharacter.name}
            initial={{ opacity: 0, x: -50, skewX: 10 }}
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            transition={{ duration: 0.4, type: 'spring' }}
          >
            {activeCharacter.name}
          </motion.h1>
          
          <motion.p 
            className={styles.subtitle}
            key={`desc-${activeCharacter.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {activeCharacter.description} 
            CodeVoyage is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </motion.p>

          <button className={styles.ctaButton}>SIGN UP NOW</button>
        </div>

        <div className={styles.rightContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCharacter.id}
              className={styles.characterHero}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Massive Hero Silhouette */}
              <div style={{
                width: '400px',
                height: '700px',
                background: `linear-gradient(135deg, ${activeCharacter.themeColor} 0%, ${activeCharacter.secondaryColor} 100%)`,
                clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 30px 60px ${activeCharacter.themeColor}66`
              }}>
                <div style={{
                  fontSize: '7rem',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.9)',
                  textTransform: 'uppercase',
                  transform: 'rotate(-90deg)',
                  fontFamily: 'var(--font-heading)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '5px'
                }}>
                  {activeCharacter.name}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.carouselContainer}>
          <CharacterCarousel 
            characters={characters} 
            onHoverCharacter={setHoveredCharacterId}
          />
        </div>
      </div>
    </main>
  );
}
