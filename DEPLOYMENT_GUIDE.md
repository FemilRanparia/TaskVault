# 🚀 Task Vault - Free Deployment Guide

This guide will help you deploy your Task Vault application **completely FREE** using Vercel (frontend) and Render (backend).

---

## 📋 Prerequisites

Before you start, make sure you have:
- ✅ A GitHub account (free)
- ✅ Your code pushed to a GitHub repository
- ✅ MongoDB Atlas database (you already have this!)

---

## 🎯 Deployment Architecture

```
┌─────────────────┐
│   Vercel        │  ← Frontend (React + Vite)
│  (Frontend)     │
└────────┬────────┘
         │
         │ API Calls
         │
┌────────▼────────┐
│   Render        │  ← Backend (Node.js + Express)
│  (Backend)      │
└────────┬────────┘
         │
         │ Database
         │
┌────────▼────────┐
│ MongoDB Atlas   │  ← Database (Already configured!)
└─────────────────┘
```

---

## 📦 Step 1: Prepare Your Code for Deployment

### 1.1 Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/task-vault.git
git branch -M main
git push -u origin main
```

### 1.2 Add `.gitignore` to root (if not exists)

Create a `.gitignore` file in the root directory:

```
node_modules/
.env
.DS_Store
*.log
dist/
build/
```

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Sign Up for Render
1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with your GitHub account

### 2.2 Create a New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your `task-vault` repository
4. Configure the service:

**Settings:**
- **Name**: `task-vault-backend` (or any name you prefer)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 2.3 Add Environment Variables

In the **Environment** section, add these variables:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGO_URI` | `mongodb+srv://femilranparia_db_user:uL9Qjvgfv52Tr9Dm@task-vault.hxa4l4z.mongodb.net/task-vault` |
| `JWT_SECRET` | `my_super_secret_key_123` |
| `EMAIL_SERVICE` | `gmail` |
| `EMAIL_USER` | `femilranparia@gmail.com` |
| `EMAIL_PASSWORD` | `njdnpckujqreskkb` |
| `FRONTEND_URL` | `https://your-app.vercel.app` (update this after deploying frontend) |

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. **Copy your backend URL** (e.g., `https://task-vault-backend.onrender.com`)

⚠️ **Important**: Free tier services on Render spin down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Sign Up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with your GitHub account

### 3.2 Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Import your `task-vault` repository
3. Configure the project:

**Settings:**
- **Framework Preset**: `Vite`
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.3 Add Environment Variable

Click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://task-vault-backend.onrender.com` (your Render backend URL) |

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. **Copy your frontend URL** (e.g., `https://task-vault.vercel.app`)

---

## 🔄 Step 4: Update Backend with Frontend URL

1. Go back to your **Render dashboard**
2. Select your backend service
3. Go to **"Environment"**
4. Update `FRONTEND_URL` with your Vercel URL (e.g., `https://task-vault.vercel.app`)
5. Click **"Save Changes"**
6. Service will automatically redeploy

---

## ✅ Step 5: Verify Deployment

1. Visit your frontend URL (Vercel)
2. Try to register a new account
3. Try to login
4. Create a task
5. Check if everything works!

---

## 🔧 Troubleshooting

### Issue: CORS Errors
**Solution**: Update your backend CORS configuration in `server/src/index.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Issue: API Calls Failing
**Solution**: Make sure your frontend is using the correct API URL. Check `client/src` for API configuration.

### Issue: Backend Takes Long to Respond
**Solution**: This is normal on Render's free tier. The service spins down after 15 minutes of inactivity. Consider upgrading or using a different service for production.

### Issue: Environment Variables Not Working
**Solution**: 
- Make sure you've added all required environment variables
- Redeploy the service after adding variables
- Check the logs for any errors

---

## 🎉 You're Done!

Your Task Vault application is now live and accessible worldwide!

**Frontend**: `https://your-app.vercel.app`  
**Backend**: `https://task-vault-backend.onrender.com`

---

## 🔄 Automatic Deployments

Both Vercel and Render support automatic deployments:
- Every time you push to `main` branch, both services will automatically redeploy
- You can see deployment logs in their respective dashboards

---

## 💡 Alternative Free Options

### Option 2: Netlify + Railway
- **Frontend**: [Netlify](https://netlify.com) (similar to Vercel)
- **Backend**: [Railway](https://railway.app) ($5 free credit)

### Option 3: All-in-One with Render
- Deploy both frontend and backend on Render
- Create two separate services (one for frontend, one for backend)

---

## 🔒 Security Recommendations

⚠️ **IMPORTANT**: Before going to production:

1. **Change JWT Secret**: Use a strong, random secret
2. **Use Environment Variables**: Never commit `.env` files
3. **Update MongoDB Password**: Use a stronger password
4. **Enable MongoDB IP Whitelist**: Add only your deployment IPs
5. **Use HTTPS**: Both Vercel and Render provide HTTPS by default

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

---

**Need Help?** Check the logs in Vercel/Render dashboards for detailed error messages.
