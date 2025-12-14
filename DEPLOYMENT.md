# 🚀 Godmisoft CV Maker - Deployment Guide

## Quick Deploy to Vercel (RECOMMENDED)

### Option 1: Vercel CLI (Fastest)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project folder
cd godmisoft-cv-maker

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project's name? godmisoft-cv-maker
# - In which directory is your code located? ./
# - Want to modify settings? No

# Deploy to production
vercel --prod
```

### Option 2: Vercel Website (No CLI needed)
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import from Git or upload the `godmisoft-cv-maker` folder
5. Keep all default settings
6. Click "Deploy"
7. Wait 1-2 minutes for deployment
8. Your app will be live at: `https://your-project.vercel.app`

## Alternative Deployments

### Deploy to Netlify
1. Go to https://app.netlify.com
2. Drag and drop the `godmisoft-cv-maker` folder
3. Site will be deployed instantly
4. URL: `https://random-name.netlify.app`

### Deploy to GitHub Pages
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit - Godmisoft CV Maker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cv-maker.git
git push -u origin main

# Enable GitHub Pages
# Go to Settings → Pages → Select main branch → Save
# URL: https://YOUR_USERNAME.github.io/cv-maker/
```

### Deploy to Railway
1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repository
5. Railway auto-deploys on push

## Testing Locally

### Simple HTTP Server (Python)
```bash
cd godmisoft-cv-maker
python -m http.server 8000
# Open: http://localhost:8000
```

### Node.js Server
```bash
cd godmisoft-cv-maker
npx http-server -p 8000
# Open: http://localhost:8000
```

### Live Server (VS Code Extension)
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## PWA Installation After Deployment

Once deployed, users can install the app:

### On Mobile (Android/iOS)
1. Visit the deployed URL
2. Click "Add to Home Screen" from browser menu
3. App icon will appear on home screen

### On Desktop (Chrome/Edge)
1. Visit the deployed URL
2. Click install button in address bar
3. OR click "Install App" button in the app
4. App opens in standalone window

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. SSL automatically configured

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records
4. SSL auto-configured

## Environment Variables (None Required)
This app runs completely client-side with no backend, so no environment variables are needed!

## Post-Deployment Checklist

✅ Test all 50 templates
✅ Test CV data save/load
✅ Test PDF download
✅ Test photo upload
✅ Test PWA install button
✅ Test on mobile devices
✅ Test offline functionality
✅ Verify all forms work correctly

## Performance Optimization (Already Done)

✅ Minified CSS/JS would improve load time (optional)
✅ Service Worker caching enabled
✅ PWA manifest configured
✅ Responsive images
✅ Lazy loading where possible

## Troubleshooting

### PDF Download Not Working
- Check if jsPDF and html2canvas libraries loaded
- Check browser console for errors
- Ensure popup blockers are disabled

### PWA Not Installing
- Must be served over HTTPS (Vercel/Netlify provide this)
- Check manifest.json is accessible
- Verify service worker registered

### Templates Not Showing
- Check templates.js loaded correctly
- Clear browser cache
- Check console for JavaScript errors

## Support

For issues or questions:
- Check browser console (F12) for errors
- Verify all files uploaded correctly
- Test in different browsers
- Clear cache and try again

---

**Built by Godmisoft** 🎨
**Deploy Time:** ~2 minutes
**Zero Configuration Required!**
