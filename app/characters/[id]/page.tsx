'use client';

import { use, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Link2, MessageCircle, Share2, Calendar, Trophy, UserPlus } from 'lucide-react';
import { characters } from '../../data/characters';
import styles from './CharacterPage.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export default function CharacterPage({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const character = characters.find(c => c.id === resolvedParams.id);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Optional smooth parallax scroll for the hero diagonal background
  const { scrollYProgress } = useScroll({ container: containerRef });
  const diagonalY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Fallback if character not found
  if (!character) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Character not found</h1>
        <button onClick={() => router.push('/')}>Go Back</button>
      </div>
    );
  }

  const currentIndex = characters.findIndex(c => c.id === resolvedParams.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % characters.length;
    router.push(`/characters/${characters[nextIndex].id}`);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <motion.main 
      className={styles.pageContainer}
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ '--theme-color': character.themeColor } as React.CSSProperties}
    >
      <div className={styles.heroSection}>
        {/* Background Text changed from MARVEL to the Character Name for a personalized feel */}
        <div className={styles.backgroundText}>{character.name}</div>

        {/* Diagonal Colored Block with slight parallax */}
        <motion.div 
          className={styles.diagonalSection}
          style={{ backgroundColor: character.themeColor, y: diagonalY }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className={styles.accentYellow} />

        <div className={styles.contentWrapper}>
          <div className={styles.leftColumn}>
            <div style={{ fontWeight: 900, letterSpacing: '2px', fontSize: '1.5rem', marginBottom: '2rem' }}>
              CODEVOYAGE
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className={styles.breadcrumb}>Home / CHARACTERS</div>
              <h1 className={styles.title} style={{ color: character.themeColor }}>
                {character.name}
              </h1>
              <p className={styles.description}>
                {character.description}
              </p>
            </motion.div>

            <motion.div 
              className={styles.socialIcons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Globe className={styles.icon} size={20} />
              <Link2 className={styles.icon} size={20} />
              <MessageCircle className={styles.icon} size={20} />
              <Share2 className={styles.icon} size={20} />
            </motion.div>
          </div>

          <div className={styles.rightColumn}>
            <motion.div 
              className={styles.characterDisplay}
              initial={{ scale: 0.8, opacity: 0, x: 100 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            >
              <div 
                style={{
                  width: '350px',
                  height: '650px',
                  background: `linear-gradient(135deg, ${character.themeColor}88 0%, ${character.secondaryColor}44 100%)`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontWeight: '900',
                  fontSize: '5rem',
                  letterSpacing: '5px',
                  transform: 'rotate(-90deg)',
                  boxShadow: `0 30px 60px ${character.themeColor}66`,
                  transition: 'all 0.5s ease',
                  fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}
              >
                {character.name}
              </div>
            </motion.div>
          </div>
        </div>

        <button className={styles.backButton} onClick={handleBack}>
          <div className={styles.backButtonIcon}><ArrowLeft size={20} /></div>
        </button>

        <button className={styles.nextButton} onClick={handleNext}>
          <div className={styles.nextButtonIcon}><ArrowRight size={20} /></div>
        </button>

        <div className={styles.paginationLines}>
          {characters.map((c, i) => (
            <div 
              key={c.id} 
              className={`${styles.line} ${i === currentIndex ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className={styles.section}>
        <motion.h2 
          className={styles.sectionTitle} 
          style={{ color: character.themeColor }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Mission Briefing
        </motion.h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle} style={{ color: character.themeColor }}>The Objective</h3>
              <p className={styles.cardText}>
                CodeVoyage is an elite hackathon bringing together the world's most brilliant minds to solve complex problems and build innovative solutions over an intense 48-hour period.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle} style={{ color: character.themeColor }}>The Arsenal</h3>
              <p className={styles.cardText}>
                You have access to state-of-the-art APIs, powerful computing resources, and mentorship from industry veterans. Use your skills to create something extraordinary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section (Dark) */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Operation Timeline
        </motion.h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <Calendar size={32} style={{ color: character.themeColor, marginBottom: '1rem' }} />
              <h3 className={styles.cardTitle}>Day 1: Assembly</h3>
              <p className={styles.cardText}>Opening ceremony, team formation, and the start of hacking. Briefings from our sponsors.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <Calendar size={32} style={{ color: character.themeColor, marginBottom: '1rem' }} />
              <h3 className={styles.cardTitle}>Day 2: The Grind</h3>
              <p className={styles.cardText}>Intense hacking, midnight snacks, mini-events, and mentor office hours.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <Calendar size={32} style={{ color: character.themeColor, marginBottom: '1rem' }} />
              <h3 className={styles.cardTitle}>Day 3: Victory</h3>
              <p className={styles.cardText}>Project submissions, presentations, judging, and the final awards ceremony.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className={styles.section}>
        <motion.h2 
          className={styles.sectionTitle} 
          style={{ color: character.themeColor }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Bounties
        </motion.h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <Trophy size={40} style={{ color: character.themeColor, marginBottom: '1rem' }} />
              <h3 className={styles.cardTitle}>First Place</h3>
              <p className={styles.cardText}>$5,000 cash prize, exclusive hardware, and guaranteed interviews with our top sponsors.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <Trophy size={32} style={{ color: character.themeColor, marginBottom: '1rem', opacity: 0.8 }} />
              <h3 className={styles.cardTitle}>Second Place</h3>
              <p className={styles.cardText}>$2,500 cash prize and premium software subscriptions for a year.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join The Initiative
        </motion.h2>
        <div className={styles.formContainer}>
          <input type="text" placeholder="Hero Name (Full Name)" className={styles.input} />
          <input type="email" placeholder="Comms Link (Email Address)" className={styles.input} />
          <input type="text" placeholder="Superpower (Primary Skill/Stack)" className={styles.input} />
          <button className={styles.submitButton}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <UserPlus size={20} />
              Enlist Now
            </div>
          </button>
        </div>
      </section>

    </motion.main>
  );
}
