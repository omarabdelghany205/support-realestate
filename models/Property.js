const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  type: String, 
  area: Number,
  paymentType: String,
  description: String,
  images: [String],
  amenities: [String],

  // تفاصيل الشقق والعمارات
  rooms: Number, bathrooms: Number, level: Number, 
  apartmentsCount: Number, apartmentArea: Number, floorsCount: Number,
  finishingType: String, license: String,

  // 👇👇 إضافات الأراضي الجديدة 👇👇
  landType: String,      // (سكني / تجاري / صناعي)
  meterPrice: Number,    // سعر المتر
  landInterface: String, // الواجهة (ناصية / وجهة / ممر)
  
  createdAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Property', propertySchema);