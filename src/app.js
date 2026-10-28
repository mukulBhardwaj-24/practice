const path = require('path');
const os = require('os');
const express = require('express');
const config = require('./config');

const app = express();
const startedAt = new Date();

// In-memory notes. They disappear on every restart - you'll see why that matters later.
const notes = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Health check: load balancers and orchestrators call this to ask "are you alive?"
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Info: tells you WHICH build is running WHERE. Very handy once you deploy.
app.get('/api/info', (req, res) => {
  res.json({
    greeting: config.greeting,
    environment: config.appEnv,
    version: config.appVersion,
    hostname: os.hostname(),
    nodeVersion: process.version,
    startedAt: startedAt.toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  });
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const text = (req.body && req.body.text || '').trim();
  if (!text) {
    return res.status(400).json({ error: 'text is required' });
  }
  const note = { id: notes.length + 1, text, createdAt: new Date().toISOString() };
  notes.push(note);
  res.status(201).json(note);
});

module.exports = app;
