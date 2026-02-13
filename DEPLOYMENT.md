# 🚀 Deployment Guide - Valentine's Game

## Quick Testing (Local)

Your game is already running at: **http://localhost:3000**

Just open this URL in your browser to test!

---

## 📱 Deploy to Vercel (Recommended - FREE)

Vercel is the easiest way to deploy Next.js apps and it's completely FREE!

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Valentine's game for Nibi 💝"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy" (Vercel auto-detects Next.js settings)
6. Wait 2-3 minutes... Done! 🎉

You'll get a URL like: `https://your-game.vercel.app`

---

## 🌐 Deploy to Netlify (Alternative - FREE)

### Step 1: Build Settings

Add to `package.json` (already done):
```json
"scripts": {
  "build": "next build",
  "start": "next start"
}
```

### Step 2: Deploy

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

---

## 📲 Share with Her

Once deployed, you'll get a URL like:
- `https://nibi-valentine-game.vercel.app` (Vercel)
- `https://nibi-valentine-game.netlify.app` (Netlify)

**Share this link with her on Valentine's Day!** 💝

---

## ✨ Important Tips

### Before Sharing:

1. **Test on Mobile**: Open the link on your phone and test in landscape mode
2. **Check Images**: Make sure char1.png and char2.png are displaying correctly
3. **Test Login**: Try logging in with "Nibi" and her birthdate
4. **Play the Game**: Make sure all features work (hearts, obstacles, sounds)

### On Valentine's Day:

1. Send her the link with a romantic message
2. Tell her to rotate her phone to landscape mode
3. Watch her try to score 100 😄
4. Enjoy her reaction when she loses and the Valentine message appears! ❤️

---

## 🔧 Troubleshooting

**Images not showing?**
- Make sure char1.png and char2.png are in the `/public` folder
- Check if images are transparent PNG files

**Game too laggy?**
- Reduce the number of items spawned (edit GameScreen.jsx)
- Lower the spawn frequency in the `setInterval` timings

**Want to make it easier/harder?**
- Edit `gameSpeed` initial value in GameScreen.jsx
- Adjust score deduction frequency and amounts
- Change obstacle spawn rates

---

## 💝 Final Checklist

- [ ] Game tested locally
- [ ] Images display correctly
- [ ] Login works with "Nibi" and "19 May 2003"
- [ ] Game runs smoothly on mobile
- [ ] Sound effects working (or muted if needed)
- [ ] Deployed to Vercel/Netlify
- [ ] URL is working and accessible
- [ ] Tested on mobile device
- [ ] Ready to share! 🎉

---

**Good luck! She's going to love it! 💕**
