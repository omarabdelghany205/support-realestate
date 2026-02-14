// server/models/SiteConfig.js
const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  // بيانات التواصل
  phoneNumber: String,
  whatsappNumber: String,
  address: String,
  facebookUrl: String,
  
  // الصفحة الرئيسية
  heroTitle: String,
  heroSubtitle: String,
  heroImage: String,
  
  // صفحة من نحن
  aboutText: String,
  aboutImage: String,
  visionText: String // <--- دي الخانة الجديدة (الرؤية)
});

module.exports = mongoose.model('SiteConfig', siteConfigSchema);