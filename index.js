const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Property = require('./models/Property');
const SiteConfig = require('./models/SiteConfig');
const TeamMember = require('./models/TeamMember');

const app = express();
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
const MONGO_URI = "mongodb+srv://admin:support202067@cluster0.rerwa7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to Database Successfully!'))
  .catch(err => console.error('❌ Connection Error:', err));

// ================= ROUTES =================

// 1. العقارات
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 👇👇 الرابط الجديد المهم جداً 👇👇
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/properties', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.json(newProperty);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/properties/:id', async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/properties/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 2. الإعدادات
app.get('/api/config', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) { config = new SiteConfig(); await config.save(); }
    res.json(config);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/config', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) config = new SiteConfig();
    Object.assign(config, req.body);
    await config.save();
    res.json(config);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 3. فريق العمل
app.get('/api/team', async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/team', async (req, res) => {
  try {
    const newMember = new TeamMember(req.body);
    await newMember.save();
    res.json(newMember);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/team/:id', async (req, res) => {
  try {
    const updated = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));