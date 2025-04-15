import express from 'express';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Use the stealth plugin to help evade detection
puppeteer.use(StealthPlugin());

const app = express();
const port = 3000;

app.use(express.json());

// Your Puppeteer fetch route
app.post('/fetch', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  try {
    // Launch Puppeteer with stealth enabled
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Navigate to the URL and wait until the network is idle
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Get the page's HTML content
    const content = await page.content();

    await browser.close();

    res.json({ content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch content from URL using Puppeteer.' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
