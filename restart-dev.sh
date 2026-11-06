#!/bin/bash

# 🔄 Development Server Restart Script
# Cleanly restarts the Next.js development server

echo "🔄 Restarting Development Server..."
echo "=================================="

# Kill any existing Next.js processes
echo "🛑 Stopping existing processes..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "node.*next" 2>/dev/null || true

# Wait a moment for processes to clean up
sleep 2

# Clear Next.js cache
echo "🧹 Clearing Next.js cache..."
rm -rf .next

# Start fresh development server
echo "🚀 Starting fresh development server..."
npm run dev

echo "✅ Development server restarted!"
echo "🌐 Available at: http://localhost:3000 or http://localhost:3001"
