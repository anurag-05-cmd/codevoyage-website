'use client';

import { use, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Trophy, UserPlus } from 'lucide-react';
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
      style={{
        '--theme-color': character.themeColor,
        '--secondary-color': character.secondaryColor,
        '--accent-color': character.accentColor,
        '--hero-gradient': character.gradient,
      } as React.CSSProperties}
    >
      <div className={styles.heroSection}>
        {/* Background Text changed from MARVEL to the Character Name for a personalized feel */}
        <div className={styles.backgroundText}>{character.name}</div>

        {/* Diagonal Colored Block with slight parallax */}
        <motion.div 
          className={styles.diagonalSection}
          style={{ background: character.gradient, y: diagonalY }}
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
          </div>

          <div className={styles.rightColumn}>
            <motion.div 
              className={styles.characterDisplay}
              initial={{ scale: 0.8, opacity: 0, x: 100 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            >
              {character.image ? (
                <div
                  style={{
                    width: '400px',
                    height: '580px',
                    borderRadius: '24px',
                    border: `2px solid ${character.themeColor}88`,
                    boxShadow: `0 30px 70px rgba(0,0,0,0.8), 0 0 45px ${character.themeColor}55`,
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#161926',
                  }}
                >
                  <img
                    src={character.image}
                    alt={character.imageAlt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />
                </div>
              ) : (
                <div 
                  style={{
                    width: '400px',
                    height: '580px',
                    borderRadius: '24px',
                    border: `2px solid ${character.themeColor}88`,
                    background: character.gradient,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: '900',
                    fontSize: '4.5rem',
                    letterSpacing: '5px',
                    transform: 'rotate(-90deg)',
                    boxShadow: `0 30px 70px rgba(0,0,0,0.8), 0 0 45px ${character.themeColor}55`,
                    transition: 'all 0.5s ease',
                    fontFamily: 'var(--font-heading)',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {character.name}
                </div>
              )}
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

      {/* SECTION 1: GENERAL TRIVIA ABOUT THE CHARACTER */}
      <section className={styles.section}>
        <motion.h2 
          className={styles.sectionTitle} 
          style={{ color: character.themeColor }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Operative Trivia // Technical Specs
        </motion.h2>
        <div className={styles.grid}>
          {character.trivia?.map((item, index) => (
            <div key={index} className={styles.card} style={{ borderLeftColor: character.themeColor }}>
              <div className={styles.cardContent}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: character.themeColor, boxShadow: `0 0 10px ${character.themeColor}` }} />
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    SPEC // 0{index + 1}
                  </span>
                </div>
                <h3 className={styles.cardTitle} style={{ color: character.themeColor }}>{item.title}</h3>
                <p className={styles.cardText}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: HACKATHON SYNERGY & DOMAIN CONNECTION */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Hackathon Synergy // Code Voyage
        </motion.h2>
        
        <motion.div 
          className={styles.synergyBox}
          style={{ borderColor: character.themeColor }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.synergyBadge} style={{ borderColor: character.themeColor, color: character.themeColor }}>
            <Trophy size={18} />
            DOMAIN SPECIALTY: {character.domainSpecialty}
          </div>
          <p className={styles.synergyText}>
            {character.hackathonConnection}
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: ACTUAL EVENT SNIPPETS // CODE VOYAGE INTEL */}
      <section className={styles.section}>
        <motion.h2 
          className={styles.sectionTitle} 
          style={{ color: character.themeColor }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Code Voyage // Event Intel
        </motion.h2>
        <div className={styles.grid}>
          <div className={styles.card} style={{ borderLeftColor: character.themeColor }}>
            <div className={styles.cardContent}>
              <Calendar size={36} style={{ color: character.themeColor, marginBottom: '1.25rem' }} />
              <h3 className={styles.cardTitle} style={{ color: character.themeColor }}>9-Hour Offline Sprint</h3>
              <p className={styles.cardText}>
                An intense, on-campus sprint where teams of 2 to 4 build real-world working prototypes from scratch. Open to all undergraduate colleges with expert on-site mentoring and networking.
              </p>
            </div>
          </div>
          <div className={styles.card} style={{ borderLeftColor: character.themeColor }}>
            <div className={styles.cardContent}>
              <Trophy size={36} style={{ color: character.themeColor, marginBottom: '1.25rem' }} />
              <h3 className={styles.cardTitle} style={{ color: character.themeColor }}>On-Spot Challenges</h3>
              <p className={styles.cardText}>
                Tackle live, secret problem statements revealed at countdown across cutting-edge tracks: AI & Machine Learning, Web & Mobile Apps, AR & VR, IoT, Cybersecurity, and Blockchain.
              </p>
            </div>
          </div>
          <div className={styles.card} style={{ borderLeftColor: character.themeColor }}>
            <div className={styles.cardContent}>
              <UserPlus size={36} style={{ color: character.themeColor, marginBottom: '1.25rem' }} />
              <h3 className={styles.cardTitle} style={{ color: character.themeColor }}>Bounties & Career Perks</h3>
              <p className={styles.cardText}>
                Compete for $5,000 & $2,500 prize pools, exclusive hardware bounties, official merit certificates, and guaranteed direct internship interviews with our headline tech sponsors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Portal */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Enlist For The Sprint
        </motion.h2>
        <div className={styles.formContainer}>
          <input type="text" placeholder="Operative Name (Full Name)" className={styles.input} />
          <input type="email" placeholder="Comms Link (Email Address)" className={styles.input} />
          <input type="text" placeholder="Domain Expertise (Primary Tech Stack / Track)" className={styles.input} />
          <button className={styles.submitButton} style={{ backgroundColor: character.themeColor }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <UserPlus size={22} />
              Register Team For Code Voyage
            </div>
          </button>
        </div>
      </section>

    </motion.main>
  );
}
