// server.js
const express = require('express');
const fetch = require('node-fetch'); // Ensure node-fetch is installed: npm install node-fetch@2
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const HF_TOKEN = process.env.HF_API_KEY; 


app.post('/chat', async (req, res) => {
  // Log every incoming request body
  console.log('[POST /chat] Incoming request body:', req.body);
  try {
    const { message } = req.body;
    let hfRes, data;
    try {
      hfRes = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-large', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: message })
      });
      data = await hfRes.json();
      // Log Hugging Face response
      console.log('[POST /chat] Hugging Face response:', data);
    } catch (hfError) {
      console.error('[POST /chat] Error calling Hugging Face:', hfError);
      return res.status(500).json({ error: 'Hugging Face request failed', details: hfError.message });
    }
    res.json(data);
  } catch (error) {
    // Log any other errors
    console.error('[POST /chat] Handler error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
