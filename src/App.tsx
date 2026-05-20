import React, { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  BookOpen, 
  ShieldAlert, 
  Activity, 
  HelpCircle,
  HelpCircle as QuestionIcon,
  CheckCircle2,
  XCircle,
  PenTool,
  RotateCcw,
  Menu,
  X,
  Play,
  Pause,
  Sparkles,
  Layers,
  Heart,
  MessageSquare,
  Bookmark,
  TrendingUp,
  Award
} from 'lucide-react';

// --- Constants ---

const THEME = {
  bg: 'bg-[#0f111a]', // Genuinely gothic dark ink
  text: 'text-slate-100',
  accent: 'text-[#ee4d6a]', // Crimson accent
  accentBg: 'bg-[#ee4d6a]',
  amber: 'text-[#f1a92a]', // Gold accent
  amberBg: 'bg-[#f1a92a]',
  skyBg: 'bg-[#3b82f6]',
  card: 'bg-[#16192b]',
  cardLight: 'bg-[#1b1e36]',
  cardBorder: 'border-white/10',
};

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// --- Components ---

interface SlideProps {
  children: ReactNode;
  index: number;
  key?: any;
}

const Slide = ({ children, index }: SlideProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.99 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.01 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="w-full h-full overflow-y-auto scroll-smooth p-6 md:p-14 lg:p-20 pb-36 relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
  >
    {/* Large Background Watermark */}
    <div className="absolute top-0 right-0 pointer-events-none select-none">
      <span className="text-[25vw] font-serif font-black text-white/[0.02] leading-none -mr-[3vw] -mt-[3vw]">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
    <div className="relative z-10 w-full min-h-0 flex flex-col">
      {children}
    </div>
  </motion.div>
);

const SectionLabel = ({ subtitle, text }: { subtitle?: string; text: string }) => (
  <div className="flex flex-col gap-2 mb-8">
    <div className="flex items-center gap-3">
      <div className="w-8 h-[2px] bg-[#ee4d6a]" />
      <span className="text-[#ee4d6a] font-sans font-bold tracking-[0.4em] text-[10px] uppercase leading-none">{text}</span>
    </div>
    {subtitle && (
      <span className="font-serif italic text-sm text-[#f1a92a] opacity-80 pl-11">{subtitle}</span>
    )}
  </div>
);

