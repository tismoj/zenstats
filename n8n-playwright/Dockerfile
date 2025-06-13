# Start from the official n8n image (which is based on Alpine Linux)
FROM n8nio/n8n:latest

# Switch to the root user to install system-wide packages
USER root

# 1. Install system dependencies for the browser engine using Alpine's package manager
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    json-glib

# 2. Tell Playwright to install browsers in a system-wide folder (/ms-playwright)
#    This is crucial so the 'node' user (which runs n8n) can find the browser
#    installed by the 'root' user.
ENV PLAYWRIGHT_BROWSERS_PATH=0

# 3. Install the Playwright package globally and then install the browser binaries.
#    The '--with-deps' flag is a safeguard that also installs system dependencies.
RUN npm install -g playwright && \
    npx playwright install chromium

# The base image will switch back to the 'node' user automatically to run n8n.
