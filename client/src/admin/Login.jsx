import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 👇👇👇 هنا تقدر تغير الباسورد براحتك
    const validEmail = "admin";
    const validPass = "202067"; 

    if (email === validEmail && password === validPass) {
      // ✅ حفظ مفتاح الدخول في المتصفح
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      alert('كلمة المرور خاطئة! حاول مرة أخرى ❌');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900" dir="rtl">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border-t-8 border-amber-500">
        <h2 className="text-3xl font-black text-slate-800 mb-6">تسجيل الدخول 🔐</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-amber-500 transition"
            placeholder="اسم المستخدم"
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-amber-500 transition"
            placeholder="كلمة المرور"
          />
          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-amber-600 transition shadow-lg">
            دخول للوحة التحكم 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;