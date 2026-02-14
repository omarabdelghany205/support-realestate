import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// استدعاء الصفحات
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Properties from './Properties';
import PropertyDetails from './PropertyDetails';
import AdminDashboard from './admin/AdminDashboard';
import Login from './admin/Login';

function App() {
  const logoImage = "/logo.png";
  const phoneNumber = "01006405527";
  const whatsappLink = `https://wa.me/20${phoneNumber}`;

  return (
    <Router>
      <div className="font-sans text-gray-900 flex flex-col min-h-screen" dir="rtl">
        
        {/* القائمة العلوية */}
        <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            
            {/* اللوجو */}
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Logo" className="h-10 w-auto bg-white rounded p-1" />
              <div className="text-xl font-bold tracking-wide hidden md:block">
                SUPPORT <span className="text-amber-500">REAL ESTATE</span>
              </div>
            </div>

            {/* الروابط */}
            <div className="hidden md:flex gap-6 font-bold items-center">
              <Link to="/" className="hover:text-amber-500 transition">الرئيسية</Link>
              <Link to="/properties" className="hover:text-amber-500 transition">وحداتنا</Link>
              <Link to="/about" className="hover:text-amber-500 transition">من نحن</Link>
              <Link to="/contact" className="hover:text-amber-500 transition">تواصل معنا</Link>
            </div>

            {/* أزرار الإجراءات (دخول + اتصال سريع) */}
            <div className="flex items-center gap-3">
               <a href={`tel:${phoneNumber}`} className="hidden md:flex items-center gap-2 text-sm font-bold bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition border border-slate-700">
                 📞 <span dir="ltr">{phoneNumber}</span>
               </a>
               <Link to="/admin" className="bg-amber-600 px-4 py-2 rounded hover:bg-amber-700 transition font-bold text-sm">
                 دخول الموظفين
               </Link>
            </div>
          </div>
        </nav>

        {/* محتوى الصفحات */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        {/* الفوتر (تعديل الرقم والروابط هنا) */}
        <footer className="bg-slate-900 text-gray-400 py-10 mt-auto text-center border-t border-slate-800">
          <div className="container mx-auto px-4">
            
            <h3 className="text-white font-bold text-xl mb-6">تواصل معنا مباشرة</h3>
            
            {/* روابط الاتصال والواتساب */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 text-lg font-bold">
              <a href={`tel:${phoneNumber}`} className="hover:text-white transition flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-full hover:bg-amber-600">
                📞 اتصل بنا: <span dir="ltr">{phoneNumber}</span>
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-full hover:bg-[#25D366]">
                💬 تواصل واتساب
              </a>
            </div>

            <p className="text-sm opacity-60">© 2020 Support Real Estate. جميع الحقوق محفوظة.</p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;