import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Camera, 
  MapPin, 
  CheckCircle, 
  Sparkles, 
  Map as MapIcon, 
  Clock, 
  ThumbsUp, 
  Trophy, 
  Github, 
  Twitter, 
  Globe, 
  Mail,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';

const Landing = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Camera,
      title: "Snap a Photo",
      description: "Capture any public maintenance issue with your smartphone camera instantly."
    },
    {
      icon: MapPin,
      title: "It Gets Reported & Mapped",
      description: "Our AI tags the location and categorizes the report for the correct department."
    },
    {
      icon: CheckCircle,
      title: "Authority Resolves It",
      description: "Track the status in real-time as local officials dispatch a team and close the ticket."
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "GPS Auto-Tagging",
      description: "Automatic precision coordinates added to every photo for foolproof dispatching."
    },
    {
      icon: Sparkles,
      title: "AI Categorization",
      description: "Our smart vision system identifies the problem type instantly."
    },
    {
      icon: MapIcon,
      title: "Live Public Map",
      description: "Full transparency with a real-time dashboard of all active reports city-wide."
    },
    {
      icon: Clock,
      title: "SLA Tracking",
      description: "Hold authorities accountable with public timelines for every ticket category."
    },
    {
      icon: ThumbsUp,
      title: "Upvoting & Comments",
      description: "Community-driven prioritization. Higher votes get faster attention."
    },
    {
      icon: Trophy,
      title: "Badges & Leaderboard",
      description: "Get recognized for your civic contributions and active reporting."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-light text-indigo text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo"></span>
              </span>
              Trusted by 240+ Wards
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
              One Photo. One Report. <br/>
              <span className="text-indigo">Real Accountability.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed">
              Snap a photo of a civic problem and watch your city respond. 
              CivicSnap bridges the gap between citizens and local authorities through instant digital verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                className="px-8 py-4 text-lg flex items-center justify-center gap-2 group"
                onClick={() => navigate('/auth')}
              >
                <Camera size={20} />
                Report an Issue
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="secondary" 
                className="px-8 py-4 text-lg flex items-center justify-center gap-2"
                onClick={() => navigate('/map')}
              >
                <MapIcon size={20} />
                See Live Map
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald/5 rounded-full blur-3xl"></div>
            
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-slate-50 rounded-2xl h-[400px] w-full overflow-hidden relative border border-slate-100 flex flex-col">
                <div className="p-4 bg-white border-b flex justify-between items-center">
                   <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-danger/20"></div>
                      <div className="w-3 h-3 rounded-full bg-amber/20"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald/20"></div>
                   </div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Ward: 42</div>
                </div>
                <div className="flex-1 relative" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                  {/* Mock Map Pins */}
                  <div className="absolute top-1/4 left-1/3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-8 h-8 rounded-full bg-danger border-4 border-white shadow-lg flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-2/3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <div className="w-8 h-8 rounded-full bg-amber border-4 border-white shadow-lg flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-1/3 left-1/2 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                    <div className="w-8 h-8 rounded-full bg-emerald border-4 border-white shadow-lg flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>

                  {/* Mock Info Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <Camera size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Pothole on 5th Avenue</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <MapPin size={8} /> 2 mins ago • Sector 4
                        </div>
                      </div>
                      <div className="ml-auto">
                         <span className="px-2 py-1 rounded-full bg-danger-light text-danger text-[10px] font-bold uppercase">Open</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard title="Issues Reported" value="12,400" className="text-center" />
            <StatCard title="Resolution Rate" value="87%" className="text-center" />
            <StatCard title="Wards Active" value="240" className="text-center" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Three simple steps to make a lasting impact in your neighborhood.
          </p>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative">
          {/* Dashed Line Background */}
          <div className="absolute top-16 left-1/4 right-1/4 h-[2px] border-t-2 border-dashed border-slate-200 hidden md:block"></div>
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center mb-8 relative">
                   <div className="w-24 h-24 rounded-full bg-indigo flex items-center justify-center text-white">
                      <step.icon size={40} />
                   </div>
                   <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-sm font-bold text-indigo">
                      {idx + 1}
                   </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Built for Modern Governance</h2>
          <p className="text-lg text-slate-500 max-w-2xl">
            Powerful tools to ensure no civic issue goes unnoticed.
          </p>
        </div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-8 hover:border-indigo/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo text-white flex items-center justify-center mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-indigo-dark rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo/10 rounded-full -ml-32 -mb-32"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">
              Ready to improve your city?
            </h2>
            <p className="text-indigo-light/80 text-xl mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Join thousands of active citizens making their neighborhoods safer and cleaner every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button 
                variant="primary" 
                className="bg-white text-indigo hover:bg-slate-100 border-none px-10 py-4 text-lg font-bold"
                onClick={() => navigate('/auth')}
              >
                Get Started for Free
              </Button>
              <Button 
                variant="secondary" 
                className="border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg"
                onClick={() => navigate('/map')}
              >
                View Active Reports
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-dark text-white pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo p-1.5 rounded-lg">
                  <Camera size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">CivicSnap</span>
              </div>
              <p className="text-indigo-light/60 leading-relaxed mb-6">
                Empowering communities through digital accountability and public transparency. Built for the future of smart cities.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Github size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Globe size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><Link to="/feed" className="text-indigo-light/60 hover:text-white transition-colors">Reports Feed</Link></li>
                <li><Link to="/map" className="text-indigo-light/60 hover:text-white transition-colors">Live Map</Link></li>
                <li><Link to="/leaderboard" className="text-indigo-light/60 hover:text-white transition-colors">Leaderboard</Link></li>
                <li><Link to="/ward-report" className="text-indigo-light/60 hover:text-white transition-colors">Ward Stats</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-indigo-light/60 hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="text-indigo-light/60 hover:text-white transition-colors">Communities</a></li>
                <li><a href="#" className="text-indigo-light/60 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-indigo-light/60 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-indigo-light/60 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-indigo-light/60 hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="text-indigo-light/60 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-indigo-light/60 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center gap-4 text-indigo-light/40 text-sm">
            <p>© 2025 CivicSnap. Public Digital Infrastructure.</p>
            <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
