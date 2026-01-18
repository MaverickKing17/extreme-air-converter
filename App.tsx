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
  ChevronDown
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

// --- Shared Utilities ---

const handleGlobalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, closeMobileMenu?: () => void) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    if (closeMobileMenu) closeMobileMenu();
  }
};

// --- Components ---

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
    { name: 'Locations', href: '#locations' },
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

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedProperty, setSelectedProperty] = useState('Residential');
  const [dispatchStatus, setDispatchStatus] = useState<'live' | 'idle'>('live');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Dispatch Status Dynamic Indicator Logic
  useEffect(() => {
    let timeoutId: number;
    const updateStatus = () => {
      setDispatchStatus(prev => (prev === 'live' ? 'idle' : 'live'));
      // Random interval between 2.5 and 7 seconds
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
              <button onClick={handleCTA} className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-100">
                <Sparkles className="w-5 h-5 text-blue-500" /> Instant Quote
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
            <div className="bg-blue-600 p-10 rounded-[2rem] text-white flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 hover:scale-[1.02]">
               <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <Wrench className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-bold mb-4">Request Master Tech</h3>
               <p className="text-blue-100 mb-8 font-medium text-sm leading-relaxed">Highly rated technicians currently stationed in Etobicoke, North York, and Scarborough.</p>
               <button onClick={handleCTA} className="w-full py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-lg active:scale-95">Check Live Map</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative group bg-white">
                <img 
                  src="https://i.ibb.co/MyPjLx2D/gpt-image-1-5-a-A-professional-high.png" 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105" 
                  alt="Extreme Air Professional Customer Service" 
                />
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
                { icon: Zap, title: "Response Intelligence", text: "Our proprietary AI-dispatch system routes the nearest expert to your door." },
                { icon: Star, title: "Results-Only Billing", text: "We quote upfront. No hidden fees, no hourly surprises." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      {item.title === "Response Intelligence" && (
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-500 ${dispatchStatus === 'live' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${dispatchStatus === 'live' ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-400'}`}></span>
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

      <footer className="bg-slate-950 pt-24 pb-12 text-slate-400 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Thermometer className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">EXTREME AIR</span>
           </div>
           <p className="text-xs">&copy; 2026 Extreme Air Heating & Cooling. All Rights Reserved.</p>
        </div>
      </footer>

      {/* ElevenLabs AI Receptionist Widget Integration */}
      <div className="fixed bottom-6 right-6 z-50">
        <ElevenLabsConvai agent-id="agent_5801kf7b11q4ec7vrnpht15b9gqf"></ElevenLabsConvai>
      </div>
    </div>
  );
};

export default App;