import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // كلمة السر هي: admin123
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true'); 
      navigate('/admin/dashboard'); 
    } else {
      alert('كلمة المرور خاطئة! ❌');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">دخول الإدارة 🔒</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-bold mb-2">كلمة المرور</label>
            <input 
              type="password" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="أدخل كود الأدمن"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-amber-600 text-white font-bold py-3 rounded-lg hover:bg-amber-700 transition">
            دخول 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
