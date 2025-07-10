import express from 'express';
import axios from 'axios';

const router = express.Router();

const CLIENT_ID = process.env.FB_APP_ID;
const CLIENT_SECRET = process.env.FB_APP_SECRET;
const REDIRECT_URI = "https://localhost:5000/facebook-auth/callback"; // Change this to your actual redirect URI
'https://demo-sandy-kappa-70.vercel.app/facebook-auth/callback';


router.get('/callback', async (req, res) => {
  console.log('HIT CALLBACK ROUTE'); // ✅ Add this
  console.log('Query:', req.query);  // ✅ Add this
  const code = req.query.code;
  console.log(code)

  if (!code) return res.status(400).send('Missing authorization code');

  try {
    const tokenRes = await axios.get('https://graph.facebook.com/v23.0/oauth/access_token', {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code: code,
      },
    });

    const accessToken = tokenRes.data.access_token;
    console.log('Access Token:', accessToken);

    res.json({ message: 'Login successful', access_token: accessToken });
  } catch (err) {
    console.error('Token exchange error:', err.response?.data || err.message);
    res.status(500).send('Facebook token exchange failed');
  }
});

export default router;
