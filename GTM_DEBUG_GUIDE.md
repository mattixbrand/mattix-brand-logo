# GTM Troubleshooting Guide for GTM-K6XSVJXN

## Current Issue: "Cannot parse target: ""GTM-K6XSVJXN"""

### Step-by-Step Debugging:

1. **Check GTM Container ID Format**
   - Container ID: `GTM-K6XSVJXN`
   - Format: Should be GTM-XXXXXXX (where X are alphanumeric)
   - ✅ Format looks correct

2. **Verify GTM Snippet Placement**
   - ✅ Head snippet: Present in `<head>`
   - ✅ Body snippet: Present after `<body>`
   - ✅ Both snippets use same container ID

3. **Common Issues to Check:**

   a) **Browser Console Errors**
   ```
   Open Developer Tools (F12) → Console tab
   Look for:
   - Network errors (GTM script failed to load)
   - JavaScript errors
   - CSP (Content Security Policy) violations
   ```

   b) **Network Tab Inspection**
   ```
   Developer Tools → Network tab
   Look for:
   - Request to: https://www.googletagmanager.com/gtm.js?id=GTM-K6XSVJXN
   - Status should be 200 OK
   - Check if blocked by ad blockers
   ```

   c) **DataLayer Verification**
   ```javascript
   // In browser console, type:
   window.dataLayer
   // Should return an array with GTM data
   ```

4. **Testing Commands (Browser Console):**
   ```javascript
   // Check if dataLayer exists
   console.log('dataLayer:', window.dataLayer);
   
   // Check if GTM script loaded
   console.log('GTM script:', document.querySelector('script[src*="googletagmanager"]'));
   
   // Test custom event
   if (window.dataLayer) {
       window.dataLayer.push({
           'event': 'test_debug',
           'debug_info': 'manual_test'
       });
   }
   ```

5. **Potential Solutions:**

   a) **Clear Browser Cache**
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   
   b) **Disable Ad Blockers/Extensions**
   - Test in incognito/private mode
   
   c) **Check CSP Headers**
   - Ensure GTM domains are whitelisted:
     - `script-src: *.googletagmanager.com`
     - `img-src: *.google-analytics.com`
     - `connect-src: *.google-analytics.com`
   
   d) **Verify GTM Container Status**
   - Check in GTM interface that container is published
   - Ensure workspace changes are submitted and published

6. **Alternative Testing Method:**
   
   Test with Google Tag Assistant:
   - Install Chrome extension "Tag Assistant Legacy"
   - Navigate to your site
   - Check if GTM container is detected

### Files to Check:
- ✅ `index.html` - GTM snippets properly placed
- ✅ `src/utils/gtm.ts` - Custom event implementations
- Check: Browser developer tools for errors

### Next Steps:
1. Test the debug page: http://localhost:8001/gtm-test.html
2. Check browser console for specific errors
3. Verify GTM container is published in your Google Tag Manager account
4. Test with GTM Preview mode if available
