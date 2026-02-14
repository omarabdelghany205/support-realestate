import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/properties/${id}`)
      .then(res => { setProperty(res.data); setLoading(false); })
      .catch(err => setLoading(false));
  }, [id]);

  const sliderSettings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold">جاري التحميل...</div>;
  if (!property) return <div className="h-screen flex items-center justify-center text-red-500">غير موجود</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20" dir="rtl">
      <div className="bg-slate-900 text-white p-4"><Link to="/properties" className="text-amber-500 font-bold">⬅️ رجوع</Link></div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-black h-[50vh]">
             <Slider {...sliderSettings} className="h-full">
                {property.images?.map((url, i) => (
                    <div key={i} className="h-[50vh] flex items-center justify-center"><img src={url} className="h-full w-full object-contain"/></div>
                ))}
             </Slider>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-black mb-2">{property.title}</h1>
            <p className="text-gray-500 mb-6">📍 {property.location}</p>
            <div className="bg-amber-500 text-white px-6 py-2 rounded-xl font-bold text-2xl w-fit mb-8">{Number(property.price).toLocaleString()} ج.م</div>

            {/* جدول المواصفات الذكي */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              
              <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                <span className="block text-blue-500 text-xs font-bold">المساحة</span>
                <span className="block text-2xl font-black">{property.area} م²</span>
              </div>

              {/* تفاصيل الأرض */}
              {property.type === 'land' && (
                <>
                  <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
                    <span className="block text-green-500 text-xs font-bold">سعر المتر</span>
                    <span className="block text-xl font-black">{property.meterPrice} ج.م</span>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
                    <span className="block text-purple-500 text-xs font-bold">الواجهة</span>
                    <span className="block text-xl font-black">{property.landInterface === 'corner' ? 'ناصية' : property.landInterface === 'facade' ? 'وجهة' : 'وجهتين'}</span>
                  </div>
                </>
              )}

              {/* تفاصيل العمارة */}
              {property.type === 'building' && (
                <>
                  <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
                    <span className="block text-orange-500 text-xs font-bold">عدد الشقق</span>
                    <span className="block text-xl font-black">{property.apartmentsCount}</span>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
                    <span className="block text-orange-500 text-xs font-bold">الأدوار</span>
                    <span className="block text-xl font-black">{property.floorsCount}</span>
                  </div>
                </>
              )}

              {/* تفاصيل السكن */}
              {['apartment', 'villa', 'duplex'].includes(property.type) && property.rooms && (
                 <div className="bg-amber-50 p-4 rounded-xl text-center border border-amber-100">
                    <span className="block text-amber-500 text-xs font-bold">الغرف</span>
                    <span className="block text-xl font-black">{property.rooms}</span>
                 </div>
              )}

              <div className={`p-4 rounded-xl text-center border ${property.paymentType === 'installment' ? 'bg-purple-50' : 'bg-green-50'}`}>
                  <span className="block text-xs font-bold text-gray-500">الدفع</span>
                  <span className="block text-xl font-black">{property.paymentType === 'installment' ? 'تقسيط' : 'كاش'}</span>
              </div>

            </div>
            
            {/* المميزات */}
            {property.amenities?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {property.amenities.map((f, i) => <span key={i} className="bg-slate-100 px-3 py-1 rounded-full font-bold text-sm">✅ {f}</span>)}
              </div>
            )}

            <p className="text-gray-600 leading-8 mb-8">{property.description}</p>

            <a href="tel:01006405527" className="block bg-slate-900 text-white py-4 rounded-xl text-center font-bold text-lg">📞 اتصل الآن</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;