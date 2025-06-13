const { chromium } = require('playwright');

(async () => {
  // 1. Launch the browser with DevTools open
  const browser = await chromium.launch({
    headless: false, // Must be false to see the browser UI
    devtools: true,   // This is the key to opening DevTools automatically
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // This will hold our captured JSON data
  let capturedJson = null;

  // 2. Set up the listener for network responses
  console.log('Setting up network response listener...');
  page.on('response', async (response) => {
    // 3. Filter for the specific URL you are interested in
    const url = response.url();
    if (url.includes('mtop.global.detail.web.getdetailinfo')) { // <-- IMPORTANT: Change this to match your target URL/API endpoint
      console.log(`\n--- Match Found! ---`);
      console.log(`URL: ${url}`);
      console.log(`Status: ${response.status()}`);

      try {
        // 4. Get the JSON from the response body
        capturedJson = await response.json();
        console.log('Successfully captured JSON data from the network tab.');
      } catch (e) {
        console.error(`Failed to parse JSON from ${url}: ${e.message}`);
      }
    }
  });

  // 5. Navigate to the provided link
  console.log('\nNavigating to the target page...');
  // Replace with the actual page that TRIGGERS the API call
  await page.goto('https://www.lazada.com.ph//products/i4478537331-s25525670145.html', { waitUntil: 'networkidle' });

  // Add a small delay to ensure you can see the DevTools if you want
  await page.waitForTimeout(3000);

  // 6. Close the browser
//  await browser.close();

  // 7. Do something with the captured data
  if (capturedJson) {
    console.log('\n--- Captured JSON Data ---');
    console.log(JSON.stringify(capturedJson, null, 2)); // Pretty-print the JSON
  } else {
    console.log('\nCould not find the specified network request to capture the JSON.');
  }
})();
