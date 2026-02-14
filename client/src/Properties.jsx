import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔍 حالة الفلاتر (شاملة كل طلباتك)
  const [filters, setFilters] = useState({
    type: "all",        // نوع العقار
    search: "",         // بحث بالاسم
    minArea: "",        // المساحة (مطلوبة في الكل)
    maxPrice: "",       // السعر (مهم في الكل)
    
    // 🏠 فلاتر الشقق والفلل
    rooms: "",          // عدد الغرف
    bathrooms: "",      // عدد الحمامات
    level: "",          // الدور (للشقق فقط)

    // 🏢 فلاتر العمارات
    floorsCount: "",    // عدد الأدوار
    minApartments: "",  // عدد الشقق في العمارة

    // 🌍 فلاتر الأراضي
    landType: ""        // نوع الأرض (زراعية / مباني)
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => { setProperties(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const sliderSettings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: false };
  const isVideo = (url) => url && (url.includes('.mp4') || url.includes('.webm'));

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // 👇👇 منطق الفلترة الذكي جداً (حسب طلبك) 👇👇
  const filteredProperties = properties.filter(item => {
    
    // 1. الفلاتر الأساسية (مشتركة بين الكل)
    if (filters.type !== "all" && item.type !== filters.type) return false;
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.maxPrice && item.price > Number(filters.maxPrice)) return false;
    if (filters.minArea && item.area < Number(filters.minArea)) return false;

    // 2. فلتر الشقق (غرف / حمامات / دور)
    if (filters.type === 'apartment') {
       if (filters.rooms && item.rooms < Number(filters.rooms)) return false;
       if (filters.bathrooms && item.bathrooms < Number(filters.bathrooms)) return false;
       if (filters.level && item.level !== Number(filters.level)) return false; // تطابق تام للدور
    }

    // 3. فلتر الفلل (غرف / حمامات)
    if (filters.type === 'villa') {
       if (filters.rooms && item.rooms < Number(filters.rooms)) return false;
       if (filters.bathrooms && item.bathrooms < Number(filters.bathrooms)) return false;
    }

    // 4. فلتر العمارات (عدد أدوار / عدد شقق)
    if (filters.type === 'building') {
       if (filters.floorsCount && item.floorsCount < Number(filters.floorsCount)) return false;
       if (filters.minApartments && item.apartmentsCount < Number(filters.minApartments)) return false;
    }

    // 5. فلتر الأراضي (زراعية / مباني)
    if (filters.type === 'land') {
       if (filters.landType && item.landType !== filters.landType) return false;
    }

    // 6. المحل التجاري (مساحة فقط - وده تم تغطيته في الفلتر الأساسي رقم 1)

    return true;
  });

  const clearFilters = () => {
    setFilters({ 
      type: "all", search: "", minArea: "", maxPrice: "", 
      rooms: "", bathrooms: "", level: "", 
      floorsCount: "", minApartments: "", landType: "" 
    });
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-xl font-bold text-slate-600">جاري تحميل الوحدات...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 text-center relative overflow-hidden">
        <h1 className="text-4xl font-black mb-2 relative z-10">
          وحداتنا <span className="text-amber-500">المميزة</span>
        </h1>
        <p className="text-gray-400 relative z-10">اختر نوع العقار لتظهر لك خيارات البحث المناسبة</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* 🎛️ شريط الفلترة المتغير */}
        <div className="bg-white p-6 rounded-2xl shadow-lg -mt-10 relative z-20 border border-gray-100 mb-10 transition-all duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            
            {/* 1. نوع العقار (المتحكم الرئيسي) */}
            <div className="md:col-span-1">
              <label className="text-xs font-bold text-gray-500 mb-1 block">نوع العقار</label>
              <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full p-3 border-2 border-amber-500 rounded-xl bg-amber-50 font-bold text-slate-800 cursor-pointer">
                <option value="all">الكل</option>
                <option value="apartment">شقق سكنية</option>
                <option value="villa">فيلات</option>
                <option value="shop">محل تجاري</option>
                <option value="building">عمارة كاملة</option>
                <option value="land">أرض</option>
              </select>
            </div>

            {/* 2. بحث ومساحة وسعر (بيظهروا للكل) */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
               <input name="search" value={filters.search} onChange={handleFilterChange} type="text" placeholder="🔎 بحث بالاسم..." className="w-full p-3 border rounded-xl" />
               <input name="minArea" value={filters.minArea} onChange={handleFilterChange} type="number" placeholder="أقل مساحة (م²)" className="w-full p-3 border rounded-xl" />
               <input name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} type="number" placeholder="أقصى سعر" className="w-full p-3 border rounded-xl" />
            </div>

            {/* ======================================================== */}
            {/* 👇👇 هنا السحر: الفلاتر بتتغير حسب النوع المختار 👇👇 */}
            {/* ======================================================== */}

            {/* 🏠 حالة الشقق (غرف، حمام، دور) */}
            {filters.type === 'apartment' && (
              <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-xl fade-in border border-blue-100">
                 <div className="col-span-3 text-sm font-bold text-blue-800 mb-[-10px]">بحث متخصص في الشقق:</div>
                 <input name="rooms" value={filters.rooms} onChange={handleFilterChange} type="number" placeholder="عدد الغرف (على الأقل)" className="p-3 border rounded-xl" />
                 <input name="bathrooms" value={filters.bathrooms} onChange={handleFilterChange} type="number" placeholder="عدد الحمامات" className="p-3 border rounded-xl" />
                 <input name="level" value={filters.level} onChange={handleFilterChange} type="number" placeholder="الدور (مثال: 3)" className="p-3 border rounded-xl" />
              </div>
            )}

            {/* 🏡 حالة الفلل (غرف، حمام فقط) */}
            {filters.type === 'villa' && (
              <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50 p-4 rounded-xl fade-in border border-amber-100">
                 <div className="col-span-2 text-sm font-bold text-amber-800 mb-[-10px]">بحث متخصص في الفلل:</div>
                 <input name="rooms" value={filters.rooms} onChange={handleFilterChange} type="number" placeholder="عدد الغرف (على الأقل)" className="p-3 border rounded-xl" />
                 <input name="bathrooms" value={filters.bathrooms} onChange={handleFilterChange} type="number" placeholder="عدد الحمامات" className="p-3 border rounded-xl" />
              </div>
            )}

            {/* 🏢 حالة العمارات (أدوار، عدد شقق) */}
            {filters.type === 'building' && (
              <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-xl fade-in border border-gray-200">
                 <div className="col-span-2 text-sm font-bold text-gray-800 mb-[-10px]">بحث متخصص في العمارات:</div>
                 <input name="floorsCount" value={filters.floorsCount} onChange={handleFilterChange} type="number" placeholder="عدد الأدوار (على الأقل)" className="p-3 border rounded-xl" />
                 <input name="minApartments" value={filters.minApartments} onChange={handleFilterChange} type="number" placeholder="عدد الشقق في العمارة" className="p-3 border rounded-xl" />
              </div>
            )}

            {/* 🌍 حالة الأراضي (زراعي/مباني) */}
            {filters.type === 'land' && (
              <div className="md:col-span-4 bg-green-50 p-4 rounded-xl fade-in border border-green-100">
                 <div className="text-sm font-bold text-green-800 mb-2">بحث متخصص في الأراضي:</div>
                 <select name="landType" value={filters.landType} onChange={handleFilterChange} className="w-full p-3 border rounded-xl bg-white font-bold text-gray-700">
                    <option value="">كل أنواع الأراضي</option>
                    <option value="residential">أرض مباني (سكنية)</option>
                    <option value="agricultural">أرض زراعية</option>
                    <option value="commercial">أرض تجارية</option>
                    <option value="industrial">أرض صناعية</option>
                 </select>
              </div>
            )}

            {/* 🏪 حالة المحل التجاري: ملوش فلاتر خاصة غير المساحة والسعر (وهم موجودين فوق أصلاً) */}
            
          </div>

          <button onClick={clearFilters} className="text-red-500 font-bold text-sm hover:underline">❌ مسح كل الفلاتر</button>
        </div>

        {/* عرض النتائج */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h2 className="text-2xl font-bold text-gray-400">لا توجد عقارات بهذه المواصفات 🔍</h2>
            <button onClick={clearFilters} className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-full font-bold">عرض الكل</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map(item => (
              <div key={item._id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-500 border border-gray-100 flex flex-col group">
                
                {/* السلايدر */}
                <div className="relative h-72 bg-slate-100">
                  <div className="absolute top-4 right-4 z-20 pointer-events-none flex gap-2">
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {item.type === 'apartment' ? 'شقة' : item.type === 'villa' ? 'فيلا' : item.type === 'land' ? 'أرض' : item.type === 'building' ? 'عمارة' : 'محل'}
                    </span>
                  </div>
                  
                  <Link to={`/property/${item._id}`} className="block h-full w-full">
                      {item.images && item.images.length > 0 ? (
                        <Slider {...sliderSettings} className="h-full">
                          {item.images.map((mediaUrl, index) => (
                            <div key={index} className="h-72 outline-none">
                              {isVideo(mediaUrl) ? (
                                <video className="w-full h-full object-cover bg-black pointer-events-none"><source src={mediaUrl}/></video>
                              ) : (
                                <img src={mediaUrl} alt="prop" className="w-full h-full object-cover" />
                              )}
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        <img src="https://via.placeholder.com/400" className="w-full h-full object-cover opacity-50" alt="placeholder" />
                      )}
                  </Link>
                  <div className="absolute bottom-4 left-0 bg-slate-900/90 text-white px-6 py-2 rounded-r-full font-bold text-xl z-20 pointer-events-none">
                    {Number(item.price).toLocaleString()} ج.م
                  </div>
                </div>

                {/* تفاصيل الكارت الذكية (بتتغير حسب النوع برضه) */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <Link to={`/property/${item._id}`} className="block">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 line-clamp-1 hover:text-amber-600 transition">{item.title}</h3>
                    <p className="text-gray-500 mb-4 flex items-center gap-1">📍 {item.location}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm font-bold text-gray-700 bg-slate-50 p-3 rounded-xl mb-4">
                      <span>📐 {item.area} م²</span>
                      
                      {/* عرض مواصفات الشقق والفلل */}
                      {['apartment', 'villa'].includes(item.type) && (
                         <>
                           {item.rooms && <span>🛏️ {item.rooms} غرف</span>}
                           {item.level && <span>📶 دور {item.level}</span>}
                         </>
                      )}

                      {/* عرض مواصفات العمارة */}
                      {item.type === 'building' && (
                         <>
                           <span>🏢 {item.floorsCount} أدوار</span>
                           <span>🔑 {item.apartmentsCount} شقة</span>
                         </>
                      )}

                      {/* عرض مواصفات الأرض */}
                      {item.type === 'land' && item.landType && (
                         <span className="text-green-700">🌱 {item.landType === 'residential' ? 'مباني' : item.landType === 'agricultural' ? 'زراعية' : item.landType}</span>
                      )}
                    </div>
                  </Link>

                  <Link to={`/property/${item._id}`} className="w-full block bg-slate-900 text-white py-3 rounded-xl text-center font-bold hover:bg-amber-600 transition">
                    التفاصيل 👁️
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Properties;