import React, { useState, useEffect } from 'react';
import axios from 'axios';

function About() {
  const [data, setData] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/config').then(res => setData(res.data));
    axios.get('http://localhost:5000/api/team').then(res => setTeam(res.data));
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center bg-slate-900 text-white">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden" dir="rtl">
      
      {/* HERO SECTION */}
      <div className="relative h-[60vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.heroImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'})` }}></div>
        <div className="absolute inset-0 bg-slate-900/80"></div>
        <div className="relative z-10 px-6 animate-fade-in-up">
           <div className="inline-block border border-amber-500 text-amber-500 px-6 py-1 rounded-full text-sm font-bold mb-4 tracking-widest">منذ 2020</div>
           <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">{data.heroTitle || "نصنع المستقبل"}</h1>
           <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">{data.heroSubtitle}</p>
        </div>
      </div>

      {/* STORY & VISION SECTION */}
      <div className="container mx-auto px-6 py-20 relative -mt-20 z-20">
        
        {/* كارت "من نحن" */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-12 border border-gray-100">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-amber-500 pr-4">قصة نجاحنا</h2>
            <p className="text-gray-600 leading-9 text-lg text-justify whitespace-pre-line">
              {data.aboutText || "اكتب نص من نحن..."}
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={data.aboutImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa"} className="w-full rounded-3xl shadow-lg object-cover h-80" alt="About" />
          </div>
        </div>

        {/* كارت "الرؤية" (الجديد ✨) */}
        {data.visionText && (
          <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 shadow-2xl text-center relative overflow-hidden">
            {/* زخرفة */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500 rounded-full blur-[80px] opacity-20"></div>

            <div className="relative z-10">
              <div className="text-5xl mb-6">👁️</div>
              <h2 className="text-3xl font-bold text-white mb-6">رؤيتنا للمستقبل</h2>
              <p className="text-gray-300 leading-loose text-xl max-w-4xl mx-auto font-light">
                {data.visionText}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* TEAM SECTION */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-slate-900 mb-2">قيادات الشركة 🏆</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member._id} className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition duration-500 text-center border-t-4 border-amber-500">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-100">
                  <img src={member.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} className="w-full h-full object-cover" alt={member.name} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{member.name}</h3>
                <p className="text-amber-600 font-bold text-sm mb-4">{member.role}</p>
                <p className="text-gray-500 text-sm mb-6">{member.bio}</p>
                {member.phone && <a href={`tel:${member.phone}`} className="inline-block bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-amber-600 transition">📞 تواصل الآن</a>}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;