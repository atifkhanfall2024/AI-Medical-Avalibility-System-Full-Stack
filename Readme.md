# AMAS Medical - Backend

AMAS Medical Backend is a Node.js and Express.js API server for the AI Medical Availability System. It handles authentication, pharmacy management, medicine requests, payments, real-time chat, file uploads, and database operations.

## 🚀 Features

- User authentication
- Role-based system for users, pharmacies, and admin
- Medicine/tablet request system
- Nearby pharmacy availability logic
- Pharmacy approval/status system
- Real-time chat using Socket.IO
- Free chat limit and subscription-based chat access
- Safepay payment integration
- Payment success/cancel verification
- Cloudinary image/file upload
- MongoDB database integration
- Cookie-based authentication
- AWS deployment with PM2 and Nginx

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- Cookie Parser
- CORS
- Multer
- Cloudinary
- Multer Storage Cloudinary
- Safepay SDK
- PM2
- Nginx
- AWS EC2 Ubuntu

## 📁 Project Structure

```bash
backend/
├── src/
│   ├── controllers/
│   │   ├── payments/
│   │   └── ...
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   ├── Socket.js
│   │   └── multer.js
│   ├── lib/
│   │   └── paymentConfig.js
│   └── App.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/atifkhanfall2024/AI-Medical-Avalibility-System-Full-Stack.git
```

Go to backend folder:

```bash
cd AI-Medical-Avalibility-System-Full-Stack
```

Install dependencies:

```bash
npm install
```

If dependency conflict occurs:

```bash
npm install --legacy-peer-deps
```

If using `multer-storage-cloudinary`, install compatible Cloudinary version:

```bash
npm install multer-storage-cloudinary@4.0.0 cloudinary@1.41.3 multer --legacy-peer-deps
```

## 🔐 Environment Variables

Create `.env` file in backend root:

```bash
nano .env
```

Add these variables:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SAFEPAY_ENV=sandbox
SAFEPAY_API_KEY=your_safepay_api_key
SAFEPAY_SECRET_KEY=your_safepay_secret_key
SAFEPAY_WEBHOOK_SECRET=test

FRONTEND_URL=https://ai-medical-avalibility-system-full.vercel.app
```

Save file:

```bash
CTRL + O
Enter
CTRL + X
```

Check if `.env` is loading:

```bash
node -e "require('dotenv').config(); console.log(process.env.SAFEPAY_API_KEY)"
```

## ▶️ Run Backend Locally

```bash
npm run start
```

or:

```bash
node src/App.js
```

Backend URL:

```bash
http://localhost:3000
```

## 🌐 CORS Setup

In `src/App.js`, allow frontend origins:

```js
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://65.0.89.63",
    "https://ai-medical-avalibility-system-full.vercel.app"
  ],
  credentials: true
}));
```

## 🔌 Socket.IO Setup

In `src/utils/Socket.js`:

```js
const socket = require("socket.io");

const InitializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://65.0.89.63",
        "https://ai-medical-avalibility-system-full.vercel.app"
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("JoinChat", ({ name, userid, id }) => {
      const roomId = [userid, id].sort().join("_");
      socket.join(roomId);
      console.log(`${name} joined room:`, roomId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = InitializeSocket;
```

Make sure Socket.IO is attached to the HTTP server, not directly to the Express app.

Example in `App.js`:

```js
const http = require("http");
const express = require("express");
const InitializeSocket = require("./utils/Socket");

const app = express();
const server = http.createServer(app);

InitializeSocket(server);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
```

## 💳 Safepay Payment URLs

Use the correct frontend Vercel URL:

```js
cancelUrl: `https://ai-medical-avalibility-system-full.vercel.app/payment-cancel`,
redirectUrl: `https://ai-medical-avalibility-system-full.vercel.app/payment-success`,
```

Avoid using this in production:

```js
http://localhost:5173
```

## 🚀 Deploy Backend on AWS EC2

### 1. Connect to EC2

```bash
ssh -i your-key.pem ubuntu@your-public-ip
```

### 2. Install NVM and Node.js

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

Load NVM:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Install Node:

```bash
nvm install 22.13.1
nvm use 22.13.1
```

Check versions:

```bash
node -v
npm -v
```

### 3. Clone Backend

```bash
git clone https://github.com/atifkhanfall2024/AI-Medical-Avalibility-System-Full-Stack.git
cd AI-Medical-Avalibility-System-Full-Stack
```

### 4. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 5. Create `.env`

```bash
nano .env
```

Paste all production environment variables.

### 6. Start Backend

```bash
npm run start
```

## ⚙️ Run Backend with PM2

Install PM2:

```bash
npm install -g pm2
```

Start backend:

```bash
pm2 start npm --name amas-backend -- run start
```

Save PM2 process:

```bash
pm2 save
```

Check status:

```bash
pm2 list
```

Restart backend:

```bash
pm2 restart amas-backend
```

or if your process id is `0`:

```bash
pm2 restart 0
```

Restart with updated env:

```bash
pm2 restart 0 --update-env
```

View logs:

```bash
pm2 logs 0
```

## 🌐 Nginx Reverse Proxy

Install Nginx:

```bash
sudo apt update
sudo apt install nginx -y
```

Open config:

```bash
sudo nano /etc/nginx/conf.d/default.conf
```

Use this config:

```nginx
server {
    listen 80;
    server_name 65.0.89.63;

    root /var/www/html;
    index index.html;

    location /socket.io/ {
        proxy_pass http://localhost:3000/socket.io/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Test Nginx:

```bash
sudo nginx -t
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

## ✅ Test Backend

Test API:

```bash
curl http://65.0.89.63/api
```

Test Socket.IO:

```bash
curl "http://65.0.89.63/socket.io/?EIO=4&transport=polling"
```

Correct Socket.IO response should start with:

```bash
0{"sid":
```

## 🔄 Update Backend on AWS

```bash
cd ~/AI-Medical-Avalibility-System-Full-Stack
git pull origin main
npm install --legacy-peer-deps
pm2 restart 0 --update-env
```

## 📦 Useful Commands

```bash
npm install --legacy-peer-deps
npm run start
pm2 list
pm2 logs 0
pm2 restart 0 --update-env
sudo nginx -t
sudo systemctl restart nginx
```

## 👨‍💻 Author

Muhammad Atif Khan
