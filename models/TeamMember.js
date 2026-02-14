const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: String,        // الاسم
  role: String,        // الوظيفة
  phone: String,       // <--- دي الخانة الجديدة المهمة (رقم الهاتف)
  image: String,       // رابط الصورة
  bio: String          // النبذة
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);