#!/usr/bin/env bash
set -e  # Exit on any error

# Update and install required libraries for Chromium
apt-get update
apt-get install -y \
  libnss3 \
  libatk-bridge2.0-0 \
  libxcomposite1 \
  libxrandr2 \
  libxdamage1 \
  libgbm1 \
  libasound2 \
  libxshmfence1 \
  libpangocairo-1.0-0 \
  libpango-1.0-0 \
  libcairo2 \
  libatspi2.0-0 \
  libgtk-3-0 \
  libx11-xcb1 \
  libxcb-dri3-0 \
  libdrm2 \
  libxext6 \
  libxtst6 \
  libenchant-2-2 \
  libavif15 \
  libsecret-1-0 \
  libgstreamer-plugins-bad1.0-0 \
  libgstreamer1.0-0 \
  libgstreamer-gl1.0-0 \
  libgstcodecparsers-1.0-0 \
  libegl1

# Install Playwright browsers
npx playwright install
