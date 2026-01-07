# 🚀 Quick Deployment Checklist

Use this checklist to deploy your Task Vault app in under 15 minutes!

---

## ✅ Pre-Deployment Checklist

- [ ] Code is pushed to GitHub
- [ ] MongoDB Atlas is set up and accessible
- [ ] You have a GitHub account
- [ ] `.env` files are in `.gitignore`

---

## 🔧 Backend Deployment (Render) - 5 minutes

1. **Sign up**: Go to [render.com](https://render.com) → Sign up with GitHub
2. **Create Web Service**: Click "New +" → "Web Service"
3. **Connect Repo**: Select your `task-vault` repository
4. **Configure**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`
5. **Add Environment Variables** (copy from `server/.env.example`):
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://femilranparia_db_user:uL9Qjvgfv52Tr9Dm@task-vault.hxa4l4z.mongodb.net/task-vault
   JWT_SECRET=my_super_secret_key_123
   EMAIL_SERVICE=gmail
   EMAIL_USER=femilranparia@gmail.com
   EMAIL_PASSWORD=njdnpckujqreskkb
   FRONTEND_URL=https://your-app.vercel.app
   ```
6. **Deploy**: Click "Create Web Service"
7. **Copy URL**: Save your backend URL (e.g., `https://task-vault-backend.onrender.com`)

---

## 🎨 Frontend Deployment (Vercel) - 5 minutes

1. **Sign up**: Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **Import Project**: Click "Add New..." → "Project" → Select `task-vault`
3. **Configure**:
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual Render backend URL from step 7 above)
5. **Deploy**: Click "Deploy"
6. **Copy URL**: Save your frontend URL (e.g., `https://task-vault.vercel.app`)

---

## 🔄 Update Backend with Frontend URL - 2 minutes

1. Go back to **Render dashboard**
2. Select your backend service
3. Go to **Environment** tab
4. Update `FRONTEND_URL` with your Vercel URL
5. Click **Save Changes** (auto-redeploys)

---

## ✅ Test Your Deployment - 3 minutes

Visit your frontend URL and test:
- [ ] Page loads correctly
- [ ] Register a new account
- [ ] Login works
- [ ] Create a task
- [ ] Edit a task
- [ ] Delete a task

---

## 🎉 Done!

Your app is now live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

---

## ⚠️ Important Notes

1. **First Load Delay**: Render free tier spins down after 15 min of inactivity. First request may take 30-60 seconds.
2. **Auto-Deploy**: Both services auto-deploy when you push to `main` branch.
3. **Logs**: Check deployment logs in Vercel/Render dashboards for errors.

---

## 🆘 Troubleshooting

**CORS Errors?**
- Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check CORS configuration in `server/src/index.js`

**API Not Working?**
- Verify `VITE_API_URL` in Vercel includes `/api` at the end
- Check backend logs in Render dashboard

**Database Connection Failed?**
- Verify `MONGO_URI` is correct in Render environment variables
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

---

## 📚 Full Guide

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
