import React from 'react';

function Contact() {
  // بيانات فريق العمل (تم التحديث حسب رسالتك الأخيرة)
  const contacts = [
    {
      name: "أ. عمرو",
      role: "تنفيذ وإشراف وتشطيبات (أراضي وشقق)",
      phone: "01006405527",
      icon: "🏗️", // أيقونة تعبر عن الإنشاءات
      theme: "amber" 
    },
    {
      name: "م. علاء الشيتي",
      role: "تخصص أراضي ومساحات",
      phone: "01005193244",
      icon: "🗺️", // أيقونة تعبر عن الأراضي
      theme: "blue"
    },
    {
      name: "أ. أحمد الشولحي",
      role: "مبيعات وتسويق عقاري",
      phone: "01122703508",
      icon: "🤝", // أيقونة تعبر عن التعاملات
      theme: "green"
    }
  ];

  // الروابط اللي بعتها
  const facebookLink = "https://www.facebook.com/share/1aLRsUnA65/?mibextid=wwXIfr";
  const mapLink = "https://maps.app.goo.gl/QFW5gd2G87ZBNNTa9?g_st=aw"; 

  // دالة مساعدة لتحديد ألوان الكروت
  const getThemeClasses = (theme) => {
    const themes = {
      amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-500', btn: 'bg-amber-600 hover:bg-amber-700', iconBg: 'bg-amber-100' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-500', btn: 'bg-blue-600 hover:bg-blue-700', iconBg: 'bg-blue-100' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-500', btn: 'bg-green-600 hover:bg-green-700', iconBg: 'bg-green-100' },
    };
    return themes[theme] || themes.amber;
  };

  return (
    <div className="min-h-screen bg-white font-sans" dir="rtl">
      
      {/* ================= HERO SECTION ================= */}
      <div 
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/30"></div>
        <div className="relative z-10 px-6 -mt-20">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
            نحن هنا <span className="text-amber-500">لخدمتك</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            تواصل مباشرة مع الخبير المختص باحتياجاتك العقارية.
          </p>
        </div>
      </div>

      {/* ================= CONTACT CARDS ================= */}
      <div className="container mx-auto px-6 relative z-20 -mt-32 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contacts.map((contact, index) => {
            const theme = getThemeClasses(contact.theme);
            return (
              <div key={index} className={`bg-white rounded-[2rem] p-8 shadow-2xl border-t-8 ${theme.border} hover:-translate-y-4 transition-all duration-500 group relative overflow-hidden`}>
                
                {/* خلفية زخرفية */}
                <div className={`absolute top-0 left-0 w-full h-32 ${theme.bg} opacity-50 -z-10 rounded-b-[50%] transform -translate-y-1/2 group-hover:scale-110 transition duration-700`}></div>
                
                {/* الأيقونة */}
                <div className={`w-24 h-24 ${theme.iconBg} mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg text-5xl group-hover:rotate-12 transition duration-300`}>
                  {contact.icon}
                </div>
                
                {/* البيانات */}
                <h3 className="text-3xl font-black text-slate-800 mb-2 text-center">{contact.name}</h3>
                <p className={`${theme.text} font-bold text-sm tracking-wider uppercase mb-8 text-center min-h-[40px]`}>{contact.role}</p>
                
                {/* الأزرار */}
                <div className="space-y-4">
                  <a 
                    href={`tel:${contact.phone}`} 
                    className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all duration-300 ${theme.btn} hover:shadow-xl`}
                  >
                    <span>📞</span>
                    <span>اتصال مباشر</span>
                  </a>
                  
                  <a 
                    href={`https://wa.me/20${contact.phone.replace(/^0+/, '').replace(/\s/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-slate-100 text-slate-900 font-bold text-lg border-2 border-slate-200 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300"
                  >
                    <span className="text-2xl">💬</span>
                    <span>واتساب</span>
                  </a>
                </div>
                
                <p className="text-center text-gray-400 text-sm mt-6 dir-ltr font-mono">{contact.phone}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FACEBOOK BANNER ================= */}
      <div className="bg-slate-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center md:text-right flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">تابع أحدث الفرص العقارية 🌐</h2>
            <p className="text-gray-400 text-lg">انضم لصفحتنا الرسمية على فيسبوك ليصلك كل جديد.</p>
          </div>
          <a 
            href={facebookLink} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#1877F2] text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition shadow-lg hover:shadow-blue-500/50 shrink-0"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            زيارة الصفحة
          </a>
        </div>
      </div>

      {/* ================= MAP SECTION ================= */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">تفضل بزيارتنا 📍</h2>
            <p className="text-gray-500 mt-2 text-lg">مقر الشركة</p>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white h-[500px]">
            {/* خريطة جوجل افتراضية - سيتم فتح الموقع الدقيق عند الضغط على الزر */}
            <iframe 
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.244322476722!2d31.21404131511476!3d30.03020698188737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAxJzQ4LjciTiAzMcKwMTInNTguNCJF!5e0!3m2!1sen!2seg!4v1633000000000!5m2!1sen!2seg"
              className="w-full h-full border-0 filter grayscale-[30%] hover:grayscale-0 transition duration-1000 scale-105 hover:scale-100"
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
            
            <div className="absolute bottom-8 right-8">
               <a 
                 href={mapLink} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:bg-amber-500 hover:text-white transition flex items-center gap-3 ring-4 ring-slate-900/10"
               >
                 <span>🗺️</span>
                 <span>فتح موقع المكتب</span>
               </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Contact;