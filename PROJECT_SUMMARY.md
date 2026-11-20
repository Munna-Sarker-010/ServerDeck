# ServerDeck - Project Summary & Complete Change Log

This file contains the complete record of all customizations and updates made to your ServerDeck application and website.

---

## 1. What This Project Is
* **Project Name:** ServerDeck
* **Location:** `C:\Users\Munna\Desktop\ServerDeck`
* **Download Package:** `ServerDeck.zip` (located inside `apps\web\public\downloads\ServerDeck.zip`)

---

## 2. Complete List of Changes Made

### A. Desktop Application Customizations
1. **Rebranding:**
   - Replaced all brand names from "OpenShip" to **ServerDeck** across all application code, titles, and 10 language dictionaries.
   - Removed all external links to original GitHub releases and issues.
   - Updated support emails to `support@serverdeck.io`.
   - Disabled background updates and security advisory checks to external servers.
2. **Settings Page:**
   - Removed the **"Cloud"** tab completely from Settings so it never appears.
3. **Audit Logs:**
   - Cleared all past audit logs.
   - Disabled audit log recording for desktop actions (no local changes are tracked or saved to disk).
4. **Navigation Buttons:**
   - Disabled the `<` (Back) and `>` (Forward) chevrons on the home page so they cannot be clicked.
5. **Logo:**
   - Replaced the branding logo with your new **ServerDeck** logo across the dashboard and landing pages.

### B. Downloadable Executable (`ServerDeck.zip`)
- Compiled and packaged the complete ready-to-run desktop distribution into **`ServerDeck.zip`**.
- Contains `ServerDeck.exe` along with all required libraries, runtimes, and local assets so it can be extracted and run immediately on any Windows PC without setup.

### C. Website (`apps/web`)
- Completely replaced the marketing landing page with the **clean Download Page** as the default home page (`/`).
- Removed all extra navigation links, leaving only your ServerDeck logo.
- When visiting the website (e.g. `http://localhost:3009`), visitors see only the *"Install ServerDeck. Deploy in seconds."* page with a single **"Download for Windows"** button that downloads `ServerDeck.zip`.

---

## 3. How to Run Your Project

### Running the Application:
1. Extract `ServerDeck.zip` on any computer.
2. Double-click `ServerDeck.exe`.

### Running the Website:
1. Open a terminal in `C:\Users\Munna\Desktop\ServerDeck\apps\web`.
2. Run: `bun run dev`
3. Open your browser at: `http://localhost:3009`
