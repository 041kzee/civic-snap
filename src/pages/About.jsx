import React from 'react';
import { 
  Camera, 
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  User, 
  Shield, 
  Quote,
  Check,
  ArrowRight,
  Target,
  Zap,
  Globe
} from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Button from '../components/ui/Button';

const About = () => {
  const steps = [
    { icon: Camera, title: "Snap", desc: "Found a civic problem? Take a quick photo." },
    { icon: Send, title: "Report", desc: "Our AI categorizes and maps it instantly." },
    { icon: Clock, title: "Track", desc: "Watch the status update in real-time." },
    { icon: CheckCircle2, title: "Resolved", desc: "City authorities fix it, and you get notified." },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />
      
      <main className="flex-1">
        {/* Section 1 - Mission */}
        <section className="bg-indigo py-32 px-6 relative overflow-hidden text-center">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
           <div className="max-w-4xl mx-auto relative z-10">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight animate-fade-in">
                 Built for the citizen.<br/>Powered by the community.
              </h1>
              <p className="text-xl md:text-2xl text-indigo-light font-medium max-w-2xl mx-auto leading-relaxed">
                 CivicSnap is an open accountability layer designed to bridge the gap between residents and city governance.
              </p>
           </div>
        </section>

        {/* Section 2 - The Problem */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">The Problem</h2>
                 <div className="space-y-6">
                    {[
                      "Broken roads ignored for months",
                      "Official complaints lost in paperwork",
                      "Zero visibility into repair timelines",
                      "Massive communication gap with local authorities"
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                         <XCircle className="text-danger flex-shrink-0 group-hover:scale-110 transition-transform" size={24} />
                         <p className="text-lg font-bold text-slate-600">{point}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative p-10 bg-slate-100 rounded-[3rem] overflow-hidden shadow-inner">
                 {/* CSS/SVG Illustration */}
                 <div className="h-64 flex items-center justify-center relative">
                    <div className="w-full h-12 bg-slate-300 rounded-full"></div>
                    <div className="absolute left-1/4 w-16 h-8 bg-slate-800 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                       <User size={64} className="text-slate-400 mb-4" />
                       <div className="px-4 py-2 bg-white rounded-xl shadow-xl text-slate-400 font-black text-xs uppercase tracking-widest border border-slate-100">
                          Where do I report?
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Section 3 - How It Works */}
        <section className="py-32 bg-white px-6">
           <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                 <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
                 <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Four simple steps to a better city</p>
              </div>

              <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-4">
                 {/* Connection Line */}
                 <div className="absolute top-12 left-12 right-12 h-0.5 border-t-2 border-dashed border-indigo/20 hidden md:block"></div>
                 
                 {steps.map((step, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10 group">
                      <div className="w-24 h-24 bg-indigo text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-indigo/20 group-hover:scale-110 transition-transform duration-500">
                         <step.icon size={40} />
                         <div className="absolute -top-3 -right-3 w-10 h-10 bg-white text-indigo border-4 border-indigo-light rounded-full flex items-center justify-center font-black text-lg">
                            {i+1}
                         </div>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[200px]">{step.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Section 4 - Citizens vs Authorities */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
           <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-50 hover:shadow-2xl transition-all duration-500 group">
                 <div className="w-16 h-16 bg-indigo-light rounded-2xl flex items-center justify-center text-indigo mb-8 group-hover:scale-110 transition-transform">
                    <User size={32} />
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-8">For Citizens</h3>
                 <div className="space-y-4">
                    {[
                      "Real-time visibility into ward health",
                      "Community-powered priority ranking",
                      "Direct notifications on resolution",
                      "Public profile & leaderboard badges",
                      "Anonymous reporting option"
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <CheckCircle2 className="text-emerald" size={20} />
                         <span className="text-slate-600 font-bold text-sm">{f}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-50 hover:shadow-2xl transition-all duration-500 group">
                 <div className="w-16 h-16 bg-emerald/10 rounded-2xl flex items-center justify-center text-emerald mb-8 group-hover:scale-110 transition-transform">
                    <Shield size={32} />
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-8">For Authorities</h3>
                 <div className="space-y-4">
                    {[
                      "Smart ticket auto-categorization",
                      "Geo-targeted resource allocation",
                      "SLA compliance tracking & alerts",
                      "Ward-level civic health analytics",
                      "Public accountability proofing"
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <CheckCircle2 className="text-emerald" size={20} />
                         <span className="text-slate-600 font-bold text-sm">{f}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Section 5 - Vision */}
        <section className="py-32 bg-slate-900 text-white px-6 text-center relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 scale-150">
              <Quote size={400} fill="currentColor" />
           </div>
           <div className="max-w-3xl mx-auto relative z-10">
              <Quote className="text-indigo-light mb-8 mx-auto opacity-50" size={64} />
              <h2 className="text-3xl md:text-5xl font-black italic leading-tight mb-12 tracking-tight">
                 "CivicSnap is not just a reporting app — it's a civic intelligence layer for cities."
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="flex flex-col items-center gap-2">
                    <Zap className="text-amber mb-2" size={32} />
                    <h5 className="font-bold">Real-time Fixes</h5>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <Target className="text-emerald mb-2" size={32} />
                    <h5 className="font-bold">Precision Mapping</h5>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <Globe className="text-indigo-light mb-2" size={32} />
                    <h5 className="font-bold">Open Access</h5>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/5 py-16 px-6">
         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-center">
            <div className="text-center md:text-left">
               <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Camera className="text-indigo" size={24} />
                  <span className="text-white text-2xl font-bold tracking-tight">CivicSnap</span>
               </div>
               <p className="text-slate-500 font-medium text-sm">Transparency in every pixel.</p>
            </div>
            <div className="flex items-center justify-center gap-8 text-slate-400 font-bold text-xs uppercase tracking-widest">
               <button onClick={() => navigate('/about')} className="hover:text-white">About</button>
               <button onClick={() => navigate('/feed')} className="hover:text-white">Public Feed</button>
               <button onClick={() => navigate('/ward-report')} className="hover:text-white">Ward Report</button>
            </div>
            <div className="text-center md:text-right text-slate-600 font-bold text-xs uppercase tracking-[0.2em]">
               © 2025 CivicSnap.
            </div>
         </div>
      </footer>
    </div>
  );
};

export default About;
