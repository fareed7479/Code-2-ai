# Installation Guide - Code-to-Diagram AI
s
## Resolving PowerShell Execution Policy Issue

The error occurs because PowerShell's execution policy prevents running scripts. Here are solutions:

### Option 1: Run in Command Prompt (Recommended)
Open **Command Prompt** (not PowerShell) and run the commands:

```cmd
cd D:\Hackhton\code-to-diagram-ai
npm install
```

### Option 2: Change PowerShell Execution Policy
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Option 3: Use PowerShell Bypass
Run this command in PowerShell:
```powershell
cd D:\Hackhton\code-to-diagram-ai
powershell -ExecutionPolicy Bypass -Command "npm install"
```

## Complete Installation Steps

### 1. Install Root Dependencies
```cmd
cd D:\Hackhton\code-to-diagram-ai
npm install
```

### 2. Install Backend Dependencies
```cmd
cd backend
npm install
```

### 3. Install Frontend Dependencies
```cmd
cd ../frontend
npm install
```

### 4. Set Up Environment Variables
```cmd
cd ../backend
copy .env.example .env
```

Edit `backend/.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_GeminiAPI_token_here
```

### 5. Start the Application
```cmd
cd ..
npm run dev
```

This will start:
- Backend server: http://localhost:5000
- Frontend app: http://localhost:3000

## Alternative: Manual Package Installation

If npm commands continue to fail, you can manually check if Node.js is properly installed:

```cmd
node --version
npm --version
```

If Node.js is not installed, download it from: https://nodejs.org/

## Troubleshooting

**Common Issues:**
1. **Execution Policy Error**: Use Command Prompt instead of PowerShell
2. **Node.js not found**: Install Node.js from official website
3. **Permission denied**: Run terminal as Administrator
4. **Port conflicts**: Change ports in backend/.env if 3000/5000 are busy

**Verification:**
After installation, test with:
```cmd
cd backend && node test-server.js
```

This will verify all modules load correctly without starting the full server.
