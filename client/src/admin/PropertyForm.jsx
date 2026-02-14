import React, { useState } from 'react';
import axios from 'axios';

function PropertyForm({ data, goBack }) {
  const isEdit = !!data; 
  const [formData, setFormData] = useState(data || {
    title: '', price: '', location: '', area: '', description: '',
    type: 'apartment',
    images: '', videoUrl: '',
    rooms: '', floor: '', hasElevator: false, 
    hasPool: false, floorsCount: '',
    landType: '', apartmentsCount: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        // تعديل
        await axios.put(`http://localhost:5000/api/properties/${data._id}`, formData);
        alert('تم تعديل العقار بنجاح! ✅');
      } else {
        // إضافة جديد
        await axios.post('http://localhost:5000/api/properties', formData);
        alert('تم إضافة العقار بنجاح! 🚀');
      }
      goBack(); // ارجع للجدول
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الحفظ! تأكد من تشغيل السيرفر ❌');
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-slate-800">
        {isEdit ? 'تعديل بيانات العقار ✏️' : 'إضافة عقار جديد 🏠'}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* البيانات الأساسية */}
        <div className="md:col-span-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-amber-600 mb-4 border-b pb-2">البيانات الأساسية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={formData.title} onChange={handleChange} placeholder="عنوان العقار (مثال: شقة لقطة)" className="p-3 border rounded-lg" required />
            <select name="type" value={formData.type} onChange={handleChange} className="p-3 border rounded-lg font-bold bg-white">
              <option value="apartment">شقة</option>
              <option value="villa">فيلا</option>
              <option value="land">أرض</option>
              <option value="building">عمارة</option>
            </select>
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="السعر (جنية)" className="p-3 border rounded-lg" required />
            <input name="location" value={formData.location} onChange={handleChange} placeholder="الموقع (مثال: التجمع)" className="p-3 border rounded-lg" required />
            <input name="area" type="number" value={formData.area} onChange={handleChange} placeholder="المساحة (م²)" className="p-3 border rounded-lg" required />
          </div>
        </div>

        {/* تفاصيل النوع */}
        <div className="md:col-span-2 bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">تفاصيل خاصة</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            {formData.type === 'apartment' && (
              <>
                <input name="rooms" type="number" value={formData.rooms} onChange={handleChange} placeholder="عدد الغرف" className="p-3 border rounded-lg w-full"/>
                <input name="floor" value={formData.floor} onChange={handleChange} placeholder="الدور" className="p-3 border rounded-lg w-full"/>
                <label className="flex items-center gap-2 font-bold p-3"><input name="hasElevator" type="checkbox" checked={formData.hasElevator} onChange={handleChange} className="w-5 h-5"/> يوجد مصعد</label>
              </>
            )}
            {formData.type === 'villa' && (
              <>
                <input name="rooms" type="number" value={formData.rooms} onChange={handleChange} placeholder="عدد الغرف" className="p-3 border rounded-lg w-full"/>
                <input name="floorsCount" type="number" value={formData.floorsCount} onChange={handleChange} placeholder="عدد الأدوار" className="p-3 border rounded-lg w-full"/>
                <label className="flex items-center gap-2 font-bold p-3"><input name="hasPool" type="checkbox" checked={formData.hasPool} onChange={handleChange} className="w-5 h-5"/> حمام سباحة</label>
              </>
            )}
            {formData.type === 'land' && (
              <select name="landType" value={formData.landType} onChange={handleChange} className="p-3 border rounded-lg w-full">
                <option value="">نوع الأرض</option>
                <option value="residential">سكنية</option>
                <option value="agricultural">زراعية</option>
                <option value="commercial">تجارية</option>
              </select>
            )}
            {formData.type === 'building' && (
              <input name="apartmentsCount" type="number" value={formData.apartmentsCount} onChange={handleChange} placeholder="عدد الشقق" className="p-3 border rounded-lg w-full"/>
            )}
          </div>
        </div>

        {/* الوصف والوسائط */}
        <div className="md:col-span-2">
           <label className="block text-sm font-bold mb-1">وصف كامل للعقار</label>
           <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg h-32" placeholder="اكتب كل التفاصيل هنا..."></textarea>
        </div>
        <div className="md:col-span-2">
           <label className="block text-sm font-bold mb-1">رابط الصورة الرئيسية (URL)</label>
           <input name="images" value={formData.images} onChange={handleChange} placeholder="https://..." className="w-full p-3 border rounded-lg dir-ltr"/>
        </div>
        <div className="md:col-span-2">
           <label className="block text-sm font-bold mb-1">رابط فيديو (YouTube Embed URL)</label>
           <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://www.youtube.com/embed/..." className="w-full p-3 border rounded-lg dir-ltr"/>
        </div>

        <button type="submit" className="md:col-span-2 bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition shadow-lg text-lg">
           {isEdit ? 'حفظ التعديلات 💾' : 'نشر العقار الآن 🚀'}
        </button>

        <button type="button" onClick={goBack} className="md:col-span-2 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300">
           إلغاء
        </button>

      </form>
    </div>
  );
}

export default PropertyForm;