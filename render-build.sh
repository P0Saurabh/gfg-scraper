#!/usr/bin/env bash
# Install dependencies for Puppeteer/Chrome
apt-get update
apt-get install -y \
  wget \
  gnupg \
  ca-certificates

# Add Chrome repository and install Chrome
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
apt-get update
apt-get install -y google-chrome-stable
