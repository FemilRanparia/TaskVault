# 🔧 Deployment Troubleshooting Guide

Common issues and solutions when deploying Task Vault.

---

## 🚨 Common Issues

### 1. CORS Errors

**Symptoms:**
- Browser console shows: `Access to XMLHttpRequest blocked by CORS policy`
- API calls fail with CORS errors
- Network tab shows failed requests

**Solutions:**

#### Solution A: Check FRONTEND_URL in Render
1. Go to Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Verify `FRONTEND_URL` matches your Vercel URL **exactly**
   - ✅ Correct: `https://task-vault.vercel.app`
   - ❌ Wrong: `https://task-vault.vercel.app/`
   - ❌ Wrong: `http://task-vault.vercel.app`
5. Save and redeploy

#### Solution B: Verify CORS Configuration
Check `server/src/index.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

#### Solution C: Allow Multiple Origins
If you have multiple frontend URLs (preview, production):
```javascript
const allowedOrigins = [
  'https://task-vault.vercel.app',
  'https://task-vault-preview.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

---

### 2. API Calls Failing / 404 Errors

**Symptoms:**
- API calls return 404
- Network tab shows wrong URL
- "Cannot GET /api/..." errors

**Solutions:**

#### Solution A: Check VITE_API_URL in Vercel
1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify `VITE_API_URL` is correct:
   - ✅ Correct: `https://task-vault-backend.onrender.com/api`
   - ❌ Wrong: `https://task-vault-backend.onrender.com`
   - ❌ Wrong: Missing `/api` at the end
5. Redeploy frontend

#### Solution B: Verify API Configuration
Check `client/src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});
```

#### Solution C: Check Backend Routes
Verify routes in `server/src/index.js`:
```javascript
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
```

---

### 3. Backend Takes Forever to Respond (Cold Starts)

**Symptoms:**
- First request takes 30-60 seconds
- Subsequent requests are fast
- Happens after 15 minutes of inactivity

**Why This Happens:**
Render's free tier spins down services after 15 minutes of inactivity to save resources.

**Solutions:**

#### Solution A: Accept It (Free Tier)
This is expected behavior on free tier. First load will be slow.

#### Solution B: Keep Service Warm (Free)
Use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 5 minutes:
1. Sign up at uptimerobot.com
2. Create new monitor
3. Monitor Type: HTTP(s)
4. URL: Your Render backend URL
5. Monitoring Interval: 5 minutes

⚠️ **Note**: This uses your 750 hours faster, but keeps service responsive.

#### Solution C: Upgrade to Paid Tier ($7/month)
Render's paid tier keeps services always on with no cold starts.

---

### 4. Database Connection Failed

**Symptoms:**
- Backend logs show: `MongoServerError: Authentication failed`
- Backend logs show: `MongooseError: Connection failed`
- API returns 500 errors

**Solutions:**

#### Solution A: Check MONGO_URI
1. Go to Render dashboard
2. Select backend service
3. Go to **Environment** tab
4. Verify `MONGO_URI` is correct:
   ```
   mongodb+srv://femilranparia_db_user:uL9Qjvgfv52Tr9Dm@task-vault.hxa4l4z.mongodb.net/task-vault
   ```
5. Save and redeploy

#### Solution B: Check MongoDB Atlas Network Access
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your cluster
3. Go to **Network Access**
4. Make sure `0.0.0.0/0` is allowed (allows all IPs)
   - Or add Render's IP addresses specifically

#### Solution C: Verify Database User
1. Go to MongoDB Atlas
2. Go to **Database Access**
3. Verify user `femilranparia_db_user` exists
4. Verify password is correct
5. Verify user has read/write permissions

---

### 5. Environment Variables Not Working

**Symptoms:**
- `undefined` values in logs
- Features not working
- API calls failing

**Solutions:**

#### Solution A: Redeploy After Adding Variables
Environment variables only take effect after redeployment:
1. Add/update environment variables
2. Click **Manual Deploy** or push to GitHub
3. Wait for deployment to complete

#### Solution B: Check Variable Names
Make sure variable names match exactly:
- Frontend: `VITE_API_URL` (must start with `VITE_`)
- Backend: `MONGO_URI`, `JWT_SECRET`, etc.

#### Solution C: No Quotes in Vercel/Render
When adding environment variables in dashboards:
- ✅ Correct: `https://api.example.com`
- ❌ Wrong: `"https://api.example.com"`

---

### 6. Build Failures

**Symptoms:**
- Deployment fails during build
- Error logs show npm errors
- "Module not found" errors

**Solutions:**

#### Solution A: Check package.json
Make sure all dependencies are listed:
```bash
# In client/ or server/ directory
npm install
```

#### Solution B: Verify Build Command
**Vercel (Frontend):**
- Build Command: `npm run build`
- Output Directory: `dist`

**Render (Backend):**
- Build Command: `npm install`
- Start Command: `npm start`

#### Solution C: Check Node Version
Add `engines` to `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

### 7. Login/Authentication Not Working

**Symptoms:**
- Login fails
- Token errors
- Unauthorized errors

**Solutions:**

#### Solution A: Check JWT_SECRET
1. Go to Render dashboard
2. Verify `JWT_SECRET` is set
3. Make sure it's the same secret you used in development

#### Solution B: Check Token Storage
Verify localStorage is working:
```javascript
// In browser console
localStorage.getItem('token')
```

#### Solution C: Check CORS Credentials
Make sure credentials are enabled:
```javascript
// In server/src/index.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true  // ← Important!
}));
```

---

### 8. Email Not Sending

**Symptoms:**
- Password reset emails not received
- No email errors in logs
- Email verification not working

**Solutions:**

#### Solution A: Check Email Environment Variables
Verify in Render:
- `EMAIL_SERVICE=gmail`
- `EMAIL_USER=femilranparia@gmail.com`
- `EMAIL_PASSWORD=njdnpckujqreskkb`

#### Solution B: Check Gmail App Password
Make sure you're using an **App Password**, not your regular Gmail password:
1. Go to Google Account settings
2. Security → 2-Step Verification
3. App passwords → Generate new password
4. Use this password in `EMAIL_PASSWORD`

#### Solution C: Check Email Logs
Check Render logs for email errors:
1. Go to Render dashboard
2. Select backend service
3. Go to **Logs** tab
4. Look for email-related errors

---

### 9. Vercel Deployment Fails

**Symptoms:**
- Vercel shows "Build Failed"
- Error in build logs
- Deployment never completes

**Solutions:**

#### Solution A: Check Root Directory
Make sure Root Directory is set to `client`:
1. Go to Vercel project settings
2. **General** → **Root Directory**
3. Set to `client`
4. Save and redeploy

#### Solution B: Check Build Settings
Verify in Vercel:
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

#### Solution C: Check Build Logs
1. Go to Vercel dashboard
2. Click on failed deployment
3. Read error message in logs
4. Fix the specific error shown

---

### 10. Render Deployment Fails

**Symptoms:**
- Render shows "Deploy Failed"
- Service won't start
- Error in logs

**Solutions:**

#### Solution A: Check Root Directory
Make sure Root Directory is set to `server`:
1. Go to Render service settings
2. **Settings** → **Root Directory**
3. Set to `server`
4. Save and redeploy

#### Solution B: Check Start Command
Verify in Render:
- Build Command: `npm install`
- Start Command: `npm start`

#### Solution C: Check Logs
1. Go to Render dashboard
2. Select service
3. Go to **Logs** tab
4. Look for specific error messages

---

## 🔍 Debugging Tips

### Check Browser Console
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for errors (red text)
4. Check **Network** tab for failed requests

### Check Backend Logs
1. Go to Render dashboard
2. Select backend service
3. Go to **Logs** tab
4. Look for errors or warnings

### Check Frontend Logs
1. Go to Vercel dashboard
2. Select project
3. Go to **Deployments**
4. Click on deployment
5. Check **Build Logs** and **Function Logs**

### Test API Directly
Test your backend API directly:
```bash
# Test if backend is running
curl https://your-backend.onrender.com

