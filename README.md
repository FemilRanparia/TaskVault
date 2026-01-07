# 📋 Task Vault

A modern, full-stack task management application built with the MERN stack. Task Vault helps you organize, track, and manage your tasks efficiently with a beautiful, intuitive interface.

![Task Vault](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Node](https://img.shields.io/badge/Node.js-Express-339933.svg)

---

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication with password encryption
- 📝 **Task Management** - Create, edit, delete, and organize tasks
- 🏷️ **Categories & Tags** - Organize tasks with custom categories
- ⏰ **Due Dates** - Set and track task deadlines
- 📊 **Analytics Dashboard** - Visualize your productivity with charts
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🌙 **Dark Mode Ready** - Eye-friendly interface
- 📧 **Email Notifications** - Password reset and account verification
- 🔄 **Real-time Updates** - Instant task updates across sessions

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FemilRanparia/TaskVault.git
   cd TaskVault
   ```

2. **Install dependencies**

   **Backend:**
   ```bash
   cd server
   npm install
   ```

   **Frontend:**
   ```bash
   cd client
   npm install
   ```

3. **Configure environment variables**

   **Backend** (`server/.env`):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend** (`client/.env`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development servers**

   **Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd client
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
task-vault/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context for state management
│   │   ├── services/      # API service layer
│   │   ├── routes/        # Route configurations
│   │   └── App.jsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   └── index.js       # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🎯 Usage

### Creating a Task
1. Click the "Add Task" button
2. Fill in task details (title, description, due date, category)
3. Click "Create" to save

### Managing Tasks
- **Edit**: Click on a task to edit its details
- **Delete**: Click the delete icon to remove a task
- **Complete**: Mark tasks as complete with a single click
- **Filter**: Use category filters to organize your view

### Analytics
- View your productivity statistics on the dashboard
- Track completed vs pending tasks
- Monitor task completion trends

---

## 🌐 Deployment

### Recommended: Vercel (Frontend) + Render (Backend)

**Frontend (Vercel):**
1. Push your code to GitHub
2. Import project to Vercel
3. Set root directory to `client`
4. Add environment variable: `VITE_API_URL`
5. Deploy!

**Backend (Render):**
1. Create a new Web Service on Render
2. Set root directory to `server`
3. Add all environment variables
4. Deploy!

For detailed deployment instructions, check the local deployment guides.

---

## 🔒 Security

- Passwords are hashed using bcryptjs
- JWT tokens for secure authentication
- HTTP-only cookies for token storage
- Environment variables for sensitive data
- CORS protection enabled
- Input validation and sanitization

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Femil Ranparia**

- GitHub: [@FemilRanparia](https://github.com/FemilRanparia)
- Email: femilranparia@gmail.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the powerful database
- Vercel and Render for free hosting
- All open-source contributors

---

## 📸 Screenshots

> Add screenshots of your application here once deployed

---

## 🐛 Known Issues

- None at the moment! Report issues on GitHub.

---

## 🔮 Future Enhancements

- [ ] Mobile application (React Native)
- [ ] Collaborative task sharing
- [ ] Task comments and attachments
- [ ] Advanced filtering and search
- [ ] Calendar view
- [ ] Task templates
- [ ] Integration with third-party apps

---

## 💬 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact via email

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Femil Ranparia

</div>
