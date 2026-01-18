
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  ShieldCheck, 
  Clock, 
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
  <div className="bento-card bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between h-full group hover:bg-white hover:border-blue-200 cursor-default">
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
            <span className="text-xl font-black tracking-tighter block leading-none transition-colors group-hover:text-blue-600">EXTREME AIR</span>
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
      
      {/* Mobile Menu */}
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

const TrustIndicator = ({ icon: Icon, label, sub }: any) => (
  <div className="flex items-center gap-4 py-4 px-6 bg-white/50 rounded-2xl border border-white/20 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:shadow-md cursor-default">
    <Icon className="w-6 h-6 text-blue-600" />
    <div>
      <div className="text-sm font-bold leading-none mb-1 text-slate-900">{label}</div>
      <div className="text-xs text-slate-500 font-medium">{sub}</div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedProperty, setSelectedProperty] = useState('Residential');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
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
      heroImage: isHeatingSeason 
        ? "https://images.unsplash.com/photo-1615873966507-7bc281898708?auto=format&fit=crop&q=80&w=1200" 
        : "https://images.unsplash.com/photo-1581094288338-2314dddb7e8c?auto=format&fit=crop&q=80&w=1200",
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
              {vibe.time === 'morning' && "Waking up to a home comfort crisis? Our technicians are already on the 401. Your warmth is our priority."}
              {vibe.time === 'day' && "Don't let Toronto's mood-swing weather disrupt your flow. Experience 2026 climate engineering today."}
              {vibe.time === 'evening' && "Settle in for a perfect evening. If your system falters, our emergency crew is 15 minutes away."}
              {vibe.time === 'night' && "Late night HVAC emergency? Speak to Alex, our AI Receptionist, for immediate dispatch."}
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
          
          <div className="relative animate-in zoom-in duration-1000">
             <div className="relative z-10 bg-gradient-to-br from-slate-200 to-slate-100 rounded-[3rem] aspect-square overflow-hidden shadow-2xl border-8 border-white group">
                <img src={vibe.heroImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110" alt="HVAC Tech" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/95 backdrop-blur rounded-3xl border border-white shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${vibe.season === 'heating' ? 'bg-orange-500' : 'bg-cyan-500'} rounded-full flex items-center justify-center text-white shadow-lg`}>
                      {vibe.season === 'heating' ? <Flame className="w-6 h-6" /> : <Wind className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Current Status: GTA Active</div>
                      <div className="text-xs text-slate-500">Dispatching in North York & Etobicoke</div>
                    </div>
                  </div>
                </div>
             </div>
             <div className={`absolute -top-10 -right-10 w-48 h-48 ${vibe.season === 'heating' ? 'bg-orange-400/20' : 'bg-cyan-400/20'} rounded-full blur-[80px] animate-pulse`}></div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px]"></div>
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
            <ServiceCard 
              icon={Flame} 
              title="Advanced Heating" 
              description="High-efficiency furnace installation and smart boiler repair. We specialize in 98% AFUE systems that lower bills by 40%." 
              badge={vibe.season === 'heating' ? "High Demand" : "Early Bird"}
            />
            <ServiceCard 
              icon={Wind} 
              title="Precision Cooling" 
              description="AC diagnostic and luxury heat pump integration. Silent, powerful, and ready for Toronto's hottest humidity spikes." 
              badge={vibe.season === 'cooling' ? "Active Repair" : undefined}
            />
            <ServiceCard 
              icon={Droplets} 
              title="Modern Hydronics" 
              description="Luxury in-floor heating and tankless water solutions. Experience the ultimate comfort of silent radiant heat." 
            />
            <ServiceCard 
              icon={Sparkles} 
              title="Pure Air Systems" 
              description="Hospital-grade HEPA and UV-C sterilization. Eliminate 99.9% of bacteria, allergens, and airborne particulates." 
              badge="Best Seller"
            />
            <ServiceCard 
              icon={Calendar} 
              title="Maintenance Plans" 
              description="Join our 'Comfort First' club for automated health checks, priority dispatching, and zero diagnostic fees." 
            />
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
             <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt="Tech at work" />
                <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px]"></div>
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur rounded-3xl border border-white/50 shadow-xl">
                   <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">18</div>
                      <div className="text-sm font-bold text-slate-900 uppercase tracking-widest">Years of Excellence</div>
                   </div>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed italic">"Our mission is to provide exceptional HVAC solutions that exceed customer expectations every time."</p>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 bg-yellow-400 p-8 rounded-3xl shadow-xl hidden md:block border-4 border-white animate-in slide-in-from-right duration-1000 delay-300">
                <div className="text-4xl font-black text-slate-900 leading-none">4.9/5</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-800 mt-1">Google Rating</div>
             </div>
          </div>
          <div>
            <SectionHeader 
              badge="Our Story"
              title="Legacy Meets Tomorrow."
              description="Founded in Toronto in 2006, Extreme Air began with a single truck and a simple promise: better service through better engineering. Today, we are Toronto's first AI-enabled HVAC provider."
            />
            <div className="space-y-8">
              {[
                { icon: ShieldCheck, title: "Uncompromising Trust", text: "Every technician is TSSA licensed, fully insured, and background-checked for your peace of mind." },
                { icon: Zap, title: "Response Intelligence", text: "Our proprietary AI-dispatch system routes the nearest expert to your door, slashing wait times by 60% compared to industry averages." },
                { icon: Star, title: "Results-Only Billing", text: "We quote upfront. No hidden fees, no hourly surprises. You pay for the solution, not the clock." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleCTA} className="mt-12 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-2 group shadow-xl shadow-slate-900/20">
               Our Detailed Mission <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section id="emergency" className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 animate-pulse shadow-lg shadow-red-900/40">
              <ShieldAlert className="w-3 h-3" /> 24/7 Rapid Response Active
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">Toronto's Zero-Wait <br /> <span className="text-red-500">Emergency</span> Dispatch.</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">The coldest nights demand the fastest experts. We specialize in winter no-heat emergencies and critical summer cooling failure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center backdrop-blur-md hover:bg-white/[0.08] transition-all duration-500 group">
               <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-red-900/20">
                  <Phone className="w-8 h-8 text-red-500" />
               </div>
               <h3 className="text-2xl font-bold mb-4">Immediate Call</h3>
               <p className="text-slate-400 text-sm mb-8">Talk to a human dispatcher in under 30 seconds, guaranteed.</p>
               <a href="tel:4167282224" className="block py-4 bg-red-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-red-900/40">Call (416) 728-2224</a>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center backdrop-blur-md relative overflow-hidden group hover:bg-white/[0.08] transition-all duration-500">
               <div className="absolute top-0 right-0 p-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
               </div>
               <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/20">
                  <Sparkles className="w-8 h-8 text-blue-500" />
               </div>
               <h3 className="text-2xl font-bold mb-4">AI Dispatch "Alex"</h3>
               <p className="text-slate-400 text-sm mb-8">Automated diagnosis & dispatch via ElevenLabs AI Receptionist.</p>
               <button onClick={handleCTA} className="w-full py-4 bg-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-blue-900/40">Talk to AI Agent</button>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center backdrop-blur-md hover:bg-white/[0.08] transition-all duration-500 group">
               <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-900/20">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
               </div>
               <h3 className="text-2xl font-bold mb-4">No-Heat Guarantee</h3>
               <p className="text-slate-400 text-sm mb-8">If we can't fix your furnace on night one, we provide temporary heat free.</p>
               <button onClick={handleCTA} className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-[0.97]">View Coverage Area</button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeader 
                badge="Service Reach"
                title="Your Local Experts."
                description="We cover the entire GTA with strategically placed hubs. Our technicians live in your neighborhoods, ensuring the fastest response times in Ontario."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { city: "North York", area: "Central Hub", postal: "M2N, M3H, M4A" },
                  { city: "Etobicoke", area: "West Hub", postal: "M8V, M9C, M9B" },
                  { city: "Scarborough", area: "East Hub", postal: "M1B, M1E, M1K" },
                  { city: "Downtown", area: "City Hub", postal: "M5V, M5A, M5R" },
                  { city: "Mississauga", area: "Extended Reach", postal: "L4X, L5G, L5H" },
                  { city: "Vaughan", area: "North Division", postal: "L4L, L4K, L6A" }
                ].map((loc, i) => (
                  <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-blue-600 hover:bg-white hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 cursor-default">
                    <div className="flex items-center gap-3 mb-2">
                       <MapPin className="w-5 h-5 text-blue-600 group-hover:animate-bounce" />
                       <h4 className="font-black text-slate-900">{loc.city}</h4>
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{loc.area}</div>
                    <div className="text-[10px] text-slate-500 font-medium group-hover:text-blue-600 transition-colors">Serving Postals: {loc.postal}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square bg-slate-100 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl group">
               <img src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt="Toronto Cityscape" />
               <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-all duration-700"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white animate-bounce shadow-2xl shadow-blue-600/40 border-4 border-white">
                     <MapPin className="w-10 h-10" />
                  </div>
               </div>
               <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/95 backdrop-blur rounded-3xl border border-white shadow-xl transition-transform group-hover:-translate-y-2">
                  <div className="text-sm font-bold text-slate-900 mb-1">Live Map Update</div>
                  <div className="text-xs text-slate-500 font-medium">12 Units currently active in Etobicoke & Mississauga.</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section - Refined for Demo */}
      <section id="contact" className="py-24 lg:py-40 bg-slate-50 relative overflow-hidden">
        {/* Visual accents for background */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex p-4 bg-white rounded-2xl mb-8 shadow-xl border border-slate-100 animate-in fade-in slide-in-from-bottom duration-700">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl lg:text-7xl font-black tracking-tighter mb-8 leading-tight text-slate-900 animate-in fade-in slide-in-from-bottom duration-1000">
            Get Your <span className="text-blue-600">Smart Estimate.</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-500 mb-16 font-medium max-w-2xl mx-auto leading-relaxed">
            Experience the precision of 2026 HVAC diagnostics. Join 15,000+ GTA homeowners who trust our data-driven estimations.
          </p>
          
          <div className="bg-white border border-slate-200 p-8 lg:p-16 rounded-[4rem] shadow-2xl text-left relative overflow-hidden group/form transition-all duration-700 hover:shadow-blue-500/5">
             <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/[0.03] blur-[100px] pointer-events-none transition-all group-hover/form:bg-blue-600/[0.07]"></div>
             
             <form className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("AI Quote Generating... Please check your email in 30 seconds!"); }}>
               {/* Inputs */}
               <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 flex items-center gap-2">
                   <User className="w-3 h-3" /> Full Name
                 </label>
                 <div className="relative group/input">
                    <input required type="text" placeholder="John Doe" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-300 shadow-sm" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                 </div>
               </div>

               <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 flex items-center gap-2">
                   <Phone className="w-3 h-3" /> Phone Number
                 </label>
                 <div className="relative">
                    <input required type="tel" placeholder="(416) 000-0000" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-300 shadow-sm" />
                 </div>
               </div>

               {/* Property Selector - Refined */}
               <div className="space-y-5 md:col-span-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 flex items-center gap-2">
                   <Home className="w-3 h-3" /> Property Type
                 </label>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { name: 'Residential', icon: Home },
                      { name: 'Commercial', icon: Building2 },
                      { name: 'Industrial', icon: Factory }
                    ].map(type => (
                      <button 
                        type="button" 
                        key={type.name} 
                        onClick={() => setSelectedProperty(type.name)}
                        className={`py-6 px-4 rounded-[2rem] text-sm font-bold flex flex-col items-center gap-3 transition-all duration-300 border-2 active:scale-95 ${
                          selectedProperty === type.name 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20 translate-y-[-4px]' 
                          : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:bg-slate-50 hover:translate-y-[-2px]'
                        }`}
                      >
                        <type.icon className={`w-6 h-6 ${selectedProperty === type.name ? 'text-yellow-400' : 'text-slate-400'}`} />
                        {type.name}
                      </button>
                    ))}
                 </div>
               </div>

               {/* Primary Need */}
               <div className="space-y-3 md:col-span-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 flex items-center gap-2">
                   <Wrench className="w-3 h-3" /> Primary Need
                 </label>
                 <div className="relative group/select">
                    <select className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all font-semibold appearance-none text-slate-900 shadow-sm cursor-pointer">
                        <option>Select Option</option>
                        <option>Emergency Furnace Repair</option>
                        <option>AC Installation & Optimization</option>
                        <option>Smart Air Quality / Purification</option>
                        <option>Hydronic / Radiant Heating</option>
                        <option>Energy Efficiency Audit</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none group-hover/select:translate-y-1 transition-transform">
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </div>
                 </div>
               </div>

               {/* Big Submit Button */}
               <div className="md:col-span-2 pt-6">
                 <button className="w-full group/btn relative py-6 bg-slate-900 text-white rounded-3xl font-black text-xl hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl shadow-slate-900/30 overflow-hidden">
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                    <span className="flex items-center justify-center gap-3 relative z-10">
                      Analyze My Request <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    </span>
                 </button>
                 <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">
                    <span className="text-emerald-500">Secure Protocol</span> • AI Estimate Engine v4.2
                 </p>
               </div>
             </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-24 pb-12 text-slate-400 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div>
             <a href="#hero" onClick={(e) => handleGlobalLinkClick(e, '#hero')} className="flex items-center gap-3 mb-8 group">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-600/20">
                  <Thermometer className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter transition-colors group-hover:text-blue-500">EXTREME AIR</span>
             </a>
             <p className="text-sm leading-relaxed mb-8 opacity-70 group hover:opacity-100 transition-opacity">Toronto's elite climate engineering service since 2006. Leveraging next-generation technology to ensure every home in the GTA experiences perfect indoor comfort.</p>
             <div className="flex gap-4">
                {[Phone, MapPin, Mail].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-500 cursor-pointer group shadow-sm hover:scale-110 active:scale-90">
                    <Icon className="w-5 h-5 text-white transition-transform group-hover:rotate-12" />
                  </div>
                ))}
             </div>
          </div>
          
          <div>
             <h4 className="text-white font-bold mb-10 uppercase tracking-[0.2em] text-xs">Navigation</h4>
             <ul className="space-y-5 text-sm font-medium">
                {['Services', 'About', 'Emergency', 'Locations', 'Contact'].map((item) => (
                   <li key={item}>
                     <a 
                      href={`#${item.toLowerCase()}`} 
                      onClick={(e) => handleGlobalLinkClick(e, `#${item.toLowerCase()}`)} 
                      className="hover:text-blue-400 transition-all flex items-center gap-2 group"
                     >
                       <span className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></span>
                       {item === 'Services' ? 'Elite Services' : item === 'About' ? 'Our History' : item === 'Emergency' ? 'Emergency Dispatch' : item === 'Locations' ? 'Service Hubs' : 'Smart Quote'}
                     </a>
                   </li>
                ))}
             </ul>
          </div>
          
          <div>
             <h4 className="text-white font-bold mb-10 uppercase tracking-[0.2em] text-xs">Specialized Hubs</h4>
             <ul className="space-y-5 text-sm font-medium">
                {["Central North York", "Greater Etobicoke", "Scarborough East", "Downtown Core", "Mississauga West"].map(hub => (
                  <li key={hub}>
                    <a href="#locations" onClick={(e) => handleGlobalLinkClick(e, '#locations')} className="hover:text-blue-400 transition-all flex items-center gap-2 group">
                      <MapPin className="w-3 h-3 text-slate-800 group-hover:text-blue-500 transition-colors" />
                      {hub}
                    </a>
                  </li>
                ))}
             </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-10 uppercase tracking-[0.2em] text-xs">Emergency Response</h4>
             <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group hover:border-red-600/30 transition-all duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[40px] group-hover:bg-red-600/20 transition-all duration-700"></div>
                <div className="text-2xl font-black text-white mb-3 underline decoration-red-600 decoration-4 tracking-tighter transition-all group-hover:scale-105 active:scale-95 cursor-pointer" onClick={() => window.location.href='tel:4167282224'}>(416) 728-2224</div>
                <p className="text-[10px] uppercase font-black tracking-widest text-red-500 mb-6 animate-pulse">Dispatch Live Across GTA</p>
                <button onClick={() => window.location.href='tel:4167282224'} className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl text-xs font-black transition-all border border-white/10 hover:shadow-xl hover:shadow-white/10 active:scale-95">Call Master Agent</button>
             </div>
             <p className="mt-8 text-[9px] text-slate-600 leading-relaxed uppercase tracking-[0.2em] font-black">TSSA License #7721-0021-99 • HRAI Member</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
           <div className="hover:text-slate-400 transition-colors cursor-default">&copy; 2026 Extreme Air Heating & Cooling. Engineered in Toronto.</div>
           <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-all">Terms</a>
              <a href="#" className="hover:text-white transition-all">Privacy</a>
              <a href="#" className="hover:text-white transition-all">Sustainability</a>
           </div>
        </div>
      </footer>

      {/* ElevenLabs Floating Agent Button - Demo Enhanced */}
      <div id="ai-agent-trigger">
        <button 
          onClick={() => alert("ElevenLabs AI Receptionist Widget Opening... (Agent ID: ExtremeAir_Alex_2026)")}
          className="w-20 h-20 bg-blue-600 text-white rounded-[1.75rem] shadow-3xl shadow-blue-600/40 flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-500 group relative border-4 border-white/30 hover:rotate-6"
        >
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full shadow-lg z-20"></div>
          <div className="absolute inset-0 bg-white/20 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity blur-lg group-hover:animate-pulse"></div>
          <Sparkles className="w-9 h-9 group-hover:scale-110 transition-transform duration-500 relative z-10" />
          
          {/* Tooltip refined */}
          <div className="absolute bottom-full right-0 mb-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <div className="bg-white text-slate-900 px-6 py-4 rounded-[2rem] text-xs font-black whitespace-nowrap shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 relative">
               Speak to Alex, AI Receptionist
               <div className="text-[10px] text-blue-600 font-bold mt-2 flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 READY FOR DISPATCH
               </div>
               {/* Arrow */}
               <div className="absolute top-full right-8 w-4 h-4 bg-white rotate-45 -translate-y-1/2 border-b border-r border-slate-100"></div>
            </div>
          </div>
        </button>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default App;