# Test auth endpoint
curl https://your-backend.onrender.com/api/auth/login
```

---

## 📞 Getting Help

### 1. Check Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

### 2. Check Status Pages
- [Vercel Status](https://www.vercel-status.com)
- [Render Status](https://status.render.com)
- [MongoDB Atlas Status](https://status.cloud.mongodb.com)

### 3. Community Support
- [Vercel Discord](https://vercel.com/discord)
- [Render Community](https://community.render.com)
- [Stack Overflow](https://stackoverflow.com)

---

## ✅ Verification Checklist

Use this to verify everything is working:

- [ ] Frontend loads without errors
- [ ] Can register a new account
- [ ] Can login with credentials
- [ ] Can create a task
- [ ] Can edit a task
- [ ] Can delete a task
- [ ] Can logout
- [ ] Password reset email sends
- [ ] No CORS errors in console
- [ ] No 404 errors in network tab
- [ ] Backend responds in reasonable time

---

## 🎯 Still Having Issues?

1. **Double-check environment variables** - Most issues are here
2. **Check logs** - Both Vercel and Render have detailed logs
3. **Test locally first** - Make sure it works on localhost
4. **Redeploy** - Sometimes a fresh deployment fixes issues
5. **Start over** - Delete and recreate the service if needed

---

**Remember**: Most deployment issues are related to:
1. ❌ Wrong environment variables
2. ❌ Incorrect URLs (missing `/api`, wrong protocol)
3. ❌ CORS misconfiguration
4. ❌ Forgot to redeploy after changes

Double-check these first! 🔍
