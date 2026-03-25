// server.js

const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch@2
const cors = require('cors');
const multer = require('multer');
const upload = multer();
// --- Audio/Text Feature Extraction Endpoint ---
app.post('/extract_features', upload.single('audio'), async (req, res) => {
  // Accepts audio, text, or both
  const text = req.body.text;
  const hasAudio = !!req.file;
  const hasText = !!text;

  // Dummy feature extraction logic
  let features = {};
  let source = [];
  if (hasAudio) {
    source.push('audio');
    features = {
      ...features,
      energy: 0.7,
      pitchMean: 0.4,
      pitchVariance: 0.1,
      speechRate: 0.6,
      pauseRatio: 0.2,
      spectralCentroid: 0.5
    };
  }
  if (hasText) {
    source.push('text');
    // Dummy text-based emotion (could be replaced with real NLP)
    features = {
      ...features,
      sentiment: 'neutral',
      valence: 0.5,
      arousal: 0.5
    };
  }
  if (hasAudio || hasText) {
    return res.json({
      source: source.join('+'),
      features
    });
  }
  res.status(400).json({ error: 'No audio or text provided' });
});
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const HF_TOKEN = process.env.HF_API_KEY; // Your Hugging Face API token

app.post('/chat', async (req, res) => {
  console.log('[POST /chat] Incoming request body:', req.body);

  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided' });

    // Compose prompt for the model
    const systemPrompt = `You are an NVC (Nonviolent Communication) coach.\n1. Identify:\nObservation:\nFeeling:\nNeed:\nRequest:\n2. If missing elements, explain what’s missing.\n3. Suggest a better NVC phrasing.\n4. Respond briefly and clearly.`;
    const fullPrompt = `${systemPrompt}\nUser said: "${message}"`;

    // Use Hugging Face Inference API endpoint for the model
    const hfRes = await fetch(
      'https://api-inference.huggingface.co/models/katanemo/Arch-Router-1.5B',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          options: { wait_for_model: true }
        })
      }
    );

    // Handle non-JSON error responses
    let data;
    let text;
    try {
      data = await hfRes.json();
    } catch (err) {
      text = await hfRes.text();
      console.error('[POST /chat] HF Inference error response (not JSON):', text);
      return res.status(500).json({ error: text });
    }

    if (!hfRes.ok) {
      console.error('[POST /chat] HF Inference error response:', data);
      return res.status(500).json({ error: data.error || data || 'Unknown error from Hugging Face' });
    }

    console.log('[POST /chat] HF Inference response:', data);
    res.json(data);
  } catch (error) {
    console.error('[POST /chat] Handler error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));

const multer = require('multer');
const upload = multer();

app.post('/extract_features', upload.single('audio'), async (req, res) => {
  // Accepts either audio or text
  const text = req.body.text;
  // For now, just return dummy features
  if (text) {
    return res.json({
      source: 'text',
      features: {
        sentiment: 'neutral',
        valence: 0.5,
        arousal: 0.5
      }
    });
  }
  if (req.file) {
    // You would process req.file.buffer (audio data) here
    return res.json({
      source: 'audio',
      features: {
        energy: 0.7,
        pitchMean: 0.4,
        pitchVariance: 0.1,
        speechRate: 0.6,
        pauseRatio: 0.2,
        spectralCentroid: 0.5
      }
    });
  }
  res.status(400).json({ error: 'No audio or text provided' });
});