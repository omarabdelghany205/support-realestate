import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="font-sans text-slate-900" dir="rtl">
      
      {/* --- 1. Hero Section: الواجهة الرئيسية --- */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* خلفية صورة عالية الجودة */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-900/90"></div>
        </div>

        {/* المحتوى */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
          <div className="inline-block border border-amber-500/50 bg-slate-950/50 backdrop-blur-md rounded-full px-8 py-2 mb-8 animate-fade-in-down shadow-lg shadow-amber-900/20">
             <span className="text-amber-400 font-bold tracking-widest text-sm uppercase">SINCE 2020</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
            نخبة العقارات <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">بأنظمة تقسيط</span> استثنائية
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            نفتح لك أبواب التملك في أرقى المواقع الاستراتيجية في مصر.
            <br />
            <span className="text-amber-500 font-bold">(أراضي - فيلات - عماير - شقق سكنية)</span>
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <Link to="/properties" className="group relative px-12 py-5 bg-amber-600 rounded-xl overflow-hidden shadow-2xl shadow-amber-600/30 transition-all hover:scale-105">
               <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
               <span className="relative text-white font-bold text-xl">تصفح الوحدات المتاحة 🏠</span>
            </Link>
            
            {/* تم تغيير الزرار ليوجه لصفحة التواصل بدلاً من الواتساب */}
            <Link to="/contact" className="px-12 py-5 rounded-xl border border-white/30 text-white font-bold text-xl hover:bg-white hover:text-slate-900 transition backdrop-blur-sm">
              طلب استشارة مجانية
            </Link>
          </div>
        </div>
      </div>

      {/* --- 2. شريط المناطق --- */}
      <div className="bg-amber-500 py-4 overflow-hidden shadow-lg relative z-20">
        <div className="flex gap-12 justify-center items-center text-slate-900 font-bold text-lg tracking-wider">
           <span>✦ الشيخ زايد</span>
           <span>✦ التجمع الخامس</span>
           <span>✦ العاصمة الإدارية</span>
           <span>✦ أكتوبر</span>
           <span>✦ الشيخ زايد</span>
           <span>✦ التجمع الخامس</span>
        </div>
      </div>

      {/* --- 3. أقسامنا --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">ماذا نقدم لك؟</h2>
            <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-4 text-lg">محفظة عقارية متنوعة تناسب أهدافك السكنية والاستثمارية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* كارت 1: أراضي */}
             <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition duration-500">
               <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000')"}}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition"></div>
               <div className="absolute bottom-0 p-8">
                 <div className="text-amber-500 text-4xl mb-3">🌍</div>
                 <h3 className="text-2xl font-bold text-white mb-2">أراضي استثمارية</h3>
                 <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition duration-500 translate-y-4 group-hover:translate-y-0">مواقع متميزة صالحة للبناء الفوري بأوراق قانونية كاملة.</p>
               </div>
             </div>

             {/* كارت 2: شقق */}
             <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition duration-500">
               <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000')"}}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition"></div>
               <div className="absolute bottom-0 p-8">
                 <div className="text-amber-500 text-4xl mb-3">🏢</div>
                 <h3 className="text-2xl font-bold text-white mb-2">شقق فاخرة</h3>
                 <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition duration-500 translate-y-4 group-hover:translate-y-0">مساحات متنوعة وتشطيبات عالمية تناسب ذوقك الرفيع.</p>
               </div>
             </div>

             {/* كارت 3: فيلات */}
             <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition duration-500">
               <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{backgroundImage: "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000')"}}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition"></div>
               <div className="absolute bottom-0 p-8">
                 <div className="text-amber-500 text-4xl mb-3">🏰</div>
                 <h3 className="text-2xl font-bold text-white mb-2">فيلات وقصور</h3>
                 <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition duration-500 translate-y-4 group-hover:translate-y-0">الخصوصية والرفاهية في أرقى الكمبوندات السكنية.</p>
               </div>
             </div>

             {/* كارت 4: عماير */}
             <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition duration-500">
               <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000')"}}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition"></div>
               <div className="absolute bottom-0 p-8">
                 <div className="text-amber-500 text-4xl mb-3">🏗️</div>
                 <h3 className="text-2xl font-bold text-white mb-2">عماير كاملة</h3>
                 <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition duration-500 translate-y-4 group-hover:translate-y-0">فرص استثمارية للشركات وكبار المستثمرين بعائد ضخم.</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 4. سكشن التميز --- */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
           <div className="md:w-1/2">
             <div className="relative">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
               <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1000" className="relative rounded-2xl shadow-2xl border-b-8 border-amber-500" alt="Deal" />
             </div>
           </div>
           
           <div className="md:w-1/2">
             <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
               لا تدع المال يقف عائقاً أمام <span className="text-amber-600">حلمك</span>
             </h2>
             <p className="text-lg text-gray-600 mb-8 leading-8">
               في Support Real Estate، نفهم تحديات السوق. لذلك ابتكرنا أنظمة سداد مرنة وحصرية:
             </p>

             <ul className="space-y-6">
               <li className="flex items-start gap-4">
                 <div className="bg-slate-900 text-amber-500 p-3 rounded-lg font-bold text-xl">01</div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-lg">أطول فترة سداد</h3>
                   <p className="text-gray-500">أنظمة تقسيط تصل إلى سنوات متعددة بدون فوائد بنكية مركبة.</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="bg-slate-900 text-amber-500 p-3 rounded-lg font-bold text-xl">02</div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-lg">مقدمات مرنة</h3>
                   <p className="text-gray-500">ادفع مقدم بسيط واستلم وحدتك، وقسط الباقي من دخلك.</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="bg-slate-900 text-amber-500 p-3 rounded-lg font-bold text-xl">03</div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-lg">استلام فوري</h3>
                   <p className="text-gray-500">وحدات جاهزة للسكن أو الاستثمار فور التعاقد.</p>
                 </div>
               </li>
             </ul>
             
             <div className="mt-10">
               {/* تم تغيير الرابط لصفحة التواصل */}
               <Link to="/contact" className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-amber-600 transition shadow-lg inline-block">
                 اسأل عن نظام التقسيط المناسب لك ←
               </Link>
             </div>
           </div>
        </div>
      </section>

      {/* --- 5. Call to Action النهائي --- */}
      <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">جاهز لاستلام مفتاحك؟</h2>
          <p className="text-xl text-gray-400 mb-10">فريقنا بانتظارك لتقديم أفضل العروض الحصرية</p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
             {/* تم إزالة الأرقام ووضع زرار تواصل معنا عام */}
             <Link to="/contact" className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2">
               تواصل معنا الآن 📞
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;