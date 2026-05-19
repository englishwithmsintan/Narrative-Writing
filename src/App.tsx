import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Mic, 
  Leaf, 
  User, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  PenTool,
  RotateCcw,
  Menu,
  X,
  Play,
  Pause,
  Layers,
  Sparkles
} from 'lucide-react';

// --- Types ---

interface SlideProps {
  id: number;
  title?: string;
  children: React.ReactNode;
}

// --- Constants ---

const THEME = {
  bg: 'bg-[#0a1a15]', // Deeper, more luxurious green
  text: 'text-white',
  accent: 'text-[#d4af37]', // More gold-toned
  accentBg: 'bg-[#d4af37]',
  card: 'bg-[#1a2e28]',
  cardBorder: 'border-[#d4af37]/20',
};

// --- Utilities ---

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// --- Components ---

const Slide = ({ children, index }: { children: React.ReactNode, index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="w-full h-full flex flex-col p-8 md:p-20 relative overflow-hidden"
  >
    {/* Large Background Number */}
    <div className="absolute top-0 right-0 pointer-events-none select-none">
      <span className="text-[25vw] font-serif font-black text-white/[0.03] leading-none -mr-[5vw] -mt-[5vw]">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
    <div className="relative z-10 h-full flex flex-col">
      {children}
    </div>
  </motion.div>
);

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-12">
    <div className="w-8 h-[1px] bg-[#d4af37]" />
    <span className="text-[#d4af37] font-sans font-bold tracking-[0.4em] text-[10px] uppercase leading-none">{text}</span>
  </div>
);

const SophisticatedButton = ({ onClick, children, className = "" }: { onClick: () => void, children: React.ReactNode, className?: string }) => (
  <button 
    onClick={onClick}
    className={cn(
      "group relative px-6 py-3 overflow-hidden transition-all duration-300",
      "border border-[#d4af37]/30 hover:border-[#d4af37] bg-white/5 hover:bg-white/10",
      className
    )}
  >
    <div className="relative z-10 flex items-center gap-2 font-sans font-bold text-[11px] uppercase tracking-[0.2em]">
      {children}
    </div>
    <motion.div 
      className="absolute bottom-0 left-0 h-[2px] bg-[#d4af37]"
      initial={{ width: 0 }}
      whileHover={{ width: '100%' }}
      transition={{ duration: 0.3 }}
    />
  </button>
);

// --- New Interactive Components ---

const ComparisonSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] bg-[#1a2e28] overflow-hidden rounded-sm cursor-ew-resize group"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* "Showing" - Top Layer */}
      <div 
        className="absolute inset-0 z-10 bg-green-950/20"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="w-full h-full p-12 flex flex-col justify-center">
          <div className="bg-green-600 self-start text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">✅ SHOWING</div>
          <p className="text-3xl font-serif italic text-white leading-relaxed max-w-2xl">
            "Her palms left <span className="text-[#d4af37] border-b border-[#d4af37]">damp prints</span> on the manila folder. She rehearsed her name — just her name — <span className="text-[#d4af37] border-b border-[#d4af37]">three times</span> under her breath."
          </p>
        </div>
      </div>

      {/* "Telling" - Bottom Layer */}
      <div className="absolute inset-0 bg-red-950/20">
        <div className="w-full h-full p-12 flex flex-col justify-center items-end text-right">
          <div className="bg-red-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">❌ TELLING</div>
          <p className="text-3xl font-serif italic text-white/40 leading-relaxed max-w-2xl">
            "She was nervous about the interview."
          </p>
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-[1px] bg-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center text-[#0a1a15] shadow-xl">
          <ChevronLeft size={16} />
          <ChevronRight size={16} />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 bg-[#0a1a15]/80 px-4 py-2 rounded-full backdrop-blur-sm">Slide to transform</span>
      </div>
    </div>
  );
};

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
      <div className="relative w-20 h-20 shrink-0">
        <svg className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
          <motion.circle 
            cx="40" cy="40" r="36" fill="none" stroke="#d4af37" strokeWidth="4"
            strokeDasharray={226}
            animate={{ strokeDashoffset: 226 * (1 - seconds / (minutes * 60)) }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold tracking-tighter">
          {formatTime(seconds)}
        </div>
      </div>
      <div className="flex-grow">
        <div className="text-[10px] font-bold tracking-[0.3em] text-[#d4af37] mb-2 uppercase">TIME REMAINING</div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsActive(!isActive)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#d4af37] text-[#0a1a15] hover:scale-110 transition-transform"
          >
            {isActive ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            onClick={() => { setIsActive(false); setSeconds(minutes * 60); }}
            className="text-white/30 hover:text-white transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Individual Slides ---

const HeroSlide = () => (
  <div className="flex flex-col justify-center h-full max-w-5xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <SectionLabel text="AS Level • Cambridge 9093" />
      
      <h2 className="text-4xl md:text-5xl italic font-serif text-white/50 mb-0">The Art of</h2>
      <h1 className="text-8xl md:text-[11vw] font-serif font-black leading-[0.85] tracking-tight mb-12 flex flex-col">
        <span>Narrative</span>
        <span className="text-[#d4af37]">Writing</span>
      </h1>
      
      <p className="text-2xl md:text-3xl font-serif italic text-white/80 max-w-xl mb-16 leading-relaxed">
        Crafting stories that breathe, pulse, and linger in the shadows of the reader's mind.
      </p>
      
      <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#d4af37]">PRESENTED BY</span>
          <span className="text-lg font-serif">Intan Fazillah</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#d4af37]">FACULTY</span>
          <span className="text-lg font-serif">English Department</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#d4af37]">INSTITUTION</span>
          <span className="text-lg font-serif">ICM High School</span>
        </div>
      </div>
    </motion.div>
  </div>
);

const ObjectivesSlide = () => (
  <div className="grid md:grid-cols-[1fr,1.5fr] gap-20 h-full items-center">
    <div>
      <SectionLabel text="MISSION PARAMETERS" />
      <h2 className="text-6xl font-serif font-bold italic leading-tight mb-12">
        A blueprint <br />for the <span className="text-[#d4af37]">imagination</span>
      </h2>
      <p className="text-white/60 leading-relaxed mb-12 italic">
        By the end of this journey, your creative toolkit will be sharpened with the precision of a surgeon's blade.
      </p>
      <div className="relative w-24 h-24">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-dashed border-[#d4af37]/30 rounded-full"
        />
        <div className="absolute inset-4 border border-[#d4af37]/50 rounded-full flex items-center justify-center">
          <Sparkles className="text-[#d4af37]" />
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
      {[
        { t: "IDENTIFY", d: "The architectural elements of effective prose" },
        { t: "MASTER", d: "Technique: structure, voice, tension & sensory imagery" },
        { t: "CRAFT", d: "Openings that hook the heart and never let go" },
        { t: "EVALUATE", d: "A rigorous self-assessment against Cambridge standards" }
      ].map((obj, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="group grid grid-cols-[80px,1fr] items-center bg-white/[0.03] border-l border-white/10 hover:bg-white/[0.08] hover:border-[#d4af37] transition-all p-8"
        >
          <span className="font-serif text-3xl text-white/20 group-hover:text-[#d4af37] transition-colors">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <div className="text-[10px] font-bold tracking-[0.3em] text-[#d4af37] mb-1">{obj.t}</div>
            <div className="text-xl font-serif italic text-white/90">{obj.d}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const WarmUpSlide = () => {
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);

  return (
    <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
      <SectionLabel text="CONFRONTING THE HOOK" />
      <h2 className="text-7xl font-serif font-black mb-16 italic leading-[0.9]">Which heart beats <span className="text-[#d4af37]">faster?</span></h2>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <motion.div 
          onClick={() => setSelected('A')}
          className={cn(
            "relative p-12 cursor-pointer transition-all duration-500 overflow-hidden",
            selected === 'A' ? "bg-white text-[#0a1a15]" : "bg-white/5 hover:bg-white/10"
          )}
        >
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 opacity-40">OPTION ALPHA</div>
          <p className="text-3xl font-serif italic leading-relaxed">
            "It was a dark and stormy night. The rain fell heavily. John walked into the house. He was scared."
          </p>
          <div className="mt-12 h-[1px] bg-current opacity-20" />
        </motion.div>

        <motion.div 
          onClick={() => setSelected('B')}
          className={cn(
            "relative p-12 cursor-pointer transition-all duration-500 overflow-hidden border border-transparent",
            selected === 'B' ? "bg-[#d4af37] text-[#0a1a15]" : "bg-white/5 border-white/10 hover:bg-white/10"
          )}
        >
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 opacity-40">OPTION BRAVO</div>
          <p className="text-3xl font-serif italic leading-relaxed">
            "The lock was already broken when I arrived — which meant someone had left in a hurry, or was still inside."
          </p>
          <div className="mt-12 h-[1px] bg-current opacity-20" />
        </motion.div>
      </div>

      <AnimatePresence>
        {selected === 'B' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6 bg-white/[0.05] p-10 backdrop-blur-md border-l border-[#d4af37]"
          >
            <Zap className="text-[#d4af37]" size={36} />
            <p className="text-2xl font-serif italic text-white/90 leading-relaxed">
              Why does Bravo pull us in? It’s the <span className="text-[#d4af37]">unsaid</span>. The mystery. The immediate stakes.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PillarsSlide = () => {
  const [active, setActive] = useState<number | null>(null);

  const pillars = [
    { title: 'Structure', icon: <Layers size={32} />, detail: 'The skeletal framework—surprising, deliberate, and whole.', quote: "Architecture for shadows." },
    { title: 'Voice', icon: <Mic size={32} />, detail: "The narrator's unique human fingerprint.", quote: "The ghost in the machine." },
    { title: 'Tension', icon: <Zap size={32} />, detail: 'The gravity that pulls the reader deep into the vortex.', quote: "Pressure, applied slowly." },
    { title: 'Imagery', icon: <Leaf size={32} />, detail: 'Sensory translation from mind to paper.', quote: "Painting with echoes." },
    { title: 'Character', icon: <User size={32} />, detail: 'Beings that are real, flawed, and terrifyingly alive.', quote: "Vessels of truth." },
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <SectionLabel text="THE CORE ARCHITECTURE" />
      <h2 className="text-8xl font-serif font-black mb-16 italic tracking-tight">The <span className="text-[#d4af37]">Fundamental</span> Pillars</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {pillars.map((p, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={cn(
              "relative p-10 h-[400px] flex flex-col transition-all duration-500 overflow-hidden cursor-default group border border-white/5 hover:border-[#d4af37]/30",
              active === i ? "bg-white/[0.08]" : "bg-white/5"
            )}
          >
            <div className="relative z-10 mb-12 text-[#d4af37] opacity-60 group-hover:opacity-100 transition-opacity">
              {p.icon}
            </div>
            <h3 className="relative z-10 text-2xl font-serif font-bold italic mb-6 leading-none tracking-tight">{p.title}</h3>
            <div className="relative z-10 mt-auto">
              <p className="text-sm font-serif italic text-white/40 mb-4 group-hover:text-[#d4af37] transition-colors">{p.quote}</p>
              <p className="text-xs leading-relaxed text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">{p.detail}</p>
            </div>
            
            {/* Background Accent */}
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#d4af37]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ArcSlide = () => {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  
  const points = [
    { label: 'Hook / Opening', x: '5%', y: '80%', color: 'bg-[#d4af37]', detail: "The genesis. Introduce mystery or immediate conflict." },
    { label: 'Rising Action', x: '25%', y: '60%', color: 'bg-white/30', detail: "Complication. The walls begin to close in." },
    { label: 'Climax', x: '45%', y: '20%', color: 'bg-red-500', detail: "The breaking point. Total vulnerability." },
    { label: 'Falling Action', x: '70%', y: '50%', color: 'bg-white/30', detail: "The exhale. Processing the aftermath." },
    { label: 'Resolution', x: '92%', y: '75%', color: 'bg-white/50', detail: "The echo. A world changed forever." },
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <SectionLabel text="THE NARRATIVE PULSE" />
      <h2 className="text-8xl font-serif font-black mb-20 italic leading-[0.8] tracking-tight">The Geometry <br /><span className="text-[#d4af37]">of Suspense</span></h2>

      <div className="relative h-[400px] mb-20 w-full px-12 border-b border-white/5">
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
          <motion.path
            d="M 60 320 C 150 320, 250 240, 480 80 S 750 200, 950 300"
            fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.1" 
          />
          <motion.path
            d="M 60 320 C 150 320, 250 240, 480 80 S 750 200, 950 300"
            fill="none" stroke="#d4af37" strokeWidth="2" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </svg>

        {points.map((p, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setActivePoint(i)}
            onMouseLeave={() => setActivePoint(null)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.2 }}
            style={{ left: p.x, top: p.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-crosshair group"
          >
            <div className={cn(
              "w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 backdrop-blur-md",
              activePoint === i ? "bg-[#d4af37] scale-125 border-[#d4af37]" : "bg-white/5 hover:bg-white/10"
            )}>
              <div className={cn("w-3 h-3 rounded-full transition-colors", p.color, activePoint === i ? "bg-white" : "")} />
            </div>
            
            <AnimatePresence>
              {activePoint === i && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-64 bg-[#1a2e28] border border-[#d4af37]/30 p-6 z-50 text-center shadow-2xl"
                >
                  <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#d4af37] mb-3 leading-none">{p.label}</div>
                  <p className="text-xs italic leading-relaxed text-white/70">{p.detail}</p>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-[#d4af37]/30" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {[
          { t: 'Withhold Info', d: 'Delay the secret' },
          { t: 'Pacing', d: 'Vary sentence length' },
          { t: 'Stakes', d: 'What is lost if they fail?' },
          { t: 'Questions', d: 'Plant seeds of doubt' }
        ].map((item, i) => (
          <div key={i} className="group border border-white/5 p-6 hover:bg-white/[0.03] transition-colors">
            <div className="text-[10px] font-bold tracking-[0.3em] text-[#d4af37] mb-2 uppercase group-hover:translate-x-1 transition-transform">{item.t}</div>
            <div className="text-lg font-serif italic text-white/50 group-hover:text-white transition-colors">{item.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShowDontTellSlide = () => (
  <div className="h-full flex flex-col justify-center">
    <SectionLabel text="THE GOLDEN DIRECTIVE" />
    <h2 className="text-8xl font-serif font-black mb-16 italic tracking-tight">Show, <span className="text-[#d4af37]">Don't Tell</span></h2>
    
    <div className="mb-20">
      <ComparisonSlider />
    </div>

    <div className="grid md:grid-cols-3 gap-12">
      {[
        { l: "SENSORY DEPTH", d: "Touch, sound, scent—anchor the reader in the immediate." },
        { l: "DELIBERATE ACTION", d: "Let a gesture reveal the turbulence within." },
        { l: "EXPERIENCE", d: "Don't name the emotion; evoke it directly." }
      ].map((item, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 bg-[#d4af37]" />
             <span className="text-[10px] font-bold tracking-[0.3em] uppercase">{item.l}</span>
          </div>
          <p className="text-sm italic font-serif text-white/50 leading-relaxed border-l border-white/10 pl-6">{item.d}</p>
        </div>
      ))}
    </div>
  </div>
);

const ActivitySlide = () => (
  <div className="h-full flex flex-col justify-center">
    <div className="grid md:grid-cols-[1fr,400px] gap-20">
      <div>
        <SectionLabel text="LABORATORY SESSION" />
        <h2 className="text-9xl font-serif font-black mb-12 italic tracking-tighter">Story <br /><span className="text-[#d4af37]">Surgery!</span></h2>
        
        <div className="space-y-12">
          {[
            "Diagnose the weak opening on your worksheet.",
            "Apply withholding and sensory grafting.",
            "Resurrect the prose (4–6 gripping sentences).",
            "Defend one deliberate choice to the class."
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-8 group">
              <span className="font-serif text-4xl text-white/10 group-hover:text-[#d4af37] transition-all duration-500">{i + 1}</span>
              <p className="text-3xl font-serif italic text-white/80 group-hover:translate-x-2 transition-transform duration-500">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-8">
        <SmartTimer minutes={10} />
        
        <div className="bg-[#11241e] p-8 border border-[#d4af37]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-20"><Sparkles size={24} /></div>
          <p className="text-xl font-serif italic leading-relaxed text-white/90">
            "We are not merely writing stories; we are constructing worlds. Every word is a brick. Every silence is an alleyway."
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ChecklistSlide = () => (
  <div className="h-full flex flex-col justify-center">
    <SectionLabel text="FINAL QUALITY CONTROL" />
    <h2 className="text-[100px] font-serif font-black mb-20 italic leading-none flex flex-col">
       <span>The Master</span>
       <span className="text-[#d4af37]">Checklist</span>
    </h2>

    <div className="grid md:grid-cols-3 gap-0 border border-white/10 divide-x divide-white/10">
      {[
        { 
          title: 'STRUCTURE', 
          items: ['Immediate Hook', 'Organic Rising Tension', 'Meaningful Resolution']
        },
        { 
          title: 'VOICE & STYLE', 
          items: ['Distinct Narrative Persona', 'Rhythmic Sentence Variety', 'Embodied Emotion (Show)']
        },
        { 
          title: 'LANGUAGE', 
          items: ['Precise Word Grafting', 'Five-Sense Imagery', 'Purposeful Figurative Echoes']
        }
      ].map((cat, i) => (
        <div key={i} className="p-12 hover:bg-white/[0.02] transition-colors group">
          <div className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37] mb-12 uppercase">{cat.title}</div>
          <div className="space-y-8">
            {cat.items.map((item, j) => (
              <div key={j} className="flex items-start gap-4 cursor-pointer">
                <div className="w-5 h-5 border border-white/20 shrink-0 mt-1 flex items-center justify-center group-hover:border-[#d4af37] transition-all">
                  <CheckCircle2 size={12} className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-lg font-serif italic text-white/50 group-hover:text-white transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SummarySlide = () => (
  <div className="h-full flex flex-col justify-center items-center text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl"
    >
      <SectionLabel text="EXIT TRAJECTORY" />
      <h2 className="text-[120px] font-serif font-black mb-12 italic leading-none tracking-tighter">Finis.</h2>
      <p className="text-4xl font-serif italic text-white/60 mb-20 leading-relaxed underline decoration-[#d4af37] decoration-1 underline-offset-8">
        "Go forth and haunt your readers."
      </p>

      <div className="grid md:grid-cols-3 gap-12 w-full mb-20">
        {[
          { l: 'ARCHITECTURE', v: 'The Pillars' },
          { l: 'ALCHEMY', v: 'Show > Tell' },
          { l: 'GRAVITY', v: ' Tension' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">{stat.l}</span>
            <span className="text-2xl font-serif text-[#d4af37]">{stat.v}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#d4af37] text-[#0a1a15] p-12 w-full relative group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 opacity-60">THE EXIT TICKET</div>
        <p className="text-3xl font-serif italic font-bold mb-4">Craft one sentence that I will never forget.</p>
        <p className="text-sm uppercase tracking-widest font-bold opacity-40">Place it upon the wall of echoes.</p>
      </div>
    </motion.div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const slides = [
    <HeroSlide />,
    <ObjectivesSlide />,
    <WarmUpSlide />,
    <PillarsSlide />,
    <ArcSlide />,
    <ShowDontTellSlide />,
    <ActivitySlide />,
    <ChecklistSlide />,
    <SummarySlide />
  ];

  const slideTitles = [
    "The Beginning",
    "Mission Parameters",
    "The Hook",
    "Fundamental Pillars",
    "Geometry of Tension",
    "Show, Don't Tell",
    "Story Surgery",
    "Final Quality Control",
    "Finis"
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
      "font-sans selection:bg-[#d4af37] selection:text-[#0a1a15] noise-bg overflow-hidden"
    )}>
      {/* Dynamic Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-[#d4af37] z-[100]"
        initial={{ width: 0 }}
        animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      />

      <AnimatePresence mode="wait">
        <Slide key={currentSlide} index={currentSlide}>
          {slides[currentSlide]}
        </Slide>
      </AnimatePresence>

      {/* Modern Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-10 flex items-center justify-between pointer-events-none z-[80]">
        <div className="flex gap-4 pointer-events-auto items-center backdrop-blur-md bg-white/5 border border-white/10 p-2 rounded-sm">
          <button 
            onClick={prev}
            className="w-14 h-14 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft size={24} strokeWidth={1} />
          </button>
          
          <div className="w-[1px] h-6 bg-white/10 mx-2" />
          
          <button 
            onClick={() => setMenuOpen(true)}
            className="px-6 h-14 flex items-center gap-3 text-white/50 hover:text-white hover:bg-white/5 transition-all group"
          >
            <Menu size={20} strokeWidth={1} />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] group-hover:text-[#d4af37] transition-colors">INDEX</span>
          </button>

          <div className="w-[1px] h-6 bg-white/10 mx-2" />

          <button 
            onClick={next}
            className="w-14 h-14 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
            title="Next (Right Arrow / Space)"
          >
            <ChevronRight size={24} strokeWidth={1} />
          </button>
        </div>

        {/* Minimal Progress Dots */}
        <div className="hidden lg:flex items-center gap-4 pointer-events-auto backdrop-blur-md bg-[#0a1a15]/80 border border-white/10 px-8 py-4 rounded-sm">
           <div className="flex gap-2">
            {slides.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentSlide(i)}
                whileHover={{ scale: 1.5 }}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-500",
                  i === currentSlide ? "bg-[#d4af37] w-6" : "bg-white/10 hover:bg-white/30"
                )}
              />
            ))}
           </div>
           <div className="w-12 text-right">
              <span className="font-mono text-xs font-bold text-[#d4af37] tabular-nums">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
           </div>
        </div>
        
        <div className="hidden xl:flex flex-col items-end pointer-events-none opacity-20">
          <small className="text-[9px] uppercase font-bold tracking-[0.4em]">Cambridge 9093 Suite</small>
          <small className="text-[9px] uppercase font-bold tracking-[0.4em]">Interactive Series 2026</small>
        </div>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a1a15]/98 backdrop-blur-2xl z-[200] flex flex-col p-20"
          >
            <div className="flex justify-between items-center mb-20">
              <SectionLabel text="STORY NAVIGATION" />
              <button 
                onClick={() => setMenuOpen(false)}
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"
              >
                <X />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-32 gap-y-12 max-w-7xl mx-auto w-full">
              {slideTitles.map((title, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setCurrentSlide(i); setMenuOpen(false); }}
                  className={cn(
                    "group flex items-center gap-12 text-left border-b border-white/5 pb-8 transition-all hover:border-[#d4af37]",
                    i === currentSlide ? "opacity-100" : "opacity-40 hover:opacity-100"
                  )}
                >
                  <span className="font-serif text-5xl text-[#d4af37] group-hover:scale-110 transition-transform">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2">CHAPTER {i + 1}</span>
                    <span className="text-4xl font-serif italic">{title}</span>
                  </div>
                  <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all" />
                </motion.button>
              ))}
            </div>
            
            <div className="mt-auto flex justify-between items-center text-[10px] font-bold tracking-[0.3em] text-white/20">
              <span>ESTABLISHED 2026</span>
              <SophisticatedButton onClick={reset} className="!border-transparent opacity-50 hover:opacity-100">
                <RotateCcw size={12} className="mr-2" /> RESTART EXPERIENCE
              </SophisticatedButton>
              <span>V1.0.4 PRODUCTION</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Accents */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#d4af37]/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#d4af37]/[0.03] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>
    </div>
  );
}
