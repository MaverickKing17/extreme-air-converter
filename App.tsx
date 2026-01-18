
import React, { useState, useEffect } from 'react';
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
  Mail
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass-nav' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
             <div className="w-10 h-10 bg-blue-600 rounded-xl rotate-12 flex items-center justify-center shadow-lg">
                <Thermometer className="text-white w-6 h-6 -rotate-12" />
             </div>
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter block leading-none">EXTREME AIR</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Heating & Cooling</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Services', 'About', 'Emergency', 'Locations'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold hover:text-blue-600 transition-colors">{item}</a>
          ))}
          <a href="tel:4167282224" className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/10">
            <Phone className="w-4 h-4" />
            (416) 728-2224
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white p-6 border-b shadow-2xl flex flex-col gap-4 md:hidden">
          <a href="#" className="font-bold py-2 border-b">Services</a>
          <a href="#" className="font-bold py-2 border-b">Emergency</a>
          <a href="#" className="font-bold py-2 border-b">Book Appointment</a>
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold">Call Now</button>
            <button className="w-full py-4 bg-yellow-400 text-slate-900 rounded-xl font-bold">Request Quote</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, description, badge }: any) => (
  <div className="bento-card bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between h-full group">
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon className="w-7 h-7" />
        </div>
        {badge && <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-yellow-400 rounded-md">{badge}</span>}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>
    </div>
    <button className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-4 transition-all">
      View Solutions <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

const TrustIndicator = ({ icon: Icon, label, sub }: any) => (
  <div className="flex items-center gap-4 py-4 px-6 bg-white/50 rounded-2xl border border-white/20">
    <Icon className="w-6 h-6 text-blue-600" />
    <div>
      <div className="text-sm font-bold leading-none mb-1">{label}</div>
      <div className="text-xs text-slate-500 font-medium">{sub}</div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6 animate-bounce">
              <Zap className="w-3 h-3 fill-current" /> 24/7 Emergency Dispatch
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
              Toronto's <br />
              <span className="text-blue-600 underline decoration-yellow-400 decoration-8 underline-offset-[10px]">Smartest</span> HVAC <br />
              Solutions.
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mb-10 leading-relaxed font-medium">
              Experience the next generation of climate control. We don't just fix furnaces—we optimize your home's ecosystem for 2026 performance levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-3">
                Book Fast Service <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                Instant AI Quote
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <TrustIndicator icon={ShieldCheck} label="Certified Pro" sub="HRAI & TSSA Approved" />
              <TrustIndicator icon={Star} label="4.9/5 Rating" sub="2,000+ GTA Reviews" />
            </div>
          </div>
          
          {/* Visual Hero Element */}
          <div className="relative">
             <div className="relative z-10 bg-gradient-to-br from-slate-200 to-slate-100 rounded-[3rem] aspect-square overflow-hidden shadow-2xl border-8 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1581094288338-2314dddb7e8c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern HVAC Installation"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/90 backdrop-blur rounded-3xl border border-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">98%</div>
                    <div>
                      <div className="text-sm font-bold">Efficiency Guaranteed</div>
                      <div className="text-xs text-slate-500">Industry-leading performance standards.</div>
                    </div>
                  </div>
                </div>
             </div>
             {/* Dynamic background shapes */}
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-[100px]"></div>
             <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8 text-white">
          <div className="flex flex-col">
            <span className="text-4xl font-black text-blue-400">15k+</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Homes Optimized</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-black text-yellow-400">120min</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Avg Response Time</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-black text-white">2006</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Established Toronto</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-black text-emerald-400">GTA</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Primary Coverage</span>
          </div>
        </div>
      </section>

      {/* Services Grid (Bento Style) */}
      <section id="services" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">Elite Climate <br /> Engineering.</h2>
              <p className="text-slate-500 font-medium">From emergency winter no-heat calls to luxury air purification systems, our Toronto team handles the complex so you stay comfortable.</p>
            </div>
            <button className="px-8 py-4 bg-slate-50 rounded-2xl font-bold border border-slate-200 hover:border-blue-600 transition-all flex items-center gap-2">
              Browse All Services <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              icon={Flame} 
              title="Advanced Heating" 
              description="Furnace installation, repair, and smart boiler integration for Toronto's harshest winters." 
              badge="High Efficiency"
            />
            <ServiceCard 
              icon={Wind} 
              title="Precision Cooling" 
              description="Central AC and ductless heat pumps designed for 2026 climate sustainability." 
            />
            <ServiceCard 
              icon={Droplets} 
              title="Hydronic Systems" 
              description="Luxury in-floor heating and tankless water solutions for modern custom homes." 
            />
            <ServiceCard 
              icon={Sparkles} 
              title="Air Purification" 
              description="HEPA filtration and UV sterilization that captures 99.9% of airborne pathogens." 
              badge="New for 2026"
            />
            <ServiceCard 
              icon={Clock} 
              title="Protection Plans" 
              description="Automated diagnostic monitoring and priority 24/7 emergency dispatch." 
            />
            <div className="bg-blue-600 p-8 rounded-[2rem] text-white flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-blue-700 transition-all">
               <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-bold mb-4">Request a Site Visit</h3>
               <p className="text-blue-100 mb-8 font-medium">Our master technicians are currently in Etobicoke & North York.</p>
               <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-bold shadow-xl shadow-blue-900/20">Check Availability</button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-24 lg:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
             <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px]"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-all">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <ArrowRight className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
             </div>
          </div>
          <div>
            <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-4 block">Our Standard</span>
            <h2 className="text-4xl lg:text-5xl font-black mb-8 tracking-tight">Legacy Engineering Meet AI Precision.</h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Uncompromising Trust</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">We've built our reputation since 2006 on radical transparency and master-level craftsmanship.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Responsive Intelligence</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Our dispatch AI ensures technicians are routed based on expertise and proximity, slashing wait times by 40%.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Outcome Guaranteed</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">If you aren't completely satisfied with your home's performance, we don't leave until it's perfect.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex p-3 bg-yellow-400/10 rounded-2xl mb-8">
            <MessageCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-tight">Get Your Smart Quote.</h2>
          <p className="text-lg text-slate-500 mb-12 font-medium">Answer 3 simple questions and our AI will calculate a precise estimate for your project.</p>
          
          <div className="bg-slate-50 border border-slate-200 p-8 lg:p-12 rounded-[3rem] shadow-2xl text-left relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px]"></div>
             <form className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                 <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                 <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
               </div>
               <div className="space-y-2 md:col-span-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Service Needed</label>
                 <select className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium appearance-none">
                    <option>Select Option</option>
                    <option>Emergency Repair</option>
                    <option>New Installation</option>
                    <option>Annual Maintenance</option>
                    <option>Air Purification</option>
                 </select>
               </div>
               <div className="md:col-span-2">
                 <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all text-lg shadow-xl shadow-slate-900/20">
                    Generate My Estimate
                 </button>
               </div>
             </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-20 pb-10 text-slate-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div>
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Thermometer className="w-5 h-5" />
                </div>
                <span className="text-xl font-black text-white tracking-tighter">EXTREME AIR</span>
             </div>
             <p className="text-sm leading-relaxed mb-6">Redefining indoor comfort through engineering excellence and AI-driven efficiency across the Greater Toronto Area.</p>
             <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-white" />
                </div>
             </div>
          </div>
          
          <div>
             <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Solutions</h4>
             <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Residential Heating</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Smart Cooling Systems</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Industrial HVAC</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Air Filtration</a></li>
             </ul>
          </div>
          
          <div>
             <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Service Areas</h4>
             <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Toronto Central</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Etobicoke & West</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">North York & GTA</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Mississauga</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Emergency Support</h4>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <div className="text-xl font-black text-white mb-2 underline decoration-yellow-400 decoration-2">(416) 728-2224</div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Available 24/7/365</p>
                <button className="w-full mt-4 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">Text For Dispatch</button>
             </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
           <div>&copy; 2026 Extreme Air Heating & Cooling. Master HVAC Framework.</div>
           <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Eco-Sustainability Report</a>
           </div>
        </div>
      </footer>

      {/* ElevenLabs Floating Trigger Placeholder */}
      <div id="ai-agent-trigger">
        <button className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-3xl shadow-blue-600/40 flex items-center justify-center hover:scale-110 transition-all active:scale-95 group relative">
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
          <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <div className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-slate-100 pointer-events-none">
            Speak to Alex, our AI Receptionist
          </div>
        </button>
      </div>
    </div>
  );
};

export default App;
