# Start from the official n8n image
FROM n8nio/n8n:latest

# Switch to the root user to install system-wide packages and setup browser binaries
USER root

# 1. Install system dependencies for the browser engine using Alpine's package manager
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    json-glib \
    fontconfig \
    udev

# 2. Globally install the Playwright npm package. This provides the 'playwright' CLI.
RUN npm install -g playwright

# 3. Tell Playwright where to install the *browser binaries* system-wide.
#    Playwright will use this environment variable when 'npx playwright install' is run.
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# 4. Install the Playwright *browser binaries* (e.g., Chromium) into the location specified by PLAYWRIGHT_BROWSERS_PATH.
#    Note: NO --install-dir flag is needed here. Playwright picks it up from the ENV variable.
RUN npx playwright install chromium

# --- IMPORTANT: Ensure 'playwright' Node.js package is accessible to n8n code nodes ---

# 5. Switch back to the 'node' user and n8n's application directory.
#    The n8nio/n8n image uses /usr/src/app as its default WORKDIR and 'node' as its user.
USER node
WORKDIR /usr/src/app

# 6. Install the 'playwright' Node.js package *locally* for the n8n application.
#    This makes 'playwright' available via 'require()' in your n8n Code Nodes.
RUN npm install playwright

# The base image's entrypoint will run n8n as the 'node' user automatically.

