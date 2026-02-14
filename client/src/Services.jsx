import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. استدعاء الرابط مهم جداً

function Services() {
  // بيانات العقارات
  const allProperties = [
    {
      id: 1, title: "شقة لقطة بالتجمع", price: 3500000, location: "التجمع الخامس", type: "apartment",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      area: 150, rooms: 3, floor: "2", hasElevator: true
    },
    {
      id: 2, title: "فيلا بحديقة وحمام سباحة", price: 12000000, location: "الشيخ زايد", type: "villa",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      area: 600, rooms: 5, floorsCount: 2, hasPool: true
    },
    {
      id: 3, title: "أرض زراعية", price: 5000000, location: "طريق مصر اسكندرية", type: "land",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      area: 1000, landType: "agricultural"
    },
    {
      id: 4, title: "عمارة كاملة للبيع", price: 25000000, location: "أكتوبر", type: "building",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
      area: 900, apartmentsCount: 12
    },
    {
      id: 5, title: "شقة أرضي بحديقة", price: 2800000, location: "الشروق", type: "apartment",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      area: 130, rooms: 2, floor: "0", hasElevator: false
    }
  ];

  const [filteredList, setFilteredList] = useState(allProperties);
  const [filters, setFilters] = useState({
    type: 'all', location: '', minPrice: '', maxPrice: '', minArea: '',
    rooms: '', floor: '', hasElevator: false,
    floorsCount: '', hasPool: false,
    landType: '', minApartments: ''
  });

  const applyFilter = () => {
    let result = allProperties;
    if (filters.type !== 'all') result = result.filter(item => item.type === filters.type);
    if (filters.location) result = result.filter(item => item.location.includes(filters.location));
    if (filters.minPrice) result = result.filter(item => item.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter(item => item.price <= Number(filters.maxPrice));
    
    if (filters.type === 'apartment') {
      if (filters.minArea) result = result.filter(item => item.area >= Number(filters.minArea));
      if (filters.rooms) result = result.filter(item => item.rooms == filters.rooms);
      if (filters.floor) result = result.filter(item => item.floor === filters.floor);
      if (filters.hasElevator) result = result.filter(item => item.hasElevator === true);
    }
    if (filters.type === 'villa') {
      if (filters.minArea) result = result.filter(item => item.area >= Number(filters.minArea));
      if (filters.rooms) result = result.filter(item => item.rooms >= Number(filters.rooms));
      if (filters.floorsCount) result = result.filter(item => item.floorsCount == filters.floorsCount);
      if (filters.hasPool) result = result.filter(item => item.hasPool === true);
    }
    if (filters.type === 'land') {
      if (filters.minArea) result = result.filter(item => item.area >= Number(filters.minArea));
      if (filters.landType) result = result.filter(item => item.landType === filters.landType);
    }
    if (filters.type === 'building') {
      if (filters.minArea) result = result.filter(item => item.area >= Number(filters.minArea));
      if (filters.minApartments) result = result.filter(item => item.apartmentsCount >= Number(filters.minApartments));
    }
    setFilteredList(result);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  };

  const renderCardDetails = (item) => {
    if (item.type === 'apartment') return <span className="text-xs bg-gray-100 p-1 rounded">📐 {item.area} م² | 🛏️ {item.rooms} غرف | 🏢 دور {item.floor === '0' ? 'أرضي' : item.floor}</span>;
    if (item.type === 'villa') return <span className="text-xs bg-gray-100 p-1 rounded">📐 {item.area} م² | 🏊 {item.hasPool ? 'يوجد مسبح' : 'لا يوجد'} | 🏰 {item.floorsCount} أدوار</span>;
    if (item.type === 'land') return <span className="text-xs bg-gray-100 p-1 rounded">📐 {item.area} م² | 📜 {item.landType === 'residential' ? 'سكنية' : item.landType === 'agricultural' ? 'زراعية' : 'تجارية'}</span>;
    if (item.type === 'building') return <span className="text-xs bg-gray-100 p-1 rounded">📐 {item.area} م² | 🔑 {item.apartmentsCount} شقة</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <div className="bg-slate-900 text-white py-10 text-center shadow-md">
        <h1 className="text-3xl font-bold">محرك البحث المتطور</h1>
        <p className="text-amber-100/70 mt-2">حدد نوع العقار لتظهر لك الفلاتر المناسبة</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* قسم الفلتر */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-100">
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1 block">نوع العقار</label>
              <select name="type" onChange={handleChange} className="w-full p-3 border-2 border-amber-500/50 rounded-lg font-bold text-slate-900 bg-amber-50">
                <option value="all">كل العقارات</option>
                <option value="apartment">شقق</option>
                <option value="villa">فلل</option>
                <option value="land">أراضي</option>
                <option value="building">عماير</option>
              </select>
            </div>
            <div><label className="text-xs font-bold text-slate-500 mb-1 block">المنطقة</label><input name="location" onChange={handleChange} className="w-full p-3 border rounded-lg"/></div>
            <div><label className="text-xs font-bold text-slate-500 mb-1 block">السعر (من)</label><input name="minPrice" type="number" onChange={handleChange} className="w-full p-3 border rounded-lg"/></div>
            <div><label className="text-xs font-bold text-slate-500 mb-1 block">السعر (إلى)</label><input name="maxPrice" type="number" onChange={handleChange} className="w-full p-3 border rounded-lg"/></div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            {filters.type === 'apartment' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div><label className="text-xs font-bold block mb-1">المساحة (م²)</label><input name="minArea" type="number" onChange={handleChange} className="w-full p-2 border rounded"/></div>
                <div><label className="text-xs font-bold block mb-1">عدد الغرف</label><input name="rooms" type="number" onChange={handleChange} className="w-full p-2 border rounded"/></div>
                <div><label className="text-xs font-bold block mb-1">الدور</label><select name="floor" onChange={handleChange} className="w-full p-2 border rounded"><option value="">أي دور</option><option value="0">أرضي</option><option value="last">أخير</option></select></div>
                <div className="flex items-center gap-2"><input name="hasElevator" type="checkbox" onChange={handleChange}/><label className="font-bold text-sm">يوجد مصعد؟</label></div>
              </div>
            )}
            {/* باقي فلاتر الفلل والأراضي والعماير نفس الكود السابق... */}
            
            <div className="mt-4 flex justify-end">
              <button onClick={applyFilter} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-600 transition shadow-lg w-full md:w-auto">بحث بالمواصفات 🔍</button>
            </div>
          </div>
        </div>

        {/* عرض النتائج */}
        {filteredList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"><h2 className="text-2xl font-bold">لا توجد نتائج</h2></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredList.map((item) => (
              // 2. هنا التغيير المهم: حولنا الـ div إلى Link
              <Link to={`/property/${item.id}`} key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 border border-slate-100 group block">
                <div className="relative h-60 overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={item.title}/>
                  <div className="absolute top-3 right-3 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                    {item.type === 'apartment' ? 'شقة' : item.type === 'villa' ? 'فيلا' : item.type === 'land' ? 'أرض' : 'عمارة'}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">📍 {item.location}</p>
                  <div className="mb-4">{renderCardDetails(item)}</div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                    <span className="text-amber-600 font-bold text-lg">{item.price.toLocaleString()} ج.م</span>
                    <span className="text-slate-900 text-sm font-bold bg-slate-100 px-3 py-1 rounded-full">عرض التفاصيل ←</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;