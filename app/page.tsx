'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { characters } from './data/characters';
import CharacterCarousel from './components/CharacterCarousel';
import styles from './Home.module.css';

export default function Home() {
  const router = useRouter();
  const [hoveredCharacterId, setHoveredCharacterId] = useState<string | null>(null);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState<number>(0);

  // Auto-scroll among characters if the user is not actively hovering
  useEffect(() => {
    if (hoveredCharacterId !== null) return;

    const interval = setInterval(() => {
      setActiveCharacterIndex((prevIndex) => (prevIndex + 1) % characters.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [hoveredCharacterId]);

  // Active character is the hovered one, or the auto-scrolling one
  const activeCharacter = hoveredCharacterId
    ? characters.find(c => c.id === hoveredCharacterId) || characters[activeCharacterIndex]
    : characters[activeCharacterIndex];

  const handleEnterInitiative = () => {
    router.push('/event');
  };

  return (
    <main className={styles.container}>
      {/* Aggressive Background Shapes */}
      <div 
        className={styles.accentYellow} 
        style={{ transition: 'background 0.5s ease' }} 
      />
      <div className={styles.diagonalBg} />
      <div 
        className={styles.accentCyan} 
        style={{ 
          background: activeCharacter.themeColor,
          boxShadow: `0 0 25px ${activeCharacter.themeColor}`,
          transition: 'all 0.5s ease' 
        }} 
      />
      <div 
        className={styles.accentCyanSmall} 
        style={{ 
          background: activeCharacter.themeColor,
          boxShadow: `0 0 20px ${activeCharacter.themeColor}`,
          transition: 'all 0.5s ease' 
        }} 
      />

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
          <motion.div 
            className={styles.heroBadge}
            key={`badge-${activeCharacter.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: activeCharacter.themeColor, borderColor: `${activeCharacter.themeColor}55`, background: `${activeCharacter.themeColor}15` }}
          >
            <Zap size={16} /> CODEVOYAGE 2026 // {activeCharacter.subtitle}
          </motion.div>

          <motion.h1 
            className={styles.title}
            key={activeCharacter.name}
            initial={{ opacity: 0, x: -50, skewX: 10 }}
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            transition={{ duration: 0.4, type: 'spring' }}
            style={{ color: activeCharacter.themeColor }}
          >
            {activeCharacter.name}
          </motion.h1>
          
          <div className={styles.subtitleBox} style={{ borderLeftColor: activeCharacter.themeColor }}>
            <motion.p 
              className={styles.subtitle}
              key={`desc-${activeCharacter.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {activeCharacter.description}
            </motion.p>
          </div>

          <button 
            className={styles.ctaButton}
            style={{ background: activeCharacter.themeColor, color: '#ffffff' }}
            onClick={handleEnterInitiative}
          >
            ENTER INITIATIVE <ArrowRight size={24} style={{ display: 'inline', marginLeft: '0.5rem', verticalAlign: 'middle' }} />
          </button>
        </div>

        <div className={styles.rightContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCharacter.id}
              className={styles.characterHero}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: [0, -12, 0] }}
              exit={{ opacity: 0, scale: 1.1, x: -50 }}
              transition={{ 
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                x: { duration: 0.4 },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
            >
              {/* Massive Hero Silhouette */}
              <div style={{
                width: '400px',
                height: '650px',
                background: activeCharacter.gradient,
                clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 30px 70px ${activeCharacter.themeColor}88, inset 0 0 30px rgba(255,255,255,0.3)`
              }}>
                <div style={{
                  fontSize: '7rem',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.95)',
                  textTransform: 'uppercase',
                  transform: 'rotate(-90deg)',
                  fontFamily: 'var(--font-heading)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '6px',
                  textShadow: '0 10px 20px rgba(0,0,0,0.5)'
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