const SmartTimer = ({ minutes }: { minutes: number }) => {
  const [seconds, setSeconds] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-sm flex items-center gap-8 backdrop-blur-md">
      <div className="relative w-24 h-24 shrink-0">
        <svg className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r="42" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
          <motion.circle 
            cx="48" cy="48" r="42" fill="none" stroke="#ee4d6a" strokeWidth="4"
            strokeDasharray={263}
            animate={{ strokeDashoffset: 263 * (1 - seconds / (minutes * 60)) }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold tracking-tighter">
          {formatTime(seconds)}
        </div>
      </div>
      <div className="flex-grow">
        <div className="text-[10px] font-bold tracking-[0.3em] text-[#ee4d6a] mb-2 uppercase">TIME REMAINING</div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setIsActive(!isActive)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ee4d6a] text-[#0f111a] hover:scale-110 transition-transform cursor-pointer"
          >
            {isActive ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            type="button"
            onClick={() => { setIsActive(false); setSeconds(minutes * 60); }}
            className="text-white/30 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Individual Slides ---

const HeroSlide = () => {
  const [activeFact, setActiveFact] = useState<'text' | 'author' | 'date' | null>(null);

  const facts = {
    text: {
      title: "The Tell-Tale Heart",
      subtitle: "Gothic Psychological Narrative Focus",
      desc: "First published in 1843. It stands as Poe's ultimate showcase of psychological terror, utilizing a highly erratic first-person narrator whose furious denials of madness slowly expose a deep, calculating sociopathy."
    },
    author: {
      title: "Edgar Allan Poe (1809–1849)",
      subtitle: "Pioneer of Macabre & Forensic Tension",
      desc: "The father of American Gothic horror and the detective story. Poe crafted narratives that bypassed external ghouls to explore the dark, biological reality of human terror, guilt, and nervous exhaustion."
    },
    date: {
      title: "1843 Publication Context",
      subtitle: "The Rise of Scientific Psychiatry",
      desc: "Published during the birth of modern psychiatry. This text is incredibly critical because it documents the transition from supernatural horror to the psychological thriller, centering 'madness' as a medical and forensic subject."
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-0 flex-grow max-w-6xl relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="text-white/50 text-7xl font-light font-serif leading-none italic mb-4">“</div>
        
        <SectionLabel text="Cambridge AS Level English Language 9093 — Paper 1" subtitle="Interactive Masterclass Series" />
        
        <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-serif font-black leading-[0.85] tracking-tight mb-8">
          Narrative Writing <br />
          <span className="text-[#ee4d6a]">& Text Analysis</span>
        </h1>
        
        <div className="h-[2px] w-full max-w-2xl bg-gradient-to-r from-[#ee4d6a] via-[#f1a92a] to-transparent mb-10" />

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-serif italic mb-10 bg-white/5 py-3 px-6 rounded-sm border border-white/5 max-w-fit select-none">
          <span className="text-[#f1a92a] font-mono not-italic uppercase tracking-widest text-xs">TEXT FOCUS:</span>
          
          <button
            type="button"
            onClick={() => setActiveFact(activeFact === 'text' ? null : 'text')}
            className={cn(
              "px-2 py-1 rounded-sm border transition-all cursor-pointer",
              activeFact === 'text' 
                ? "bg-[#ee4d6a]/20 border-[#ee4d6a] text-white font-bold"
                : "border-transparent hover:text-white hover:border-white/10"
            )}
          >
            The Tell-Tale Heart
          </button>
          
          <span className="text-slate-600">|</span>
          
          <button
            type="button"
            onClick={() => setActiveFact(activeFact === 'author' ? null : 'author')}
            className={cn(
              "px-2 py-1 rounded-sm border transition-all cursor-pointer",
              activeFact === 'author'
                ? "bg-[#ee4d6a]/20 border-[#ee4d6a] text-white font-bold"
                : "border-transparent hover:text-white hover:border-white/10"
            )}
          >
            Edgar Allan Poe
          </button>
          
          <span className="text-slate-600">|</span>
          
          <button
            type="button"
            onClick={() => setActiveFact(activeFact === 'date' ? null : 'date')}
            className={cn(
              "px-2 py-1 rounded-sm border transition-all cursor-pointer font-mono not-italic",
              activeFact === 'date'
                ? "bg-[#ee4d6a]/20 border-[#ee4d6a] text-white font-bold"
                : "border-transparent hover:text-white hover:border-white/10"
            )}
          >
            1843
          </button>
        </div>

        {/* Dynamic Context Card */}
        <AnimatePresence mode="wait">
          {activeFact && (
            <motion.div
              key={activeFact}
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-[#131525] border border-[#ee4d6a]/30 p-6 rounded-sm max-w-2xl relative overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <button 
                  type="button"
                  onClick={() => setActiveFact(null)}
                  className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#f1a92a] block font-bold mb-1 uppercase">
                {facts[activeFact].subtitle}
              </span>
              <h4 className="text-lg font-serif font-black text-slate-100 mb-2">
                {facts[activeFact].title}
              </h4>
              <p className="text-sm font-sans text-slate-300 leading-relaxed">
                {facts[activeFact].desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 pt-8 border-t border-white/5">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-slate-500">TEACHER & PRESENTER</span>
            <span className="text-base font-serif text-slate-200">Intan Fazillah</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-slate-500">FORUM</span>
            <span className="text-base font-serif text-slate-200">ICM School Micro Teaching</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-slate-500">SYLLABUS FOCUS</span>
            <span className="text-base font-serif text-[#f1a92a]">Directed Writing & Composition</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ReadingSlide = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [heartRate, setHeartRate] = useState(65);
  const [audioOn, setAudioOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [partnerTimer, setPartnerTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && partnerTimer !== null && partnerTimer > 0) {
      interval = setInterval(() => {
        setPartnerTimer(p => (p !== null && p > 0 ? p - 1 : 0));
      }, 1000);
    } else if (partnerTimer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, partnerTimer]);

  const startPartnerTimer = () => {
    setPartnerTimer(30);
    setTimerActive(true);
  };

  const moods = [
    { name: "Dread", color: "bg-red-500/20 text-red-400 border-red-500/30", rate: 115, analysis: "The relentless rhythm of nervous confessions coupled with auditory hallucinations makes the reader expect an impending disaster." },
    { name: "Madness", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", rate: 135, analysis: "The narrator's desperate, repetitive attempts to prove sanity serve as absolute indicators of an unravelling state of mind." },
    { name: "Calculated Calm", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", rate: 50, analysis: "The chilling precision with which the obsession is planned ('how calmly I can tell you...') heightens the dark horror through cold, clinical detachment." },
    { name: "Unease", color: "bg-amber-500/20 text-[#f1a92a] border-amber-500/30", rate: 88, analysis: "The jarring repetition of 'very, very' and short, breathless declarations breaks standard narrative flow, evoking a deep biological discomfort." }
  ];

  const handleMoodSelect = (mood: any) => {
    setSelectedMood(mood.name);
    setHeartRate(mood.rate);
  };

  const playHeartbeatSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const playThump = (time: number, isHigh: boolean) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(isHigh ? 65 : 45, time); // Low Gothic thuds
        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.14);
        
        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.14);
        
        osc.start(time);
        osc.stop(time + 0.15);
      };

      const now = ctx.currentTime;
      // Realistic dual heartbeat cadence: Lub-dub
      playThump(now, true);
      playThump(now + 0.16, false);
    } catch (e) {
      console.warn("AudioContext blocked or not supported", e);
    }
  };

  useEffect(() => {
    let playInterval: any = null;
    if (audioOn) {
      playHeartbeatSound(); // immediate sound trigger
      playInterval = setInterval(() => {
        playHeartbeatSound();
      }, (60 / heartRate) * 1000);
    }
    return () => {
      if (playInterval) clearInterval(playInterval);
    };
  }, [heartRate, audioOn]);

  return (
    <div className="min-h-0 flex-grow flex flex-col justify-between max-w-7xl mx-auto">
      <div>
        <SectionLabel text="THE EXTRACT" subtitle="Immersion into Gothic Masterclass" />
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Read this. How does it make you feel?</h2>
      </div>

      <div className="grid lg:grid-cols-[1.8fr,1fr] gap-8 items-stretch flex-grow my-4">
        {/* Poe Extract Card */}
        <div className="bg-[#131525] border border-white/10 p-6 md:p-8 flex flex-col justify-between relative rounded-sm group overflow-hidden shadow-2xl h-auto">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <BookOpen size={160} />
          </div>

          <div className="space-y-6 text-slate-200 py-2">
            <p className="text-base md:text-lg lg:text-xl font-serif italic leading-relaxed text-slate-100 transition-all duration-300">
              “True! — nervous —{' '}
              <span className={cn(
                "transition-all duration-500 rounded-sm px-1 py-0.5",
                selectedMood === "Unease" ? "bg-amber-500/25 text-amber-200 shadow-[0_0_12px_rgba(241,169,42,0.2)] ring-1 ring-amber-500/40" : ""
              )}>
                very, very dreadfully nervous
              </span>{' '}
              I had been and am; but why will you say that{' '}
              <span className={cn(
                "transition-all duration-500 rounded-sm px-1 py-0.5",
                selectedMood === "Madness" ? "bg-purple-500/25 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/40" : ""
              )}>
                I am mad?
              </span>{' '}
              The{' '}
              <span className={cn(
                "transition-all duration-500 rounded-sm px-1 py-0.5",
                selectedMood === "Madness" ? "bg-purple-500/25 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/40" : ""
              )}>
                disease had sharpened my senses
              </span>{' '}
              — not destroyed — not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe how healthily —{' '}
              <span className={cn(
                "transition-all duration-500 rounded-sm px-1 py-0.5",
                selectedMood === "Calculated Calm" ? "bg-cyan-500/25 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/40" : ""
              )}>
                how calmly I can tell you the whole story."
              </span>
            </p>
            <p className="text-base md:text-lg lg:text-xl font-serif italic leading-relaxed text-slate-300 transition-all duration-300">
              "It is impossible to say how first the idea entered my brain; but once conceived, it haunted me day and night. Object there was none. Passion there was none. I loved the old man. He had never wronged me. He had never given me insult. For his gold I had no desire. I think it was{' '}
              <span className={cn(
                "transition-all duration-500 rounded-sm px-1 py-0.5",
                selectedMood === "Dread" ? "bg-red-500/25 text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.2)] ring-1 ring-red-500/40" : ""
              )}>
                his eye! yes, it was this!
              </span>{' '}
              One of his eyes resembled that of a{' '}
              <span className={cn(
                "transition-all duration-500 rounded-sm px-1 py-0.5",
                selectedMood === "Dread" ? "bg-red-500/25 text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.2)] ring-1 ring-red-500/40" : ""
              )}>
                vulture — a pale blue eye, with a film over it.
              </span>{' '}
              Whenever it fell upon me,{' '}
              <span className={cn(
                "transition-all duration-500 rounded-sm px-1 py-0.5",
                selectedMood === "Dread" ? "bg-red-500/25 text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.2)] ring-1 ring-red-500/40" : ""
              )}>
                my blood ran cold…”
              </span>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-xs">
            <span className="font-mono text-[#f1a92a]">— Edgar Allan Poe, The Tell-Tale Heart (1843)</span>
            <div className="bg-rose-500/10 text-[#ee4d6a] px-4 py-1.5 rounded-full font-sans font-bold tracking-widest uppercase text-[10px] animate-pulse">
              Active Focus Piece
            </div>
          </div>
        </div>

        {/* Dynamic / Interactive Sensory Pad */}
        <div className="flex flex-col justify-between bg-[#16192a] border border-white/10 p-6 md:p-8 rounded-sm shadow-xl h-auto gap-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs tracking-[0.2em] font-bold text-slate-400 uppercase">
                <Activity className="text-[#ee4d6a] animate-pulse" />
                <span>Sensory & Pulse Tracker</span>
              </div>
              <button
                type="button"
                onClick={() => setAudioOn(!audioOn)}
                className={cn(
                  "px-3 py-1 text-[10px] uppercase font-mono tracking-wider font-bold border transition-colors cursor-pointer rounded-full",
                  audioOn 
                    ? "bg-[#ee4d6a] border-[#ee4d6a] text-[#0f111a]" 
                    : "border-white/15 text-slate-400 hover:text-white hover:border-white/30"
                )}
              >
                {audioOn ? "🔊 Hear Pulse: On" : "🔇 Hear Pulse: Off"}
              </button>
            </div>

            {/* Pulsing Visual Heartbeat motif */}
            <div className="bg-[#0f111a] p-6 rounded-md flex items-center justify-between border border-white/5 relative overflow-hidden">
              <div>
                <span className="text-[10px] block text-slate-500 tracking-wider font-bold mb-1">SIMULATED HEARTBEAT</span>
                <span className="text-4xl font-mono font-bold text-slate-100 tabular-nums">{heartRate} <span className="text-xs text-[#ee4d6a]">BPM</span></span>
              </div>
              
              <motion.div 
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 60 / heartRate, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "shrink-0 mr-4 transition-colors duration-500",
                  selectedMood === "Madness" ? "text-purple-500" :
                  selectedMood === "Dread" ? "text-red-500" :
                  selectedMood === "Unease" ? "text-amber-500" :
                  "text-cyan-500"
                )}
              >
                <Heart size={44} fill="currentColor" stroke="none" />
              </motion.div>
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest text-[#f1a92a] block mb-4 uppercase">SELECT YOUR RESPONSE STATE:</span>
              <div className="grid grid-cols-2 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.name}
                    type="button"
                    onClick={() => handleMoodSelect(mood)}
                    className={cn(
                      "p-4 border text-left rounded-sm font-serif italic text-base transition-all duration-300 cursor-pointer",
                      selectedMood === mood.name 
                        ? "bg-[#ee4d6a] text-white border-[#ee4d6a] shadow-[0_0_15px_rgba(238,77,106,0.3)] scale-[1.03]" 
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    {mood.name}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {selectedMood ? (
                <motion.div
                  key={selectedMood}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#0f111a] p-5 border-l-4 border-[#ee4d6a] space-y-2"
                >
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#f1a92a] uppercase">POETIC ANALYSIS:</span>
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    {moods.find(m => m.name === selectedMood)?.analysis}
                  </p>
                </motion.div>
              ) : (
                <div className="h-28 bg-[#0f111a]/50 text-slate-500 rounded-sm border border-dashed border-white/5 flex items-center justify-center text-center p-6 text-xs italic">
                  Choose a response state above to map the narrative impact of Poe's layout.
                </div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={timerActive ? () => setTimerActive(false) : startPartnerTimer}
            className="mt-2 w-full bg-[#ee4d6a] hover:bg-rose-600 text-[#0f111a] p-4 md:p-5 font-bold rounded-sm flex items-center justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(238,77,106,0.25)] select-none text-left cursor-pointer active:scale-[0.98] border border-transparent"
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#0f111a]/70 font-mono font-bold leading-tight">STAGE 1 INTERACTIVE TASK</p>
                <p className="text-xs md:text-sm font-black tracking-wide uppercase text-[#0f111a]">
                  Turn to a partner: Share ONE word that describes how this feels. (30s Task)
                </p>
              </div>
            </div>
            <div className="bg-[#0f111a] text-white px-3 py-1 font-mono text-xs font-bold rounded min-w-[80px] text-center border border-white/10 shrink-0">
              {partnerTimer !== null && partnerTimer >= 0 ? `${partnerTimer}s` : "START"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const BigQuestionSlide = () => {
  const [hoveredCard, setHoveredCard] = useState<'WHAT' | 'HOW' | null>(null);

  return (
    <div className="min-h-0 flex-grow flex flex-col justify-center max-w-6xl mx-auto relative">
      <SectionLabel text="THE BROAD PERSPECTIVE" subtitle="Shifting from Subject to Craft" />
      
      <h2 className="text-6xl md:text-7xl font-serif font-black mb-12 italic text-center tracking-tight">
        The Big <span className="text-[#ee4d6a]">Question</span>
      </h2>

      <div className="grid md:grid-cols-[1fr,100px,1fr] items-stretch gap-8 mb-16">
        {/* WHAT block */}
        <motion.div
          onMouseEnter={() => setHoveredCard('WHAT')}
          onMouseLeave={() => setHoveredCard(null)}
          className={cn(
            "p-12 border transition-all duration-500 flex flex-col justify-between relative rounded-sm shadow-xl",
            hoveredCard === 'WHAT' 
              ? "bg-[#16192a]/80 border-[#f1a92a]/50" 
              : "bg-[#131525]/50 border-white/5"
          )}
        >
          <div>
            <span className="font-mono text-xs font-bold text-[#f1a92a] tracking-widest uppercase block mb-6">THE SURFACE LEVEL</span>
            <h3 className="text-6xl md:text-7xl font-sans font-black tracking-tight mb-4 text-slate-300">WHAT</h3>
            <p className="text-lg font-serif italic text-slate-400 mb-8">does the writer say?</p>
          </div>
          
          <div className="space-y-3 pt-6 border-t border-white/5 text-slate-400 font-sans text-sm">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
              <span><strong>The Story & Events:</strong> What literally happens in the plot.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
              <span><strong>In this text:</strong> A narrator claims he is not mad, but tells us how he murdered an old man because of his pale blue eye.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
              <span><strong>The Surface Narrative:</strong> The simple, sequential layer of character and plot.</span>
            </div>
          </div>
        </motion.div>

        {/* VS Divider */}
        <div className="flex flex-col justify-center items-center font-bold font-mono tracking-widest text-slate-500 uppercase">
          <div className="w-[1px] h-12 bg-white/10 mb-4" />
          <span className="text-lg text-[#f1a92a]">VS</span>
          <div className="w-[1px] h-12 bg-white/10 mt-4" />
        </div>

        {/* HOW block */}
        <motion.div
          onMouseEnter={() => setHoveredCard('HOW')}
          onMouseLeave={() => setHoveredCard(null)}
          className={cn(
            "p-12 border transition-all duration-500 flex flex-col justify-between relative rounded-sm shadow-xl",
            hoveredCard === 'HOW' || !hoveredCard
              ? "bg-[#1b1c35] border-[#ee4d6a]/50 scale-[1.02] shadow-[0_0_30px_rgba(238,77,106,0.15)]" 
              : "bg-[#131525]/50 border-white/5"
          )}
        >
          <div className="absolute top-4 right-4 bg-[#ee4d6a] text-[#0f111a] font-sans font-bold tracking-widest text-[9px] px-3 py-1 rounded-full uppercase">
            Cambridge Focus
          </div>

          <div>
            <span className="font-mono text-xs font-bold text-[#ee4d6a] tracking-widest uppercase block mb-6">THE ANALYTICAL LEVEL</span>
            <h3 className="text-6xl md:text-7xl font-sans font-black tracking-tight mb-4 text-white">HOW</h3>
            <p className="text-lg font-serif italic text-[#ee4d6a] mb-8">does the writer say it?</p>
          </div>
          
          <div className="space-y-3 pt-6 border-t border-[#ee4d6a]/20 text-slate-200 font-sans text-sm">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ee4d6a] mt-1.5 shrink-0" />
              <span><strong>The Craft:</strong> HOW does Poe make us feel the narrator's unravelling panic?</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ee4d6a] mt-1.5 shrink-0" />
              <span><strong>The Emotion:</strong> HOW does space and structure construct a creeping, biological sense of dread?</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ee4d6a] mt-1.5 shrink-0" />
              <span><strong>Syllabus Critical:</strong> Explaining HOW the writer chose and built the text block (Repetition & Sentence Structure).</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-[#1c1221] p-8 border border-[#ee4d6a]/20 rounded-sm">
        <p className="text-lg text-slate-300 italic font-serif leading-relaxed text-center">
          <span className="text-[#ee4d6a] font-bold uppercase not-italic tracking-wider font-sans text-sm block mb-2">CRITICAL HIGH-LEVEL TRUTH</span>
          AS Level Paper 1 is almost exclusively interested in the <span className="text-white underline decoration-[#ee4d6a] font-bold font-sans">HOW</span>. We analyze the mechanisms beneath the narrative skin to understand how psychological gravity is constructed.
        </p>
      </div>
    </div>
  );
};

const TechniqueRepetition = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [revealMindset, setRevealMindset] = useState(false);

  const steps = [
    {
      title: 'Step 1: "very"',
      highlight: '"very"',
      stat: "The Unusual Intensifier",
      analysis: "Poe writes 'very.' This is already an unusual choice to qualify a basic nervous state, showing a heightened level of emotional focus."
    },
    {
      title: 'Step 2: "very, very"',
      highlight: '"very, very"',
      stat: "The Uncontrolled Doubling",
      analysis: "He doubles it: 'very, very.' The narrator cannot stop themselves. This repetition creates an immediate stammering, erratic rhythm of speech."
    },
    {
      title: 'Step 3: "dreadfully"',
      highlight: '"dreadfully nervous"',
      stat: "The Physical Abyss",
      analysis: "He adds 'dreadfully' to 'nervous'. By the end of this phrase, we feel the narrator physically losing control even as they desperately try to appear calm."
    }
  ];

  return (
    <div className="min-h-0 flex-grow flex flex-col justify-between max-w-7xl mx-auto">
      <div>
        <SectionLabel text="LITERARY WEAPON 1" subtitle="Micro-Analysis: Syntax & Intensity" />
        <div className="bg-[#ee4d6a] text-white self-start px-3 py-1 font-sans font-bold text-[10px] tracking-widest uppercase mb-4">
          TECHNIQUE 1
        </div>
        <h2 className="text-5xl font-serif font-bold mb-4">Repetition</h2>
        <p className="text-slate-400 text-lg max-w-3xl font-serif italic mb-8">
          Deliberately repeating a word, phrase, or sentence structure to forge intensity, pace, and profound psychological rhythm.
        </p>
      </div>

      {/* Main Focus Banner */}
      <div className="bg-white/[0.02] border border-white/5 p-10 md:p-14 text-center rounded-sm relative overflow-hidden backdrop-blur-md">
        <span className="absolute top-4 left-4 text-[10px] font-mono font-bold text-slate-500 tracking-widest">PROSE TARGET</span>
        
        <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic leading-relaxed text-slate-100">
          “<span className={cn("transition-all duration-300", activeStep === 0 ? "text-[#f1a92a]" : "text-white/40")}>nervous</span> —{' '}
          <span className={cn("transition-all duration-300 font-bold", activeStep === 1 || activeStep === 0 ? "text-[#ee4d6a] underline" : "text-white/40")}>very, very</span>{' '}
          <span className={cn("transition-all duration-300 italic underline decoration-[#ee4d6a]", activeStep === 2 ? "text-amber-400" : "text-white/40")}>dreadfully nervous</span>”
        </p>
      </div>

      {/* Interactive Interactive Controls */}
      <div className="grid md:grid-cols-3 gap-6 my-8">
        {steps.map((s, idx) => (
          <div
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={cn(
              "p-6 md:p-8 border cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[160px] h-auto md:h-64",
              activeStep === idx 
                ? "bg-[#1b1d35] border-[#ee4d6a] shadow-[0_0_15px_rgba(238,77,106,0.15)] scale-[1.01]" 
                : "bg-[#131525]/80 border-white/5 hover:bg-[#131525]"
            )}
          >
            <div>
              <span className="font-mono text-[#f1a92a] text-xs font-bold block mb-4 tracking-widest uppercase">{s.stat}</span>
              <h3 className="text-lg md:text-xl font-serif font-black text-slate-100 mb-3">{s.title}</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">{s.analysis}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#131525]/50 border border-white/5 p-6 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Bookmark className="text-[#ee4d6a] shrink-0" />
          <p className="text-sm font-serif italic text-slate-300">
            "What does all this repetition tell us about the narrator’s state of mind?"
          </p>
        </div>
        <div className="flex items-center gap-3">
          {revealMindset && (
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-rose-300 italic font-serif"
            >
              "They're not calm at all. The repetition reveals the panic underneath the performance."
            </motion.p>
          )}
          <button
            type="button"
            onClick={() => setRevealMindset(!revealMindset)}
            className="px-5 py-2.5 bg-[#ee4d6a] text-[#0f111a] hover:bg-rose-600 transition-all text-[10px] font-mono tracking-widest uppercase font-bold cursor-pointer rounded-sm"
          >
            {revealMindset ? "HIDE ANSWER" : "REVEAL ANSWER"}
          </button>
        </div>
      </div>
    </div>
  );
};

const TechniqueSentenceStructure = () => {
  const [activeCard, setActiveCard] = useState<'short' | 'long' | 'fragment' | null>(null);

  const structures = [
    {
      id: "short",
      label: "Short Sentence",
      example: "“Object there was none. Passion there was none.”",
      effect: "Each one lands like a full stop on a thought. Short. Blunt. Shocking. It creates dread because there's no escape from each statement.",
      tempo: "Slow, heavy, and mechanical thuds.",
      color: "border-[#ee4d6a] hover:bg-rose-950/25 text-[#ee4d6a]",
      glowColor: "rgba(238, 77, 106, 0.2)"
    },
    {
      id: "long",
      label: "Long Sentence",
      example: "“I think it was his eye! yes, it was this! One of his eyes resembled that of a vulture...”",
      effect: "It goes on and on. That's not an accident. That rambling mirrors a mind that's spiralling. The sentence can't stop itself, just like the narrator can't.",
      tempo: "Erratic, overlapping waves.",
      color: "border-[#f1a92a] hover:bg-amber-950/25 text-[#f1a92a]",
      glowColor: "rgba(241, 169, 42, 0.2)"
    },
    {
      id: "fragment",
      label: "Fragment",
      example: "“Hearken!”",
      effect: "That's one word. A command. It grabs you by the collar. It demands your attention.",
      tempo: "Sudden absolute pause.",
      color: "border-green-400 hover:bg-green-950/25 text-green-300",
      glowColor: "rgba(74, 222, 128, 0.2)"
    }
  ];

  return (
    <div className="min-h-0 flex-grow flex flex-col justify-between max-w-7xl mx-auto">
      <div>
        <SectionLabel text="LITERARY WEAPON 2" subtitle="Controlling Pace, Urgency & Attention" />
        <div className="bg-[#f1a92a] text-[#0f111a] self-start px-3 py-1 font-sans font-bold text-[10px] tracking-widest uppercase mb-4">
          TECHNIQUE 2
        </div>
        <h2 className="text-5xl font-serif font-bold mb-4">Sentence Structure</h2>
        <p className="text-slate-400 text-lg max-w-3xl font-serif italic mb-8">
          How a writer configures syntax, punctuation, and clause density to control the physical pace of the reading experience.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 flex-grow content-start my-6">
        {structures.map((s) => (
          <motion.div
            key={s.id}
            onMouseEnter={() => setActiveCard(s.id as any)}
            onMouseLeave={() => setActiveCard(null)}
            onClick={() => setActiveCard(activeCard === s.id ? null : (s.id as any))}
            className={cn(
              "p-6 md:p-8 border rounded-sm flex flex-col justify-between transition-all duration-300 min-h-[300px] h-auto cursor-pointer",
              activeCard === s.id 
                ? `bg-white/[0.03] ${s.color} shadow-[0_0_20px_${s.glowColor}] scale-[1.01]` 
                : "bg-[#131525] border-white/5"
            )}
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 mb-6 block">CADENCE FAMILY</span>
              <h3 className="text-2xl font-serif italic font-bold mb-6 text-slate-100">{s.label}</h3>
              <p className="text-xl font-serif text-[#f1a92a] leading-relaxed mb-6 italic">{s.example}</p>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-white/5">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-white">Effect:</strong> {s.effect}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500">
                <Activity size={12} className={cn("animate-pulse", activeCard === s.id ? s.color : "text-slate-500")} />
                <span>PULSE PATTERN: {s.tempo}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#1c1221] p-6 border-l-4 border-[#ee4d6a] flex gap-4">
        <p className="text-sm italic font-serif text-slate-300">
          <strong>Syntactic Alignment Tip:</strong> In Cambridge Paper 1, never simply state that a sentence is "short" or "long". Identify the exact kinetic effect of that structure on the reader's heartbeat. Does it build panic, mimic gasping, or mimic cold calculation?
        </p>
      </div>
    </div>
  );
};

const DetectiveChallenge = () => {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [showPrompts, setShowPrompts] = useState(false);

  const highlights = [
    {
      text: "Object there was none. Passion there was none.",
      type: "Sentence Structure",
      category: "Short Sentences & Parallelism",
      comment: "These two perfectly brief, identical syntax blocks mimic clinical logic. Instead of expressing panic, the bluntness feels almost list-like, conveying deep sociopathy and cold detachment."
    },
    {
      text: "He had never wronged me. He had never given me insult.",
      type: "Repetition",
      category: "Parallel Anaphora",
      comment: "By starting sequential clauses with 'He had never...', the narrator demonstrates an obsessive looping of thought, seeking to rationalize and justify murder, which heightens the dread."
    },
    {
      text: "I think it was his eye! yes, it was this!",
      type: "Sentence Structure",
      category: "Exclamatory & Fragmented Agitation",
      comment: "The abrupt injection of exclamation marks and conversational pauses ('yes, it was this!') shatters the previous calm, exposing the severe mental agitation boiling underneath."
    },
    {
      text: "vulture — a pale blue eye, with a film over it",
      type: "Imagery",
      category: "Macabre Visual Simile",
      comment: "Poe grafts visceral, dead imagery ('vulture', 'film') onto a living human body, creating instant repulsion and aligning the target of horror directly with death."
    }
  ];

  return (
    <div className="min-h-0 flex-grow flex flex-col justify-between max-w-7xl mx-auto">
      <div>
        <SectionLabel text="MEDIAS RES CHALLENGE" subtitle="Class Investigation Mode" />
        <h2 className="text-5xl font-serif font-bold mb-6">Detective Challenge</h2>
        <p className="text-slate-300 text-lg font-serif italic mb-8 max-w-3xl">
          We have targeted Edgar Allan Poe's second paragraph. Find ONE example of <span className="text-[#ee4d6a] font-bold">Repetition</span> AND one of <span className="text-[#f1a92a] font-bold">Sentence Structure</span>. Click below to analyze:
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.5fr,1fr] gap-10 items-stretch flex-grow my-4">
        {/* Paragraph interactive highlight pad */}
        <div className="bg-[#131525] border border-white/10 p-8 flex flex-col justify-between relative rounded-sm shadow-xl h-auto">
          <div className="absolute top-2 left-6 text-[10px] font-mono text-slate-500 font-bold tracking-widest uppercase">
            TARGET EXCERPT: PARAGRAPH 2 (WORKSHEET)
          </div>

          <div className="text-xl md:text-2xl font-serif leading-relaxed text-slate-300 space-y-4 pt-4">
            <p>
              "It is impossible to say how first the idea entered my brain; but once conceived, it haunted me day and night.{' '}
              
              <motion.span
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedQuote("Object there was none. Passion there was none.")}
                className={cn(
                  "cursor-pointer transition-colors border-b-2 inline-block my-0.5 px-1 py-0.5 rounded-sm",
                  selectedQuote === "Object there was none. Passion there was none."
                    ? "bg-[#ee4d6a]/20 border-[#ee4d6a] text-white font-bold"
                    : "border-dotted border-white/30 text-slate-300 hover:text-white hover:border-white/50"
                )}
              >
                Object there was none. Passion there was none.
              </motion.span>{' '}
              
              <motion.span
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedQuote("He had never wronged me. He had never given me insult.")}
                className={cn(
                  "cursor-pointer transition-colors border-b-2 inline-block my-0.5 px-1 py-0.5 rounded-sm",
                  selectedQuote === "He had never wronged me. He had never given me insult."
                    ? "bg-[#f1a92a]/20 border-[#f1a92a] text-white font-bold"
                    : "border-dotted border-white/30 text-slate-300 hover:text-white hover:border-white/50"
                )}
              >
                He had never wronged me. He had never given me insult.
              </motion.span>{' '}
              For his gold I had no desire.{' '}
              
              <motion.span
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedQuote("I think it was his eye! yes, it was this!")}
                className={cn(
                  "cursor-pointer transition-colors border-b-2 inline-block my-0.5 px-1 py-0.5 rounded-sm",
                  selectedQuote === "I think it was his eye! yes, it was this!"
                    ? "bg-purple-500/20 border-purple-400 text-white font-bold"
                    : "border-dotted border-white/30 text-slate-300 hover:text-white hover:border-white/50"
                )}
              >
                I think it was his eye! yes, it was this!
              </motion.span>{' '}
              One of his eyes resembled that of a{' '}
              
              <motion.span
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedQuote("vulture — a pale blue eye, with a film over it")}
                className={cn(
                  "cursor-pointer transition-colors border-b-2 inline-block my-0.5 px-1 py-0.5 rounded-sm",
                  selectedQuote === "vulture — a pale blue eye, with a film over it"
                    ? "bg-cyan-500/20 border-cyan-400 text-white font-bold"
                    : "border-dotted border-white/30 text-slate-300 hover:text-white hover:border-white/50"
                )}
              >
                vulture — a pale blue eye, with a film over it
              </motion.span>
              . Whenever it fell upon me, my blood ran cold…”
            </p>
          </div>

          <p className="text-xs text-slate-500 italic mt-8">
            💡 Click on the dotted underlined prose fragments above to launch targeted micro-analyses.
          </p>
        </div>

        {/* Dynamic Analysis Card */}
        <div className="bg-[#16192a] border border-[#ee4d6a]/20 p-8 rounded-sm shadow-xl flex flex-col justify-between h-auto gap-8">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-[#ee4d6a] uppercase block font-bold">CHALLENGE CRITIQUE</span>
            
            <AnimatePresence mode="wait">
              {selectedQuote ? (
                <motion.div
                  key={selectedQuote}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-[#ee4d6a]/20 text-[#ee4d6a] text-xs font-bold uppercase tracking-widest px-3 py-1 font-mono">
                      {highlights.find(h => h.text === selectedQuote)?.type}
                    </span>
                    <span className="text-sm font-sans font-bold text-[#f1a92a]">
                      {highlights.find(h => h.text === selectedQuote)?.category}
                    </span>
                  </div>

                  <p className="text-2xl font-serif italic text-white leading-relaxed">
                    “{selectedQuote}”
                  </p>

                  <div className="h-[1px] bg-white/10 my-4" />

                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">IMPACT ANALYSIS:</span>
                    <p className="text-sm font-sans leading-relaxed text-slate-300">
                      {highlights.find(h => h.text === selectedQuote)?.comment}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 text-slate-500 space-y-4">
                  <ShieldAlert size={36} className="text-[#ee4d6a] animate-pulse" />
                  <p className="font-serif italic text-sm">
                    Select a dotted text segment in the container to run forensic criticism.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-xs text-slate-400 font-sans">Level-5 Teacher Assistant Mode</span>
              <button
                type="button"
                onClick={() => setShowPrompts(!showPrompts)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer border border-white/10"
              >
                {showPrompts ? "Hide Teacher Script" : "Show Teacher Script"}
              </button>
            </div>

            <AnimatePresence>
              {showPrompts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#0f111a] border border-[#f1a92a]/30 p-4 rounded-sm space-y-3 text-xs overflow-hidden"
                >
                  <span className="font-mono text-[#f1a92a] font-bold block">INTAN'S STUCK PROMPTS (SAY):</span>
                  <p className="text-slate-300">💡 <strong>If stuck on Repetition:</strong> "Look for any sentence where the same word or pattern comes back. Does anything feel like it's happening again?"</p>
                  <p className="text-slate-300">💡 <strong>If stuck on Sentence Structure:</strong> "Look for the shortest sentence you can find on that paragraph. What does it feel like?"</p>
                  <p className="text-[#f1a92a] font-semibold border-t border-white/5 pt-2">👥 After 3 mins, say (60s Share):</p>
                  <p className="text-slate-300">"Okay, compare with your neighbour — did you find the same things?"</p>
                </motion.div>
              )}
            </AnimatePresence>

            <SmartTimer minutes={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PQCSlide = () => {
  const [activeStage, setActiveStage] = useState<'P' | 'Q' | 'C' | null>(null);

  const workedExample = {
    point: 'The writer utilizes parallel syntactic repetition (“Object there was none. Passion there was none.”)',
    quote: 'where the noun structures and final negator “none” are repeated back-to-back with absolute symmetry',
    comment: 'The parallel structure creates a cold, robotic rhythm — as if the narrator is listing reasons to justify the unjustifiable. This makes the reader feel deeply uneasy, sensing a dangerous calmness beneath the surface.'
  };

  return (
    <div className="min-h-0 flex-grow flex flex-col justify-between max-w-7xl mx-auto">
      <div>
        <SectionLabel text="THE ANALYTICAL RIGOUR" subtitle="Earning Band-5 Marks consistently" />
        <h2 className="text-5xl font-serif font-black mb-4">The P-Q-C Framework</h2>
        <p className="text-slate-400 text-lg max-w-3xl font-serif italic mb-8">
          The ultimate engine to construct AS Level essays. Shifting from dry observation to high-level analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 my-4">
        {/* Point Card */}
        <div
          onClick={() => setActiveStage(activeStage === 'P' ? null : 'P')}
          className={cn(
            "p-6 md:p-8 border rounded-sm cursor-pointer transition-all duration-300 min-h-[160px] h-auto md:h-64 flex flex-col justify-between",
            activeStage === 'P' 
              ? "bg-[#1b1c35] border-rose-500 shadow-[0_0_20px_rgba(238,77,106,0.2)]" 
              : "bg-[#131525] border-white/5 hover:bg-white/[0.01]"
          )}
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-rose-500/20 text-[#ee4d6a] flex items-center justify-center font-bold text-xl mb-4 font-mono">P</div>
            <h3 className="text-xl font-bold font-serif mb-2 text-slate-100">POINT</h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">Name the Technique</p>
          </div>
          <p className="text-xs text-slate-300 italic font-serif leading-relaxed mt-4">
            Identify and name the technique. e.g., "The writer utilizes parallel syntactic repetition..."
          </p>
        </div>

        {/* Quote Card */}
        <div
          onClick={() => setActiveStage(activeStage === 'Q' ? null : 'Q')}
          className={cn(
            "p-6 md:p-8 border rounded-sm cursor-pointer transition-all duration-300 min-h-[160px] h-auto md:h-64 flex flex-col justify-between",
            activeStage === 'Q' 
              ? "bg-[#1d2638] border-amber-500 shadow-[0_0_20px_rgba(241,169,42,0.2)]" 
              : "bg-[#131525] border-white/5 hover:bg-white/[0.01]"
          )}
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-[#f1a92a] flex items-center justify-center font-bold text-xl mb-4 font-mono">Q</div>
            <h3 className="text-xl font-bold font-serif mb-2 text-slate-100">QUOTE</h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">Short, precise evidence</p>
          </div>
          <p className="text-xs text-slate-300 italic font-serif leading-relaxed mt-4">
            Isolate the exact quote. e.g., "...in 'Object there was none. Passion there was none.'"
          </p>
        </div>

        {/* Comment Card */}
        <div
          onClick={() => setActiveStage(activeStage === 'C' ? null : 'C')}
          className={cn(
            "p-6 md:p-8 border rounded-sm cursor-pointer transition-all duration-300 min-h-[160px] h-auto md:h-64 flex flex-col justify-between",
            activeStage === 'C' 
              ? "bg-green-950/20 border-green-500 shadow-[0_0_20px_rgba(74,222,128,0.2)]" 
              : "bg-[#131525] border-white/5 hover:bg-white/[0.01]"
          )}
        >
          <div>
            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xl mb-4 font-mono">C</div>
            <h3 className="text-xl font-bold font-serif mb-2 text-slate-100">COMMENT</h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">Explain the kinetic effect</p>
          </div>
          <p className="text-xs text-slate-300 italic font-serif leading-relaxed mt-4">
            Explain the effect on the reader. Tell us: what kind of tension is built? What is felt, thought or understood? Never say "it creates tension" (too vague).
          </p>
        </div>
      </div>

      {/* Interactive Prose Composer container */}
      <div className="bg-[#111322] border border-white/10 p-6 md:p-8 rounded-sm lg:p-10 shadow-2xl space-y-4">
        <span className="text-[10px] font-mono tracking-widest text-[#f1a92a] block font-bold">WORKED HARMONIZATION PIECE (P-Q-C IN SYNC)</span>
        
        <p className="text-base md:text-lg lg:text-xl font-serif italic text-slate-300 leading-relaxed">
          <span className={cn("transition-colors duration-300 p-1 rounded-sm", activeStage === 'P' ? "bg-rose-500/20 text-white font-bold" : "")}>
            {workedExample.point}
          </span>{' '}
          <span className={cn("transition-colors duration-300 p-1 rounded-sm", activeStage === 'Q' ? "bg-amber-500/20 text-white font-bold" : "")}>
            ({workedExample.quote}).
          </span>{' '}
          <span className={cn("transition-colors duration-300 p-1 rounded-sm", activeStage === 'C' ? "bg-green-500/10 text-white font-bold" : "")}>
            {workedExample.comment}
          </span>
        </p>

        <div className="h-[1px] bg-white/5 my-6" />

        <div className="flex flex-wrap items-center gap-4 justify-between text-xs">
          <span className="text-slate-500 italic">💡 Toggle the P, Q, or C cards above to isolate the structural anatomy of this response.</span>
          <span className="bg-[#ee4d6a] text-[#0f111a] font-sans font-bold tracking-widest uppercase text-[10px] px-3 py-1">BAND 5 MARK DEMONSTRATION</span>
        </div>
      </div>
    </div>
  );
};

const ExitSlide = () => {
  const [selectedVote, setSelectedVote] = useState<'repetition' | 'structure' | null>(null);
  const [votes, setVotes] = useState({ repetition: 58, structure: 42 });
  const [exitText, setExitText] = useState("");
  const [stickyNotes, setStickyNotes] = useState<string[]>([]);

  const handleVote = (type: 'repetition' | 'structure') => {
    if (selectedVote) return;
    setSelectedVote(type);
    setVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const submitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exitText.trim()) return;
    setStickyNotes(prev => [exitText.trim(), ...prev]);
    setExitText("");
  };

  return (
    <div className="min-h-0 flex-grow flex flex-col justify-between max-w-7xl mx-auto">
      <div>
        <SectionLabel text="EXIT TRAJECTORY" subtitle="Final Checks and Formative feedback" />
        <h2 className="text-5xl font-serif font-black mb-6">Before you go...</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-stretch flex-grow my-4">
        {/* Active Feedback Box */}
        <div className="bg-[#131525] border border-white/10 p-8 rounded-sm shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#f1a92a] block">CRUCIAL WRAP-UP</span>
            
            <div className="space-y-4 font-sans text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#ee4d6a]/20 text-[#ee4d6a] flex items-center justify-center font-bold text-xs shrink-0 rounded-full mt-0.5">1</div>
                <p><strong>Repetition:</strong> Dynamically builds acoustic and emotional intensity directly inside the narrator's head.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#ee4d6a]/20 text-[#ee4d6a] flex items-center justify-center font-bold text-xs shrink-0 rounded-full mt-0.5">2</div>
                <p><strong>Sentence Structure:</strong> Regulates the physiological engine (pacing, breathing, shock, or escalating urgency).</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#ee4d6a]/20 text-[#ee4d6a] flex items-center justify-center font-bold text-xs shrink-0 rounded-full mt-0.5">3</div>
                <p><strong>P-Q-C alignment:</strong> Always wrap up with a high-fidelity explanation of the <strong>EFFECT on the reader</strong>. That's what examiners reward.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 space-y-4">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">VOTE: Which creates more structural tension?</span>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={!!selectedVote}
                onClick={() => handleVote('repetition')}
                className={cn(
                  "p-4 border text-center transition-all duration-300 relative overflow-hidden",
                  selectedVote === 'repetition' 
                    ? "bg-[#ee4d6a] text-white border-[#ee4d6a] shadow-lg" 
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                )}
              >
                <div className="relative z-10 font-bold tracking-wider font-sans text-sm">REPETITION</div>
                {selectedVote && (
                  <div className="relative z-10 font-mono text-xs opacity-80 mt-1">
                    {Math.round((votes.repetition / (votes.repetition + votes.structure)) * 100)}%
                  </div>
                )}
              </button>

              <button
                disabled={!!selectedVote}
                onClick={() => handleVote('structure')}
                className={cn(
                  "p-4 border text-center transition-all duration-300 relative overflow-hidden",
                  selectedVote === 'structure' 
                    ? "bg-[#f1a92a] text-[#0f111a] border-[#f1a92a]" 
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                )}
              >
                <div className="relative z-10 font-bold tracking-wider font-sans text-sm">SENTENCE STRUCTURE</div>
                {selectedVote && (
                  <div className="relative z-10 font-mono text-xs opacity-80 mt-1">
                    {Math.round((votes.structure / (votes.repetition + votes.structure)) * 100)}%
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="bg-rose-500/10 text-[#ee4d6a] p-4 text-xs font-bold rounded-sm text-center tracking-wider uppercase">
            "The difference between good and excellent analysis is always in the Comment."
          </div>
        </div>

        {/* Interactive Sticky Notepad & Exit Ticket */}
        <div className="bg-[#16192a] border border-white/10 p-8 rounded-sm shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono tracking-widest text-[#ee4d6a] block uppercase font-bold">ACTIVE EXIT TICKET</span>
              <span className="text-[10px] font-mono tracking-widest text-[#f1a92a] uppercase border border-[#f1a92a]/30 px-2 py-0.5 rounded-sm">Worksheet</span>
            </div>
            
            <p className="font-serif italic text-base text-slate-300">
              Which technique — Repetition or Sentence Structure — do you think creates more tension in Poe's piece? Submit your one-sentence defense below:
            </p>

            <form onSubmit={submitNote} className="space-y-3 pt-2">
              <input
                type="text"
                value={exitText}
                onChange={(e) => setExitText(e.target.value)}
                placeholder="Type your brief, analytic sentence here..."
                className="w-full bg-[#0f111a] border border-white/15 focus:border-[#ee4d6a] px-4 py-3 text-slate-100 text-sm focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#ee4d6a] hover:bg-rose-600 text-[#0f111a] font-sans font-bold text-xs tracking-widest uppercase py-3 transition-colors"
              >
                PIN NOTE TO WALL
              </button>
            </form>
          </div>

          {/* Sticky Notes Wall / Container */}
          <div className="flex-grow">
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold block mb-3">CLASS RESPONSES / PINNED REFLECTIONS:</span>
            
            <div className="h-44 overflow-y-auto space-y-2 pr-2 bg-[#0f111a] p-4 rounded-sm border border-white/5 select-none scrollbar-thin scrollbar-thumb-white/10">
              {stickyNotes.map((note, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-amber-100 text-[#1a1202] stroke-none border-l-4 border-[#f1a92a] p-3 text-xs italic font-serif leading-relaxed"
                >
                  {note}
                </motion.div>
              ))}
              
              <div className="bg-white/5 border-l-4 border-slate-600 p-3 text-xs italic text-slate-400 leading-relaxed">
                "Short sentence structures build a chillingly clinical pacing that mimics cold, calculated sociopathy." — Student 1
              </div>
              <div className="bg-white/5 border-l-4 border-slate-600 p-3 text-xs italic text-slate-400 leading-relaxed">
                "The erratic doubling of 'very, very' forces us to feel narrator gasps, heightening immediate unease." — Student 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Player ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const slides = [
    <HeroSlide />,
    <ReadingSlide />,
    <BigQuestionSlide />,
    <TechniqueRepetition />,
    <TechniqueSentenceStructure />,
    <DetectiveChallenge />,
    <PQCSlide />,
    <ExitSlide />
  ];

  const slideTitles = [
    "Introduction & Focus text",
    "Reading & Sensory Immersion",
    "The Big Question (What vs How)",
    "Technique 1: Repetition Analysis",
    "Technique 2: Sentence Structure",
    "Active Detective Challenge",
    "Dynamic P-Q-C Framework",
    "Formative Assessment Wall"
  ];

  const next = useCallback(() => setCurrentSlide(prev => (prev + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length), [slides.length]);
  const reset = () => { setCurrentSlide(0); setMenuOpen(false); };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  return (
    <div className={cn(
      "fixed inset-0",
      THEME.bg,
      THEME.text,
      "font-sans selection:bg-[#ee4d6a] selection:text-white noise-bg overflow-hidden"
    )}>
      {/* Dynamic Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#ee4d6a] to-[#f1a92a] z-[100]"
        initial={{ width: 0 }}
        animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      />

      <AnimatePresence mode="wait">
        <Slide key={currentSlide} index={currentSlide}>
          {slides[currentSlide]}
        </Slide>
      </AnimatePresence>

      {/* Sleek Floating Chapter Index in Top Right Corner */}
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[90] pointer-events-auto">
        <button 
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2 bg-[#0f111a]/85 backdrop-blur-md border border-white/10 rounded-full text-slate-400 hover:text-white hover:border-[#ee4d6a]/40 hover:bg-[#131525] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_20px_rgba(238,77,106,0.15)] group cursor-pointer"
          title="Open Chapter Index"
        >
          <Menu size={13} strokeWidth={2} className="group-hover:text-[#ee4d6a] transition-colors" />
          <span className="text-[9px] uppercase font-bold tracking-[0.25em] font-sans">Index</span>
        </button>
      </div>

      {/* Elegantly Suspended Unified Navigation Bar (Minimal Footprint) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-4 bg-[#0F111A]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl">
        {/* Prev Button */}
        <button 
          type="button"
          onClick={prev}
          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>

        <div className="w-[1px] h-4 bg-white/10" />

        {/* Fraction Progress indicator */}
        <div className="min-w-[48px] text-center">
          <span className="font-mono text-xs font-bold text-[#f1a92a] tracking-wider select-none">
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        <div className="w-[1px] h-4 bg-white/10" />

        {/* Next Button */}
        <button 
          type="button"
          onClick={next}
          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer"
          title="Next (Right Arrow / Space)"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>

        {/* Desktop Progress Dots */}
        <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-white/10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                i === currentSlide ? "bg-[#ee4d6a] w-4" : "bg-white/15 hover:bg-white/40"
              )}
              title={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation index overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0f111a]/99 backdrop-blur-2xl z-[200] flex flex-col p-12 md:p-20 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16 max-w-7xl mx-auto w-full">
              <SectionLabel text="LITERARY DECK INDEX" subtitle="FORENSIC TEXT SCIENCE" />
              <button 
                onClick={() => setMenuOpen(false)}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-24 gap-y-10 max-w-7xl mx-auto w-full flex-grow">
              {slideTitles.map((title, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setCurrentSlide(i); setMenuOpen(false); }}
                  className={cn(
                    "group flex items-center gap-10 text-left border-b border-white/5 pb-6 transition-all hover:border-[#ee4d6a]",
                    i === currentSlide ? "opacity-100" : "opacity-40 hover:opacity-100"
                  )}
                >
                  <span className="font-mono text-4xl text-[#ee4d6a] font-black group-hover:scale-110 transition-transform w-12 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#f1a92a] mb-2 font-sans">LESSON MODULE {i + 1}</span>
                    <span className="text-3xl font-serif italic text-slate-200 group-hover:text-white transition-colors">{title}</span>
                  </div>
                  <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all text-[#ee4d6a]" />
                </motion.button>
              ))}
            </div>
            
            <div className="mt-16 max-w-7xl mx-auto w-full border-t border-white/5 pt-10 flex justify-between items-center text-[10px] font-bold tracking-[0.3em] text-slate-600 font-sans">
              <span>SOCIETY OF EXCELLENT LITERATURE</span>
              <button 
                onClick={reset} 
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw size={12} /> INITIALIZE BEGINNING
              </button>
              <span>V1.0.9 GOTHIC RELEASE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative gothic accents */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[#ee4d6a]/[0.02] rounded-full blur-[110px] -translate-y-1/2 translate-x-1/4 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#f1a92a]/[0.01] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDuration: '12s' }} />
      </div>
    </div>
  );
}
