import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PropertyManager() {
  const [properties, setProperties] = useState([]);
  
  // الحالة المبدئية لكل الخانات
  const initialFormState = { 
    title: '', price: '', location: '', area: '', images: '', description: '',
    type: 'apartment', paymentType: 'cash', amenities: '',
    
    // متغيرات الشقق
    rooms: '', bathrooms: '', level: '', finishingType: '',
    // متغيرات العمارات
    apartmentsCount: '', apartmentArea: '', floorsCount: '',
    // متغيرات المحلات
    license: '',
    // متغيرات الأراضي
    landType: '', meterPrice: '', landInterface: ''
  };

  const [form, setForm] = useState(initialFormState);
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchProperties(); }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/properties');
      setProperties(res.data);
    } catch (err) { console.error(err); }
  };

  const handleTypeChange = (e) => {
    // لما نغير النوع، نحافظ على الأساسيات ونصفر الباقي
    setForm({ 
      ...initialFormState, 
      type: e.target.value,
      title: form.title, price: form.price, location: form.location, area: form.area, images: form.images, paymentType: form.paymentType
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amenitiesArray = form.amenities ? form.amenities.split(/[,،]/).map(i => i.trim()).filter(i => i !== '') : [];
    const mediaArray = form.images ? form.images.split('\n').map(u => u.trim()).filter(u => u !== '') : [];

    const dataToSend = { ...form, images: mediaArray, amenities: amenitiesArray };

    try {
      if (editId) await axios.put(`http://localhost:5000/api/properties/${editId}`, dataToSend);
      else await axios.post('http://localhost:5000/api/properties', dataToSend);
      
      setForm(initialFormState);
      setEditId(null);
      fetchProperties();
      alert('تم الحفظ بنجاح! ✅');
    } catch (err) { alert('حدث خطأ!'); }
  };
  
  const handleDelete = async (id) => {
      if (window.confirm('حذف العقار نهائياً؟')) { await axios.delete(`http://localhost:5000/api/properties/${id}`); fetchProperties(); }
  };

  const handleEdit = (item) => { 
    const imagesStr = item.images ? item.images.join('\n') : '';
    const amenitiesStr = item.amenities ? item.amenities.join('، ') : '';
    setForm({ ...item, images: imagesStr, amenities: amenitiesStr }); 
    setEditId(item._id); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-4">🏗️ إدارة العقارات والمواصفات</h2>

      <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-xl border mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. الأساسيات */}
        <div className="col-span-1 md:col-span-2 bg-white p-4 rounded border border-blue-100 mb-2">
           <h3 className="text-sm font-bold text-blue-600 mb-3">🔹 بيانات أساسية</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="العنوان المميز" className="p-3 border rounded w-full" required />
              
              <select value={form.type} onChange={handleTypeChange} className="p-3 border rounded bg-amber-50 font-bold cursor-pointer">
                <option value="apartment">شقة سكنية</option>
                <option value="villa">فيلا</option>
                <option value="building">عمارة كاملة</option>
                <option value="land">أرض</option>
                <option value="shop">محل تجاري</option>
                <option value="duplex">دوبلكس</option>
              </select>

              <input value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="السعر الإجمالي" type="number" className="p-3 border rounded" required />
              <input value={form.area} onChange={e => setForm({...form, area: e.target.value})} placeholder="المساحة الكلية (م٢)" type="number" className="p-3 border rounded" required />
              
              <select value={form.paymentType} onChange={e => setForm({...form, paymentType: e.target.value})} className="p-3 border rounded bg-green-50 font-bold text-green-900">
                <option value="cash">كاش 💵</option>
                <option value="installment">تقسيط 📅</option>
              </select>
              <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="الموقع / الحي" className="p-3 border rounded col-span-2" required />
           </div>
        </div>

        {/* 2. التفاصيل الفنية (متغيرة حسب النوع) */}
        <div className="col-span-1 md:col-span-2 bg-white p-4 rounded border border-amber-100 fade-in">
            <h3 className="text-sm font-bold text-amber-600 mb-3">🔹 التفاصيل الفنية ({form.type === 'land' ? 'للأرض' : form.type === 'building' ? 'للعمارة' : 'للوحدة'})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               
               {/* شقق وفلل */}
               {['apartment', 'villa', 'duplex'].includes(form.type) && (
                 <>
                   <input value={form.rooms} onChange={e => setForm({...form, rooms: e.target.value})} placeholder="عدد الغرف" type="number" className="p-3 border rounded" />
                   <input value={form.bathrooms} onChange={e => setForm({...form, bathrooms: e.target.value})} placeholder="الحمامات" type="number" className="p-3 border rounded" />
                   <input value={form.level} onChange={e => setForm({...form, level: e.target.value})} placeholder="الدور" type="number" className="p-3 border rounded" />
                   <select value={form.finishingType} onChange={e => setForm({...form, finishingType: e.target.value})} className="p-3 border rounded">
                      <option value="">-- التشطيب --</option>
                      <option value="red_brick">طوب أحمر</option>
                      <option value="semi_finished">نصف تشطيب</option>
                      <option value="super_lux">سوبر لوكس</option>
                   </select>
                 </>
               )}

               {/* عمارات */}
               {form.type === 'building' && (
                 <>
                   <input value={form.floorsCount} onChange={e => setForm({...form, floorsCount: e.target.value})} placeholder="عدد الأدوار" type="number" className="p-3 border rounded" />
                   <input value={form.apartmentsCount} onChange={e => setForm({...form, apartmentsCount: e.target.value})} placeholder="عدد الشقق" type="number" className="p-3 border rounded" />
                   <input value={form.apartmentArea} onChange={e => setForm({...form, apartmentArea: e.target.value})} placeholder="مساحة الشقة (م٢)" type="number" className="p-3 border rounded" />
                 </>
               )}

               {/* أراضي (الجديد) */}
               {form.type === 'land' && (
                  <>
                    <select value={form.landType} onChange={e => setForm({...form, landType: e.target.value})} className="p-3 border rounded w-full font-bold">
                      <option value="">نوع النشاط</option>
                      <option value="residential">سكنية</option>
                      <option value="commercial">تجارية</option>
                      <option value="industrial">صناعية</option>
                    </select>
                    <input value={form.meterPrice} onChange={e => setForm({...form, meterPrice: e.target.value})} placeholder="سعر المتر (ج.م)" type="number" className="p-3 border rounded font-bold text-amber-600" />
                    <select value={form.landInterface} onChange={e => setForm({...form, landInterface: e.target.value})} className="p-3 border rounded w-full">
                      <option value="">الواجهة</option>
                      <option value="corner">ناصية (Corner)</option>
                      <option value="facade">وجهة واحدة</option>
                      <option value="double_face">وجهتين</option>
                    </select>
                  </>
               )}

               {/* محلات */}
               {form.type === 'shop' && (
                  <input value={form.license} onChange={e => setForm({...form, license: e.target.value})} placeholder="نوع الرخصة (تجاري/إداري)" className="p-3 border rounded" />
               )}
            </div>
        </div>
        
        {/* مميزات وصور */}
        <div className="col-span-1 md:col-span-2">
           <label className="text-sm font-bold text-purple-600 mb-1 block">✨ مميزات إضافية (افصل بفاصلة)</label>
           <input value={form.amenities} onChange={e => setForm({...form, amenities: e.target.value})} placeholder="مثال: غاز طبيعي، فيو مفتوح، حديقة" className="w-full p-3 border-2 border-purple-100 rounded bg-purple-50" />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="text-sm font-bold text-gray-500 mb-1 block">روابط الصور (رابط في كل سطر)</label>
          <textarea value={form.images} onChange={e => setForm({...form, images: e.target.value})} className="w-full p-3 border rounded h-24 dir-ltr text-left" />
        </div>
        <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="وصف تفصيلي..." className="col-span-1 md:col-span-2 p-3 border rounded h-24" />

        <button type="submit" className={`col-span-1 md:col-span-2 py-4 rounded-xl text-white font-bold text-lg shadow-lg ${editId ? 'bg-amber-600' : 'bg-slate-900'}`}>{editId ? 'حفظ التعديلات' : 'نشر العقار'}</button>
        {editId && <button type="button" onClick={() => {setEditId(null); setForm(initialFormState)}} className="text-red-500 font-bold col-span-2 text-center">إلغاء</button>}
      </form>
      
      {/* القائمة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map(item => (
          <div key={item._id} className="border p-4 rounded-xl flex gap-4 bg-white shadow-sm items-center">
             <div className="flex-1">
                <h4 className="font-bold">{item.title}</h4>
                <div className="flex gap-2 text-sm text-gray-500 mt-1">
                   <span>{item.type}</span> | <span className="font-bold text-amber-600">{Number(item.price).toLocaleString()} ج.م</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded">تعديل</button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded">حذف</button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyManager;