import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  X, 
  Sparkles, 
  MapPin, 
  Check, 
  ChevronDown,
  Star,
  Loader2,
  Info
} from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setAnalyzing(true);
        // Simulate AI analysis
        setTimeout(() => setAnalyzing(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setAnalyzing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/my-reports');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo rounded-2xl text-white shadow-lg shadow-indigo/20">
            <Camera size={28} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Report a Civic Issue</h1>
        </div>

        <Card className="p-0 overflow-hidden border-none shadow-xl">
          <form onSubmit={handleSubmit}>
            {/* Photo Upload Section */}
            <div className="p-8">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Issue Evidence</label>
              {!image ? (
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-slate-200 group-hover:border-indigo group-hover:bg-indigo-light/30 rounded-2xl h-64 flex flex-col items-center justify-center transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo mb-4 transition-all">
                      <Upload size={32} />
                    </div>
                    <p className="text-slate-900 font-bold text-lg mb-1">Tap to upload a photo</p>
                    <p className="text-slate-400 text-sm">JPG, PNG up to 10MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden h-64 shadow-inner">
                  <img src={image} alt="Issue preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-slate-900/50 backdrop-blur-md text-white rounded-full hover:bg-slate-900 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="h-px bg-slate-100"></div>

            {/* AI Analysis Result (Conditional) */}
            {image && (
              <div className="p-8 bg-slate-50/50">
                <div className={`rounded-2xl border-2 border-indigo bg-white p-6 relative overflow-hidden transition-all duration-500 ${analyzing ? 'opacity-60 grayscale' : 'opacity-100'}`}>
                  {analyzing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] z-10">
                       <div className="flex flex-col items-center gap-3">
                         <Loader2 className="animate-spin text-indigo" size={32} />
                         <span className="text-sm font-bold text-indigo">AI Analyzing...</span>
                       </div>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-indigo-light rounded-lg text-indigo">
                        <Sparkles size={18} />
                      </div>
                      <span className="font-bold text-indigo tracking-tight text-lg">AI Analysis Result</span>
                    </div>
                    <Badge status="Resolved">Verified</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category Detected</p>
                      <Badge variant="indigo">Pothole / Road Damage</Badge>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Severity Score</p>
                      <div className="flex gap-1 text-amber">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} fill={star <= 4 ? "currentColor" : "none"} strokeWidth={2.5} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI Description</p>
                    <p className="text-sm text-slate-600 italic leading-relaxed">
                      "Image shows significant asphalt degradation with visible water accumulation. Likely a high-priority repair needed to prevent further structural damage."
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 italic">
                    <Info size={12} />
                    You can manually override these detections below.
                  </div>
                </div>
              </div>
            )}

            <div className="h-px bg-slate-100"></div>

            {/* Location Section */}
            <div className="p-8">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Location Detection</label>
              <div className="rounded-2xl h-48 bg-slate-100 overflow-hidden mb-4 relative shadow-inner border border-slate-100">
                <MapContainer 
                  center={[20.5937, 78.9629]} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                  dragging={false}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                  <Marker position={[20.5937, 78.9629]} />
                </MapContainer>
                <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-emerald">
                  <div className="w-5 h-5 rounded-full bg-emerald/10 flex items-center justify-center">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-sm font-bold">Auto-detected from GPS</span>
                </div>
                <button type="button" className="text-sm font-bold text-indigo hover:underline">Change Location</button>
              </div>
            </div>

            <div className="h-px bg-slate-100"></div>

            {/* Details Section */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                  <div className="relative">
                    <select className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl font-semibold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo/20">
                      <option>Road Damage</option>
                      <option>Waste Management</option>
                      <option>Lighting</option>
                      <option>Water Leak</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Severity (1-5)</label>
                  <div className="relative">
                    <select className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl font-semibold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo/20">
                      {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                    <Star className="absolute right-4 top-1/2 -translate-y-1/2 text-amber pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description (Optional)</label>
                <textarea 
                  rows={4}
                  placeholder="Describe the issue in detail..."
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo/20 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Ward</label>
                <div className="relative">
                  <select className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl font-semibold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo/20">
                    <option>Ward 4 - Green Valley</option>
                    <option>Ward 12 - Downtown</option>
                    <option>Ward 7 - West Coast</option>
                  </select>
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Anonymous Toggle */}
              <div className="pt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Report Anonymously</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Hide your name from the public feed</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`w-12 h-6 rounded-full transition-all relative ${isAnonymous ? 'bg-indigo' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isAnonymous ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100">
               <Button 
                 type="submit" 
                 disabled={loading || !image}
                 className="w-full py-4 text-lg font-bold shadow-xl shadow-indigo/20 flex items-center justify-center gap-3"
               >
                 {loading && <Loader2 className="animate-spin" size={24} />}
                 Submit Report
               </Button>
               <p className="text-center text-xs text-slate-400 mt-4 font-medium italic">
                 Your report will be live on the map within seconds.
               </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;
