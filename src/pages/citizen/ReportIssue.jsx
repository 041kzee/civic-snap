import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Info,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import useToast from '../../hooks/useToast';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import issueService from '../../services/issueService';
import departmentService from '../../services/departmentService';

// Helper component to center map on coordinates
const RecenterMap = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords.lat && coords.lng) {
      map.setView([coords.lat, coords.lng], 15);
    }
  }, [coords, map]);
  return null;
};

const ReportIssue = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duplicateIssue, setDuplicateIssue] = useState(null);
  
  const [coords, setCoords] = useState({ lat: 20.5937, lng: 78.9629 });
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    category: 'pothole',
    severity: 3,
    description: '',
    ward: 'Ward 1',
    department: ''
  });

  // Fetch Departments and GPS
  useEffect(() => {
    const init = async () => {
      try {
        const depts = await departmentService.getDepartments();
        setDepartments(depts);
      } catch (err) {
        console.error('Failed to load departments');
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err) => console.warn('Geolocation denied', err)
        );
      }
    };
    init();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageFile(null);
    setDuplicateIssue(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDuplicateIssue(null);

    const submissionData = new FormData();
    submissionData.append('image', imageFile);
    submissionData.append('latitude', coords.lat);
    submissionData.append('longitude', coords.lng);
    submissionData.append('category', formData.category);
    submissionData.append('severity', formData.severity);
    submissionData.append('description', formData.description);
    submissionData.append('ward', formData.ward);
    if (formData.department) {
      submissionData.append('department', formData.department);
    }
    submissionData.append('anonymous', isAnonymous);

    try {
      const response = await issueService.createIssue(submissionData);
      
      if (response.duplicate) {
        setDuplicateIssue(response.existingIssue);
        showToast('A similar issue was already reported here.', 'warning');
        setLoading(false);
        return;
      }

      showToast('Report submitted successfully! AI analysis completed.', 'success');
      navigate('/map');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit report.', 'error');
    } finally {
      setLoading(false);
    }
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


        {duplicateIssue && (
          <div className="mb-6 p-6 bg-amber-50 border border-amber-200 rounded-2xl flex gap-4 animate-in slide-in-from-top-4 duration-300">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Possible Duplicate Found</h4>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                A similar issue was recently reported in this exact area. To help our team focus on resolution, please check if this is the same issue before reporting again.
              </p>
              <Link 
                to={`/issues/${duplicateIssue._id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700 transition-colors"
              >
                View Existing Report
              </Link>
            </div>
          </div>
        )}

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

            {/* AI Analysis Result (Placeholder until submitted) */}
            {image && (
              <div className="p-8 bg-slate-50/50">
                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 p-6 flex flex-col items-center justify-center text-center">
                  <div className="p-3 bg-slate-100 rounded-full text-slate-400 mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="font-bold text-slate-700 mb-1">AI Analysis Pending</h4>
                  <p className="text-xs text-slate-400 max-w-[280px]">
                    Our AI model will analyze your photo for categorization and severity once you submit.
                  </p>
                </div>
              </div>
            )}

            <div className="h-px bg-slate-100"></div>

            {/* Location Section */}
            <div className="p-8">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Location Detection</label>
              <div className="rounded-2xl h-48 bg-slate-100 overflow-hidden mb-4 relative shadow-inner border border-slate-100">
                <MapContainer 
                  center={[coords.lat, coords.lng]} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                  dragging={true}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                  <Marker position={[coords.lat, coords.lng]} />
                  <RecenterMap coords={coords} />
                </MapContainer>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-emerald">
                  <div className="w-5 h-5 rounded-full bg-emerald/10 flex items-center justify-center">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-sm font-bold">Location pinned from GPS</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => {
                    const lat = prompt('Enter Latitude', coords.lat);
                    const lng = prompt('Enter Longitude', coords.lng);
                    if (lat && lng) setCoords({ lat: parseFloat(lat), lng: parseFloat(lng) });
                  }}
                  className="text-sm font-bold text-indigo hover:underline"
                >
                  Edit Manually
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100"></div>

            {/* Details Section */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                  <div className="relative">
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl font-semibold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo/20"
                    >
                      <option value="pothole">Pothole</option>
                      <option value="streetlight">Street Light</option>
                      <option value="garbage">Garbage</option>
                      <option value="manhole">Manhole</option>
                      <option value="waterlogging">Waterlogging</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Severity (1-5)</label>
                  <div className="relative">
                    <select 
                      name="severity"
                      value={formData.severity}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl font-semibold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo/20"
                    >
                      {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                    <Star className="absolute right-4 top-1/2 -translate-y-1/2 text-amber pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description (Optional)</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe the issue in detail..."
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo/20 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Ward</label>
                  <div className="relative">
                    <select 
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl font-semibold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo/20"
                    >
                      <option value="Ward 1">Ward 1 - Green Valley</option>
                      <option value="Ward 4">Ward 4 - Riverside</option>
                      <option value="Ward 7">Ward 7 - West Coast</option>
                      <option value="Ward 12">Ward 12 - Downtown</option>
                    </select>
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Suggested Department</label>
                  <div className="relative">
                    <select 
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl font-semibold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo/20"
                    >
                      <option value="">Auto-detect (AI)</option>
                      {departments.map(dept => (
                        <option key={dept._id} value={dept._id}>{dept.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
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
                 disabled={loading || !imageFile || success}
                 className="w-full py-4 text-lg font-bold shadow-xl shadow-indigo/20 flex items-center justify-center gap-3"
               >
                 {loading ? (
                   <>
                     <Loader2 className="animate-spin" size={24} />
                     Submitting & Analyzing...
                   </>
                 ) : (
                   'Submit Report'
                 )}
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
