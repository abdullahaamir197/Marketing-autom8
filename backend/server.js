const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main Root Route
app.get('/', (req, res) => {
    res.send('<h1>Marketing Automation Backend is Running</h1><p>Connected to MongoDB Atlas.</p>');
});


// MongoDB Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/marketing_automation', {
            // mongoose 6+ defaults are good
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Schema Definitions
const campaignSchema = new mongoose.Schema({
    name: String,
    subject: String,
    content: String,
    status: { type: String, default: 'Draft' }, // Draft, Scheduled, Sent
    scheduledAt: Date,
    createdAt: { type: Date, default: Date.now }
});

const audienceSchema = new mongoose.Schema({
    name: String,
    email: String,
    segment: String, // e.g., 'Premium', 'New User'
    engagementScore: { type: Number, default: 0 },
    lastActive: Date
});

const automationSchema = new mongoose.Schema({
    name: String,
    trigger: String, // e.g., 'On Signup', 'On Purchase'
    actions: [String], // Array of descriptions e.g. ['Send Welcome Email', 'Add to newsletter']
    active: { type: Boolean, default: true }
});

const Campaign = mongoose.model('Campaign', campaignSchema);
const Audience = mongoose.model('Audience', audienceSchema);
const Automation = mongoose.model('Automation', automationSchema);

// Routes

// 1. Campaign Rules
app.get('/api/campaigns', async (req, res) => {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
});

app.post('/api/campaigns', async (req, res) => {
    const campaign = await Campaign.create(req.body);
    res.json(campaign);
});

// 2. Audience & Analytics Rules
app.get('/api/audiences', async (req, res) => {
    const audiences = await Audience.find();
    res.json(audiences);
});

app.post('/api/audiences', async (req, res) => {
    const audience = await Audience.create(req.body);
    res.json(audience);
});

// 3. Automation Engine Rules
app.get('/api/automations', async (req, res) => {
    const automations = await Automation.find();
    res.json(automations);
});

app.post('/api/automations', async (req, res) => {
    const automation = await Automation.create(req.body);
    res.json(automation);
});

// Seed Endpoint for easy setup
app.post('/api/seed', async (req, res) => {
    await Campaign.deleteMany({});
    await Audience.deleteMany({});
    await Automation.deleteMany({});

    const campaigns = await Campaign.create([
        { name: 'Welcome Series', subject: 'Welcome to the Future', content: 'Hello...', status: 'Sent', scheduledAt: new Date() },
        { name: 'Black Friday Blast', subject: '50% Off Everything', content: 'Buy now!', status: 'Scheduled', scheduledAt: new Date(Date.now() + 86400000) }
    ]);

    const audiences = await Audience.create([
        { name: 'Alice Doe', email: 'alice@example.com', segment: 'Premium', engagementScore: 95 },
        { name: 'Bob Smith', email: 'bob@example.com', segment: 'New User', engagementScore: 20 },
        { name: 'Charlie Day', email: 'charlie@example.com', segment: 'Inactive', engagementScore: 5 }
    ]);

    const automations = await Automation.create([
        { name: 'New User Onboarding', trigger: 'User Signup', actions: ['Wait 5 mins', 'Send Welcome Email'], active: true },
        { name: 'Re-engagement', trigger: 'Inactive 30 Days', actions: ['Send "We Miss You" Email'], active: false }
    ]);

    res.json({ message: 'Database Seeded', data: { campaigns, audiences, automations } });
});

// Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
