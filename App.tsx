import React, { useState, useEffect, useMemo } from 'react';
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  ArrowRight, 
  ChevronRight, 
  Menu, 
  X,
  Zap,
  Star,
  Flame,
  User,
  MessageCircle,
  Sparkles,
  Mail,
  Sun,
  Moon,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Wrench,
  Building2,
  Home,
  Factory,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ExternalLink,
  Scale,
  FileText,
  ShieldHalf,
  ArrowUp,
  Info,
  Clock,
  DollarSign,
  GanttChart,
  Navigation,
  LocateFixed,
  Radar,
  Calculator,
  TrendingUp,
  Activity
} from 'lucide-react';

// Define the custom element for ElevenLabs to avoid TS errors
const ElevenLabsConvai = 'elevenlabs-convai' as any;

// --- Types ---

type VibeContext = {
  season: 'heating' | 'cooling';
  time: 'morning' | 'day' | 'evening' | 'night';
  alert: string;
  heroImage: string;
  themeColor: string;
  accentGradient: string;
};

type PageID = 
  | 'privacy' | 'terms' | 'tssa' | 'accessibility' 
  | 'rebates' | 'warranty' | 'tracking' | 'financing' 
  | 'emergency-protocol' | 'portal' | 'pricing-guide' | null;

type RegionID = 'north-york' | 'etobicoke' | 'scarborough' | 'vaughan' | 'downtown';

interface RegionData {
  id: RegionID;
  name: string;
  techs: number;
  response: string;
  focus: string;
}

// --- Components ---

