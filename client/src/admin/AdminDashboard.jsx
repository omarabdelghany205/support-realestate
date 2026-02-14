import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// استدعاء المكونات
import TeamManager from './TeamManager';
import WebsiteSettings from './WebsiteSettings';
import PropertyManager from './PropertyManager'; // <--- استدعاء الملف الجديد

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties'); // خليته يفتح على العقارات علطول

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) navigate('/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" dir="rtl">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">🛠️ لوحة التحكم</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded text-sm font-bold hover:bg-red-700 transition">
          خروج 🚪
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg p-4 flex flex-col gap-2">
          
          <button 
            onClick={() => setActiveTab('properties')} 
            className={`p-3 rounded-lg text-right font-bold transition ${activeTab === 'properties' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100 text-slate-700'}`}
          >
            🏠 إدارة الوحدات (جديد)
          </button>

          <button 
            onClick={() => setActiveTab('settings')} 
            className={`p-3 rounded-lg text-right font-bold transition ${activeTab === 'settings' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100 text-slate-700'}`}
          >
            ⚙️ إعدادات الموقع
          </button>
          
          <button 
            onClick={() => setActiveTab('team')} 
            className={`p-3 rounded-lg text-right font-bold transition ${activeTab === 'team' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100 text-slate-700'}`}
          >
            👥 إدارة فريق العمل
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'settings' && <WebsiteSettings />}
          {activeTab === 'team' && <TeamManager />}
          {activeTab === 'properties' && <PropertyManager />} {/* <--- هنا بيعرض صفحة العقارات */}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;