import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeamManager() {
  const [members, setMembers] = useState([]);
  // ضفنا phone هنا
  const [form, setForm] = useState({ name: '', role: '', phone: '', image: '', bio: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    const res = await axios.get('http://localhost:5000/api/team');
    setMembers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/team/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/team', form);
    }
    setForm({ name: '', role: '', phone: '', image: '', bio: '' });
    setEditId(null);
    fetchMembers();
    alert('تم الحفظ! ✅');
  };

  const handleEdit = (member) => { setForm(member); setEditId(member._id); };

  const handleDelete = async (id) => {
    if (window.confirm('حذف؟')) {
      await axios.delete(`http://localhost:5000/api/team/${id}`);
      fetchMembers();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-4">👥 إدارة فريق العمل</h2>

      <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-xl border mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="الاسم" className="p-2 border rounded" required />
        <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="المسمى (مثال: تخصص أراضي)" className="p-2 border rounded" required />
        
        {/* خانة الهاتف الجديدة */}
        <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="رقم الهاتف" className="p-2 border rounded dir-ltr" />
        
        <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="رابط الصورة" className="p-2 border rounded dir-ltr" />
        <input value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} placeholder="نبذة مختصرة" className="p-2 border rounded col-span-2" />
        
        <button type="submit" className={`col-span-2 py-2 rounded text-white font-bold ${editId ? 'bg-amber-600' : 'bg-slate-900'}`}>
          {editId ? 'تحديث البيانات 🔄' : 'إضافة عضو جديد +'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
          <div key={member._id} className="border p-4 rounded-xl flex gap-4 items-center bg-white shadow-sm">
            <img src={member.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} className="w-16 h-16 rounded-full object-cover" alt="img" />
            <div className="flex-1">
              <h4 className="font-bold">{member.name}</h4>
              <p className="text-xs text-amber-600 font-bold">{member.role}</p>
              <p className="text-xs text-gray-500 dir-ltr">{member.phone}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleEdit(member)} className="text-blue-600 text-xs font-bold border px-2 py-1 rounded hover:bg-blue-50">تعديل</button>
                <button onClick={() => handleDelete(member._id)} className="text-red-600 text-xs font-bold border px-2 py-1 rounded hover:bg-red-50">حذف</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamManager;