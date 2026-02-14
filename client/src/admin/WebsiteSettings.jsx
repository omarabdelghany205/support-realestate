import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WebsiteSettings() {
  const [formData, setFormData] = useState({
    phoneNumber: '', whatsappNumber: '', address: '', facebookUrl: '',
    heroTitle: '', heroSubtitle: '', heroImage: '',
    aboutText: '', aboutImage: '', visionText: '' // ضفنا visionText
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/config')
      .then(res => {
        if (res.data) setFormData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:5000/api/config', formData)
      .then(() => alert('تم حفظ الإعدادات بنجاح! ✅'))
      .catch(() => alert('حدث خطأ! ❌'));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-4">⚙️ إعدادات المحتوى</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. التواصل */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-amber-600 mb-4">📞 التواصل</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} placeholder="رقم الهاتف" className="p-2 border rounded"/>
            <input name="whatsappNumber" value={formData.whatsappNumber || ''} onChange={handleChange} placeholder="رقم الواتساب" className="p-2 border rounded"/>
            <input name="address" value={formData.address || ''} onChange={handleChange} placeholder="العنوان" className="col-span-2 p-2 border rounded"/>
            <input name="facebookUrl" value={formData.facebookUrl || ''} onChange={handleChange} placeholder="رابط الفيسبوك" className="col-span-2 p-2 border rounded dir-ltr"/>
          </div>
        </div>

        {/* 2. الرئيسية */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-amber-600 mb-4">🏠 الرئيسية (Hero)</h3>
          <div className="space-y-3">
            <input name="heroTitle" value={formData.heroTitle || ''} onChange={handleChange} placeholder="العنوان الرئيسي الكبير" className="w-full p-2 border rounded"/>
            <input name="heroSubtitle" value={formData.heroSubtitle || ''} onChange={handleChange} placeholder="العنوان الفرعي" className="w-full p-2 border rounded"/>
            <input name="heroImage" value={formData.heroImage || ''} onChange={handleChange} placeholder="رابط صورة الخلفية" className="w-full p-2 border rounded dir-ltr"/>
          </div>
        </div>

        {/* 3. من نحن والرؤية */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="font-bold text-amber-600 mb-4">ℹ️ من نحن & الرؤية</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">نص "من نحن"</label>
            <textarea name="aboutText" value={formData.aboutText || ''} onChange={handleChange} className="w-full p-2 border rounded h-24"></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">نص "الرؤية" (Vision) - (جديد ✨)</label>
            <textarea name="visionText" value={formData.visionText || ''} onChange={handleChange} className="w-full p-2 border rounded h-24 placeholder-gray-400" placeholder="اكتب رؤية الشركة هنا..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">صورة قسم من نحن</label>
            <input name="aboutImage" value={formData.aboutImage || ''} onChange={handleChange} placeholder="رابط الصورة" className="w-full p-2 border rounded dir-ltr"/>
          </div>
        </div>

        <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">
          حفظ التعديلات 💾
        </button>
      </form>
    </div>
  );
}

export default WebsiteSettings;