const PricingEstimatorWidget = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  if (!visible) return null;

  const estimates = [
    { service: 'Emergency Furnace Repair', range: '$149 - $380', icon: Flame, color: 'text-orange-500' },
    { service: 'AC Precision Tune-up', range: '$110 - $195', icon: Wind, color: 'text-blue-500' },
    { service: 'High-Efficiency Install', range: '$3,800+', icon: Zap, color: 'text-yellow-500' },
    { service: 'Ductless Heat Pump', range: '$2,400 - $6,500', icon: Thermometer, color: 'text-emerald-500' },
  ];

  return (
    <div className="fixed bottom-28 right-6 z-50 w-72 bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 p-6 animate-in slide-in-from-bottom-10 duration-500 overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-full text-slate-400"><X className="w-4 h-4" /></button>
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
          <Calculator className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 leading-none">Instant Estimator</h4>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Live GTA Rates</span>
        </div>
      </div>

      <div className="space-y-4">
        {estimates.map((est, i) => (
          <div key={i} className="group cursor-default">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-600 transition-colors">{est.service}</span>
              <span className="text-xs font-black text-slate-900">{est.range}</span>
            </div>
            <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
               <div className={`h-full bg-slate-200 rounded-full transition-all duration-1000 group-hover:w-full`} style={{ width: '40%' }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em]">Toronto Market Premium: 4.2%</span>
        </div>
        <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group">
          Get Precision Quote <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// --- Shared Utilities ---

const handleGlobalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, closeMobileMenu?: () => void) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    if (closeMobileMenu) closeMobileMenu();
  }
};

const SectionHeader = ({ badge, title, description, light = false }: any) => (
  <div className="mb-16 max-w-2xl">
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${light ? 'bg-white/10 text-white border-white/20' : 'bg-blue-50 text-blue-600 border-blue-100'} border text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm`}>
      {badge}
    </div>
    <h2 className={`text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    <p className={`text-lg font-medium leading-relaxed ${light ? 'text-blue-100/70' : 'text-slate-500'}`}>
      {description}
    </p>
  </div>
);

const GTAInteractiveMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionID | null>('north-york');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (selectedRegion) {
      setIsScanning(true);
      const timer = setTimeout(() => setIsScanning(false), 800);
      return () => clearTimeout(timer);
    }
  }, [selectedRegion]);
  
  const regions: Record<RegionID, RegionData> = {
    'north-york': { id: 'north-york', name: 'North York', techs: 12, response: '15-30 min', focus: 'Residential High-Rise' },
    'etobicoke': { id: 'etobicoke', name: 'Etobicoke', techs: 8, response: '25-45 min', focus: 'Single Family Detached' },
    'scarborough': { id: 'scarborough', name: 'Scarborough', techs: 10, response: '20-40 min', focus: 'Industrial/HVAC' },
    'vaughan': { id: 'vaughan', name: 'Vaughan', techs: 6, response: '30-60 min', focus: 'Luxury Smart Homes' },
    'downtown': { id: 'downtown', name: 'Downtown Toronto', techs: 14, response: '10-25 min', focus: 'Hydronic & Steam' }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl relative group overflow-hidden">
        <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20">
            <LocateFixed className="w-3 h-3" /> Live Coverage Map
          </div>
          {isScanning && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">
              <Radar className="w-3 h-3 text-blue-400" /> Scanning Distict...
            </div>
          )}
        </div>
        
        <svg viewBox="0 0 500 400" className="w-full h-auto drop-shadow-2xl">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path 
            d="M 50,50 L 250,50 L 250,150 L 50,150 Z" 
            className={`cursor-pointer transition-all duration-500 outline-none ${selectedRegion === 'vaughan' ? 'fill-blue-600' : 'fill-slate-100 hover:fill-blue-100'}`}
            filter={selectedRegion === 'vaughan' ? "url(#glow)" : ""}
            onClick={() => setSelectedRegion('vaughan')}
          />
          <text x="110" y="105" className={`text-[12px] font-black pointer-events-none transition-colors duration-500 ${selectedRegion === 'vaughan' ? 'fill-white' : 'fill-slate-400'}`}>VAUGHAN</text>

          <path 
            d="M 50,150 L 180,150 L 180,350 L 100,350 L 50,250 Z" 
            className={`cursor-pointer transition-all duration-500 outline-none ${selectedRegion === 'etobicoke' ? 'fill-blue-600' : 'fill-slate-100 hover:fill-blue-100'}`}
            filter={selectedRegion === 'etobicoke' ? "url(#glow)" : ""}
            onClick={() => setSelectedRegion('etobicoke')}
          />
          <text x="75" y="240" className={`text-[12px] font-black pointer-events-none transition-colors duration-500 ${selectedRegion === 'etobicoke' ? 'fill-white' : 'fill-slate-400'}`}>ETOBICOKE</text>

          <path 
            d="M 250,50 L 450,50 L 450,150 L 320,250 L 180,150 L 250,150 Z" 
            className={`cursor-pointer transition-all duration-500 outline-none ${selectedRegion === 'north-york' ? 'fill-blue-600' : 'fill-slate-100 hover:fill-blue-100'}`}
            filter={selectedRegion === 'north-york' ? "url(#glow)" : ""}
            onClick={() => setSelectedRegion('north-york')}
          />
          <text x="270" y="105" className={`text-[12px] font-black pointer-events-none transition-colors duration-500 ${selectedRegion === 'north-york' ? 'fill-white' : 'fill-slate-400'}`}>NORTH YORK</text>

          <path 
            d="M 450,50 L 490,50 L 490,300 L 320,350 L 320,250 L 450,150 Z" 
            className={`cursor-pointer transition-all duration-500 outline-none ${selectedRegion === 'scarborough' ? 'fill-blue-600' : 'fill-slate-100 hover:fill-blue-100'}`}
            filter={selectedRegion === 'scarborough' ? "url(#glow)" : ""}
            onClick={() => setSelectedRegion('scarborough')}
          />
          <text x="365" y="180" className={`text-[12px] font-black pointer-events-none transition-colors duration-500 ${selectedRegion === 'scarborough' ? 'fill-white' : 'fill-slate-400'}`}>SCARBOROUGH</text>

          <path 
            d="M 180,150 L 320,250 L 320,350 L 180,350 Z" 
            className={`cursor-pointer transition-all duration-500 outline-none ${selectedRegion === 'downtown' ? 'fill-blue-600' : 'fill-slate-100 hover:fill-blue-100'}`}
            filter={selectedRegion === 'downtown' ? "url(#glow)" : ""}
            onClick={() => setSelectedRegion('downtown')}
          />
          <text x="205" y="270" className={`text-[12px] font-black pointer-events-none transition-colors duration-500 ${selectedRegion === 'downtown' ? 'fill-white' : 'fill-slate-400'}`}>DOWNTOWN</text>
        </svg>

        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center px-6 py-4 bg-slate-900 rounded-2xl text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Navigation className="w-3 h-3 text-blue-400" /> Click district for dispatch data
          </span>
          <span className="text-[10px] font-bold text-slate-400">Extreme Air Ops © 2026</span>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        {selectedRegion ? (
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white animate-in fade-in slide-in-from-right duration-500 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
            <h4 className="text-3xl font-black mb-2 tracking-tighter">{regions[selectedRegion].name}</h4>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Service Active
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Master Techs</span>
                <span className="text-xl font-black text-white">{regions[selectedRegion].techs}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Est. Response Time</span>
                <span className="text-xl font-black text-blue-400">{regions[selectedRegion].response}</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">District Specialization</span>
                <span className="text-sm font-black text-white text-right max-w-[150px]">{regions[selectedRegion].focus}</span>
              </div>
            </div>

            <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 active:scale-95 group">
              Book {regions[selectedRegion].name} Specialist
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="p-10 border-4 border-dashed border-slate-200 rounded-[3rem] text-center flex flex-col items-center justify-center min-h-[400px]">
            <LocateFixed className="w-12 h-12 text-slate-300 mb-4" />
            <h4 className="text-xl font-black text-slate-400 mb-2 tracking-tighter">Select a District</h4>
            <p className="text-slate-400 text-sm max-w-xs">Click on the map to see real-time technician availability and response times for your area.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, badge }: any) => (
  <div className="bento-card bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between h-full group hover:bg-white hover:border-blue-200 cursor-default transition-all duration-300">
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-200">
          <Icon className="w-7 h-7" />
        </div>
        {badge && <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-yellow-400 rounded-md shadow-sm border border-yellow-500/20">{badge}</span>}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 group-hover:text-slate-700 transition-colors">{description}</p>
    </div>
    <button 
      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} 
      className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-4 transition-all duration-300 active:scale-95"
    >
      Request Service <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

const TrustIndicator = ({ icon: Icon, label, sub }: any) => (
  <div className="flex items-center gap-4 py-4 px-6 bg-white/50 rounded-2xl border border-white/20 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:shadow-md cursor-default">
    <Icon className="w-6 h-6 text-blue-600" />
    <div>
      <div className="text-sm font-bold leading-none mb-1 text-slate-900">{label}</div>
      <div className="text-xs text-slate-500 font-medium">{sub}</div>
    </div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Emergency', href: '#emergency' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 glass-nav' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" onClick={(e) => handleGlobalLinkClick(e, '#hero')} className="flex items-center gap-3 group">
          <div className="relative">
             <div className="w-10 h-10 bg-blue-600 rounded-xl rotate-12 flex items-center justify-center shadow-lg group-hover:rotate-0 transition-transform duration-500 group-hover:shadow-blue-400/20">
                <Thermometer className="text-white w-6 h-6 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
             </div>
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div>
            <span className={`text-xl font-black tracking-tighter block leading-none transition-colors group-hover:text-blue-600 ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>EXTREME AIR</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Heating & Cooling</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={(e) => handleGlobalLinkClick(e, item.href)}
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors relative group py-2"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href="tel:4167282224" className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20">
            <Phone className="w-4 h-4" />
            (416) 728-2224
          </a>
        </div>

        <button className="md:hidden p-2 text-slate-900 bg-white/50 rounded-xl backdrop-blur-sm border border-slate-100 hover:bg-white transition-all" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white p-6 border-b shadow-2xl flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-300">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={(e) => handleGlobalLinkClick(e, item.href, () => setIsMenuOpen(false))}
              className="font-bold py-4 border-b border-slate-50 text-slate-900 hover:text-blue-600"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a href="tel:4167282224" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-center flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a href="#contact" onClick={(e) => handleGlobalLinkClick(e, '#contact', () => setIsMenuOpen(false))} className="w-full py-4 bg-yellow-400 text-slate-900 rounded-2xl font-bold text-center hover:bg-yellow-500 transition-colors">
              Request Free Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const PageOverlay = ({ page, onClose }: { page: PageID; onClose: () => void }) => {
  if (!page) return null;

  const contentMap: Record<string, { title: string; icon: any; body: React.ReactNode }> = {
    privacy: {
      title: 'Privacy & Data Policy',
      icon: Scale,
      body: (
        <div className="space-y-6">
          <p className="text-slate-600">Extreme Air Heating & Cooling ("we," "us," or "our") is committed to protecting your privacy in accordance with Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA).</p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">What we collect</h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li>Contact info provided via our Smart Estimate form.</li>
              <li>Voice transcripts from our AI Receptionist (ElevenLabs) for quality assurance.</li>
              <li>Geolocation data to route the nearest technician.</li>
            </ul>
          </div>
          <p className="text-sm text-slate-500 italic">Last updated: January 2026. We never sell your data to third-party marketing firms.</p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      body: (
        <div className="space-y-6">
          <p className="text-slate-600 font-medium">Agreement for Residential and Commercial HVAC Services in the Province of Ontario.</p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5" /></div>
              <div>
                <h5 className="font-bold text-slate-900">Service Guarantees</h5>
                <p className="text-sm text-slate-500">All repair work includes a 1-year labor warranty. Installations are subject to manufacturer-specific parts warranties (typically 10 years).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0"><DollarSign className="w-5 h-5" /></div>
              <div>
                <h5 className="font-bold text-slate-900">Billing & Estimates</h5>
                <p className="text-sm text-slate-500">Diagnostic fees are waived upon approval of repair quotes. Emergency premiums apply for calls between 10 PM and 6 AM.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    tssa: {
      title: 'TSSA Compliance',
      icon: ShieldHalf,
      body: (
        <div className="space-y-6">
          <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-600/20">
            <h4 className="text-xl font-bold mb-2">Contractor License #8821</h4>
            <p className="text-blue-100 text-sm">Extreme Air is a fully registered fuels contractor with the Technical Standards and Safety Authority (TSSA).</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 border border-slate-100 rounded-2xl bg-white">
               <h5 className="font-bold text-slate-900 text-sm">Gas Fitters (G1/G2)</h5>
               <p className="text-xs text-slate-500">Every tech on site carries a current TSSA certificate of qualification.</p>
             </div>
             <div className="p-4 border border-slate-100 rounded-2xl bg-white">
               <h5 className="font-bold text-slate-900 text-sm">Liability Insurance</h5>
               <p className="text-xs text-slate-500">Full $5M commercial liability and WSIB coverage for all GTA projects.</p>
             </div>
          </div>
        </div>
      )
    },
    rebates: {
      title: 'Ontario Rebate Guide 2026',
      icon: Sparkles,
      body: (
        <div className="space-y-6">
          <p className="text-slate-600">Upgrade to high-efficiency heat pumps or smart furnaces and save up to <span className="text-emerald-600 font-bold">$7,100</span> through current provincial initiatives.</p>
          <div className="space-y-3">
             <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex justify-between items-center">
                <div>
                   <h5 className="font-bold text-emerald-900 text-sm">Clean Home Heating Initiative</h5>
                   <p className="text-xs text-emerald-700">Available for North York & Scarborough residents.</p>
                </div>
                <div className="text-emerald-600 font-black">$4,500</div>
             </div>
             <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex justify-between items-center">
                <div>
                   <h5 className="font-bold text-blue-900 text-sm">Federal Greener Homes Successor</h5>
                   <p className="text-xs text-blue-700">Tax-free grant for cold-climate heat pumps.</p>
                </div>
                <div className="text-blue-600 font-black">$2,600</div>
             </div>
          </div>
          <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">Apply for Rebate Check</button>
        </div>
      )
    },
    warranty: {
      title: 'Warranty Registration',
      icon: CheckCircle2,
      body: (
        <div className="space-y-6">
          <p className="text-slate-600">Register your new installation to ensure long-term coverage. Most manufacturers require registration within 60 days of install.</p>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <h5 className="font-bold text-slate-900">Coverage Tiers</h5>
            <div className="flex items-center justify-between text-sm py-2 border-b border-slate-200">
               <span>Compressor / Heat Exchanger</span>
               <span className="font-bold">20 Years</span>
            </div>
            <div className="flex items-center justify-between text-sm py-2 border-b border-slate-200">
               <span>All Other Internal Parts</span>
               <span className="font-bold">10 Years</span>
            </div>
            <div className="flex items-center justify-between text-sm py-2">
               <span>Extreme Air Labor Guarantee</span>
               <span className="font-bold">1-2 Years</span>
            </div>
          </div>
        </div>
      )
    },
    tracking: {
      title: 'Repair Tracking',
      icon: MapPin,
      body: (
        <div className="space-y-6 text-center py-8">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
             <Clock className="w-10 h-10 text-blue-600 animate-pulse" />
          </div>
          <h4 className="text-xl font-bold text-slate-900">Live Technician View</h4>
          <p className="text-slate-500 text-sm">Please enter your 6-digit Service Ticket ID sent via SMS to track your Master Technician in real-time.</p>
          <input type="text" placeholder="e.g. 882100" className="w-full max-w-xs mx-auto px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-center font-black tracking-widest outline-none focus:ring-4 focus:ring-blue-500/10" />
        </div>
      )
    },
    financing: {
      title: 'Financing Options',
      icon: Zap,
      body: (
        <div className="space-y-6">
          <p className="text-slate-600">Don't let a breakdown break the bank. We offer flexible 0% interest terms for qualified GTA residents.</p>
          <div className="grid grid-cols-1 gap-4">
             <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <h5 className="font-bold text-slate-900 mb-1">Comfort Now, Pay Later</h5>
                <p className="text-sm text-slate-500 mb-4">6 Months 0% Interest. Low monthly payments starting at $49/mo.</p>
                <div className="text-[10px] font-black uppercase text-blue-600">OAC - Powered by Financeit</div>
             </div>
             <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <h5 className="font-bold text-slate-900 mb-1">Energy Star Upgrade Loan</h5>
                <p className="text-sm text-slate-500 mb-4">120-Month amortization with zero prepayment penalties.</p>
             </div>
          </div>
        </div>
      )
    },
    'emergency-protocol': {
      title: 'Emergency Protocol',
      icon: ShieldAlert,
      body: (
        <div className="space-y-6">
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 text-sm font-bold flex items-center gap-3">
             <ShieldAlert className="w-5 h-5" /> IMMEDIATE ACTION REQUIRED
          </div>
          <div className="space-y-4">
            <div className="p-5 border border-slate-100 rounded-2xl">
               <h5 className="font-bold text-slate-900 mb-2">If you smell gas (Rotten Eggs):</h5>
               <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-2">
                 <li>Evacuate all persons and pets immediately.</li>
                 <li>Do not touch any electrical switches or use phones inside.</li>
                 <li>Call Enbridge Gas at 1-866-763-5427 from a safe distance.</li>
               </ol>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl">
               <h5 className="font-bold text-slate-900 mb-2">No-Heat / No-Cool Emergency:</h5>
               <p className="text-sm text-slate-600">Call (416) 728-2224. Our night shift dispatchers will prioritize senior residents and households with infants.</p>
            </div>
          </div>
        </div>
      )
    },
    portal: {
      title: 'Member Portal',
      icon: User,
      body: (
        <div className="space-y-6 text-center py-12">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
             <GanttChart className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-slate-900">Client Hub Beta</h4>
          <p className="text-slate-500 text-sm mb-8">Service history, digital invoices, and filter replacement reminders coming Summer 2026.</p>
          <div className="flex flex-col gap-3">
            <button disabled className="w-full py-4 bg-slate-200 text-slate-400 rounded-2xl font-bold cursor-not-allowed">Sign In with OTP</button>
            <button onClick={onClose} className="text-blue-600 font-bold text-sm">Return Home</button>
          </div>
        </div>
      )
    }
  };

  const activeContent = contentMap[page as string] || { title: 'Information', icon: Info, body: 'Content coming soon.' };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500 relative max-h-[90vh] flex flex-col">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <activeContent.icon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-slate-900">{activeContent.title}</h3>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-full transition-colors active:scale-90">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        <div className="p-10 overflow-y-auto custom-scrollbar">
          {activeContent.body}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedProperty, setSelectedProperty] = useState('Residential');
  const [dispatchStatus, setDispatchStatus] = useState<'live' | 'idle'>('live');
  const [activePage, setActivePage] = useState<PageID>(null);
  const [isPricingEstimatorVisible, setIsPricingEstimatorVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timeoutId: number;
    const updateStatus = () => {
      setDispatchStatus(prev => (prev === 'live' ? 'idle' : 'live'));
      const nextDelay = Math.floor(Math.random() * 4500) + 2500;
      timeoutId = window.setTimeout(updateStatus, nextDelay);
    };
    timeoutId = window.setTimeout(updateStatus, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const vibe: VibeContext = useMemo(() => {
    const month = currentTime.getMonth();
    const hour = currentTime.getHours();
    const isHeatingSeason = month <= 3 || month >= 9; 
    
    let timeVibe: VibeContext['time'] = 'day';
    if (hour >= 5 && hour < 11) timeVibe = 'morning';
    else if (hour >= 11 && hour < 17) timeVibe = 'day';
    else if (hour >= 17 && hour < 21) timeVibe = 'evening';
    else timeVibe = 'night';

    const alerts = isHeatingSeason 
      ? ["Cold Weather Alert: Emergency No-Heat Response Active", "Freezing Temperatures: Same-Day Furnace Diagnostics", "Priority Dispatching for GTA North York Seniors"]
      : ["Heatwave Advisory: Instant AC Repair Active", "Extreme Humidity: 24/7 Precision Cooling Dispatch", "Smog Warning: Advanced HEPA Filtration Installs"];

    const currentAlert = alerts[Math.floor((currentTime.getMinutes() / 20) % alerts.length)];

    return {
      season: isHeatingSeason ? 'heating' : 'cooling',
      time: timeVibe,
      alert: currentAlert,
      heroImage: "https://i.ibb.co/R49x6d6d/hunyuan-image-3-0-b-Replace-the-current-1.png",
      themeColor: isHeatingSeason ? 'text-blue-600' : 'text-cyan-600',
      accentGradient: isHeatingSeason 
        ? 'radial-gradient(circle at top right, rgba(0, 86, 179, 0.1), transparent)'
        : 'radial-gradient(circle at top right, rgba(6, 182, 212, 0.1), transparent)'
    };
  }, [currentTime]);

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-blue-600 selection:text-white bg-white">
      <Navbar />
      <PageOverlay page={activePage} onClose={() => setActivePage(null)} />
      <PricingEstimatorWidget visible={isPricingEstimatorVisible} onClose={() => setIsPricingEstimatorVisible(false)} />

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ background: vibe.accentGradient }}></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-xl mb-6 group cursor-default animate-in fade-in slide-in-from-left duration-700">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-900 transition-all duration-500 group-hover:tracking-widest">
                {vibe.alert}
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
              {vibe.season === 'heating' ? (
                <>Toronto's <span className={`${vibe.themeColor} underline decoration-yellow-400 decoration-8 underline-offset-[10px]`}>Warmest</span> Winter Yet.</>
              ) : (
                <>Toronto's <span className={`${vibe.themeColor} underline decoration-yellow-400 decoration-8 underline-offset-[10px]`}>Coolest</span> Summer Yet.</>
              )}
            </h1>
            
            <p className="text-lg text-slate-500 max-w-lg mb-10 leading-relaxed font-medium animate-in fade-in duration-1000 delay-300">
              Professional heating, cooling, and air quality solutions for Toronto homes. Reliable service when you need it most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
              <button onClick={handleCTA} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-3 group">
                {vibe.season === 'heating' ? 'Restore My Heat' : 'Fix My AC Now'} 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setIsPricingEstimatorVisible(true)} className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-100">
                <Calculator className="w-5 h-5 text-blue-500" /> Instant Estimator
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-in fade-in duration-1000 delay-700">
              <TrustIndicator icon={ShieldCheck} label="TSSA Elite" sub="Certified Master #8821" />
              <div className="flex items-center gap-4 py-4 px-6 bg-white/50 rounded-2xl border border-white/20 shadow-sm transition-all hover:scale-105">
                {vibe.time === 'night' ? <Moon className="w-6 h-6 text-indigo-400" /> : <Sun className="w-6 h-6 text-yellow-500" />}
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none mb-1">
                    {vibe.time.charAt(0).toUpperCase() + vibe.time.slice(1)} Shift
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Auto-dispatch live</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-in zoom-in duration-1000 group/hero">
             <div className="relative z-10 bg-gradient-to-br from-slate-200 to-slate-100 rounded-[3.5rem] aspect-square overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white group-hover/hero:shadow-[0_50px_100px_-20px_rgba(0,86,179,0.1)] transition-all duration-700">
                <img src={vibe.heroImage} className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover/hero:scale-105" alt="Extreme Air HVAC Control Center" />
             </div>
             <div className={`absolute -top-16 -right-16 w-80 h-80 ${vibe.season === 'heating' ? 'bg-orange-500/20' : 'bg-blue-600/20'} rounded-full blur-[120px] animate-pulse pointer-events-none`}></div>
             <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            badge="Solutions"
            title="Elite Climate Engineering."
            description="Since 2006, Extreme Air has redefined indoor environments. We don't just fix boxes; we engineer systems for the 2026 efficiency standard."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard icon={Flame} title="Advanced Heating" description="High-efficiency furnace installation and smart boiler repair. We specialize in 98% AFUE systems." badge={vibe.season === 'heating' ? "High Demand" : "Early Bird"} />
            <ServiceCard icon={Wind} title="Precision Cooling" description="AC diagnostic and luxury heat pump integration. Silent, powerful, and ready for Toronto heat." badge={vibe.season === 'cooling' ? "Active Repair" : undefined} />
            <ServiceCard icon={Droplets} title="Modern Hydronics" description="Luxury in-floor heating and tankless water solutions. Experience the ultimate comfort." />
            <ServiceCard icon={Sparkles} title="Pure Air Systems" description="Hospital-grade HEPA and UV-C sterilization. Eliminate 99.9% of bacteria." badge="Best Seller" />
            <ServiceCard icon={Calendar} title="Maintenance Plans" description="Join our 'Comfort First' club for automated health checks and priority dispatching." />
            <div onClick={() => setIsPricingEstimatorVisible(true)} className="bg-blue-600 p-10 rounded-[2rem] text-white flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 hover:scale-[1.02]">
               <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <Calculator className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-bold mb-4">Live Price Guide</h3>
               <p className="text-blue-100 mb-8 font-medium text-sm leading-relaxed">Instantly see current market rates for residential repairs across the GTA.</p>
               <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-lg active:scale-95">Check Estimates</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative group bg-white">
                <img src="https://i.ibb.co/MyPjLx2D/gpt-image-1-5-a-A-professional-high.png" className="w-full h-full object-cover transition-all duration-700 hover:scale-105" alt="Extreme Air Professional Customer Service" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl">
                   <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">18</div>
                      <div className="text-sm font-bold text-slate-900 uppercase tracking-widest">Years of Excellence</div>
                   </div>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed italic">"Our mission is to provide exceptional HVAC solutions that exceed customer expectations every time."</p>
                </div>
             </div>
          </div>
          <div>
            <SectionHeader badge="Our Story" title="Legacy Meets Tomorrow." description="Founded in Toronto in 2006, Extreme Air began with a simple promise: better service through better engineering." />
            <div className="space-y-8">
              {[
                { icon: ShieldCheck, title: "Uncompromising Trust", text: "Every technician is TSSA licensed, fully insured, and background-checked." },
                { 
                  icon: Activity, 
                  title: "Response Intelligence", 
                  status: true,
                  text: "Our proprietary AI-dispatch system routes the nearest expert to your door." 
                },
                { icon: TrendingUp, title: "Market Transparency", text: "We provide live, automated cost estimations before you even book a call." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      {item.status && (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-700 ${dispatchStatus === 'live' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-100' : 'bg-slate-100 text-slate-400 border border-slate-200 scale-95 opacity-50 grayscale'}`}>
                           <div className="relative flex items-center justify-center w-2 h-2">
                             {dispatchStatus === 'live' && <span className="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75"></span>}
                             <span className={`relative w-2 h-2 rounded-full ${dispatchStatus === 'live' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-slate-300'}`}></span>
                           </div>
                           {dispatchStatus === 'live' ? 'Live Dispatching' : 'System Idle'}
                        </div>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section id="emergency" className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 animate-pulse">
            <ShieldAlert className="w-3 h-3" /> 24/7 Rapid Response Active
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">Toronto's Zero-Wait <br /> <span className="text-red-500">Emergency</span> Dispatch.</h2>
          <a href="tel:4167282224" className="inline-flex items-center gap-4 px-10 py-6 bg-red-600 rounded-2xl font-black text-2xl shadow-xl hover:bg-red-700 hover:scale-105 transition-all mt-8">
            <Phone className="w-8 h-8" /> (416) 728-2224
          </a>
        </div>
      </section>

      {/* Service Area Domain Section */}
      <section id="service-area" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Coverage" title="Our Service Domain." description="Extreme Air operates a fleet of master technicians strategically stationed across the Greater Toronto Area." />
          <GTAInteractiveMap />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-40 bg-slate-50 relative overflow-hidden px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl lg:text-7xl font-black tracking-tighter mb-8 leading-tight text-slate-900">Get Your <span className="text-blue-600">Smart Estimate.</span></h2>
          <div className="bg-white border border-slate-200 p-8 lg:p-16 rounded-[4rem] shadow-2xl text-left relative overflow-hidden">
             <form action="https://formspree.io/f/mreepwpd" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <input type="hidden" name="propertyType" value={selectedProperty} />
               <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Name</label>
                 <input required name="name" type="text" placeholder="John Doe" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold" />
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Phone Number</label>
                 <input required name="phone" type="tel" placeholder="(416) 000-0000" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold" />
               </div>
               <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Primary Need</label>
                  <select name="need" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold appearance-none">
                    <option>Select Option</option>
                    <option>Emergency Furnace Repair</option>
                    <option>AC Installation</option>
                    <option>Air Purification</option>
                    <option>Maintenance Plan</option>
                  </select>
               </div>
               <div className="md:col-span-2 pt-6">
                 <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xl hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-slate-900/30">
                    Submit Request
                 </button>
               </div>
             </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-24 pb-12 text-slate-400 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20"><Thermometer className="w-6 h-6" /></div>
                <span className="text-2xl font-black text-white tracking-tighter">EXTREME AIR</span>
              </div>
              <p className="text-sm leading-relaxed font-medium">Toronto's elite climate engineering firm. Providing precision heating, luxury cooling, and high-performance solutions across the GTA since 2006.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">Advanced Solutions</h4>
              <ul className="space-y-4">
                {['Furnace Engineering', 'Heat Pump Conversion', 'IAQ & Sterilization', 'Luxury Hydronics', 'Commercial HVAC', 'Custom Ductwork'].map((link) => (
                  <li key={link}>
                    <a href="#services" onClick={(e) => handleGlobalLinkClick(e, '#services')} className="text-sm font-semibold hover:text-blue-500 transition-colors flex items-center justify-between group">
                      {link} <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">Client Support</h4>
              <ul className="space-y-4">
                {[
                  { id: 'rebates', label: 'Ontario Rebate Guide', icon: Sparkles },
                  { id: 'warranty', label: 'Warranty Registration', icon: CheckCircle2 },
                  { id: 'tracking', label: 'Repair Tracking', icon: MapPin },
                  { id: 'financing', label: 'Financing Options', icon: Zap },
                  { id: 'emergency-protocol', label: 'Emergency Protocol', icon: ShieldAlert },
                  { id: 'portal', label: 'Member Portal', icon: User }
                ].map((link) => (
                  <li key={link.label}>
                    <button onClick={() => setActivePage(link.id as PageID)} className="text-sm font-semibold hover:text-blue-500 transition-colors flex items-center gap-2 group text-left">
                      <link.icon className="w-4 h-4 text-slate-600 group-hover:text-blue-500 transition-colors" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">HQ Status</h4>
              <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  <p className="text-sm font-bold text-slate-300">1200 Sheppard Ave E, <br />North York, ON M2K 2S5</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-500" />
                  <a href="tel:4167282224" className="text-sm font-black text-white">(416) 728-2224</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
              <button onClick={() => setActivePage('privacy')} className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"><Scale className="w-3 h-3" /> Privacy Policy</button>
              <button onClick={() => setActivePage('terms')} className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"><FileText className="w-3 h-3" /> Terms of Service</button>
              <button onClick={() => setActivePage('tssa')} className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"><ShieldHalf className="w-3 h-3" /> TSSA Compliance</button>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Network Secure</span>
               </div>
               <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-3 bg-white text-slate-900 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-90"><ArrowUp className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">&copy; 2026 Extreme Air Heating & Cooling. TSSA #8821.</p>
          </div>
        </div>
      </footer>

      {/* ElevenLabs Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <ElevenLabsConvai agent-id="agent_5801kf7b11q4ec7vrnpht15b9gqf"></ElevenLabsConvai>
      </div>
    </div>
  );
};

export default App;