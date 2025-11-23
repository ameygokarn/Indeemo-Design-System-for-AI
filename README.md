# Indeemo Design System for AI

This repository contains materials, guidelines, and artifacts for creating an AI-enabled design system for Indeemo.

Project: Indeemo — https://indeemo.com/

Contents:
- `guideline.md`: Figma + Make guidelines, workflows, and resources for building design-system assets.
- `styleguide.md`: Prompt and style guidance for interacting with the assistant and generating consistent outputs.

Goal: provide a reproducible, auditable design-system foundation (tokens, components, documentation and automation patterns) that pairs with AI-assisted workflows.

## Getting started (for non-technical users)

This section walks you through the minimum steps to open and use this project in Visual Studio Code and to connect Figma Desktop to a local MCP (Model Context Protocol) bridge when one is available. The instructions are written for people who are not familiar with code — follow each step in order.

### 1) Install Git (recommended for safe updates)
- Git lets you download ("clone") this project and safely get updates without losing your work.
- Download from: https://git-scm.com/ and follow the installer.
- After installation, open a terminal (or Command Prompt on Windows) and test:

```
git --version
```

### 2) Clone this repository
- In your terminal, navigate to where you want the project folder, then run:

```
git clone <repository-url>
cd Indeemo-Design-System-for-AI
```

- This creates a local copy you can update anytime with `git pull`.

### 3) Install Visual Studio Code
- Visit: https://code.visualstudio.com/ and download the installer for your OS. Install and open VS Code.

### 4) Open this project in VS Code
- In VS Code: choose `File` → `Open Folder...` and navigate to the location where you cloned the repository.
    - **Default location (if you didn't specify):** The repository is usually saved in your home directory (e.g., `C:\Users\YourName\Indeemo-Design-System-for-AI` on Windows, or `/Users/YourName/Indeemo-Design-System-for-AI` on macOS/Linux).
- Select the `Indeemo-Design-System-for-AI` folder and click **Open**.
- You should see `README.md` in the Explorer panel on the left.

### 5) Install Node.js
- Many automation scripts use Node.js. Download the LTS version from: https://nodejs.org/ and install with defaults.
- Test in VS Code's integrated terminal (`View` → `Terminal`):

```
node --version
```

Expected output:
```
v20.11.0
```
(Your version number may differ; any v18+ is fine.)

```
node --version
```

### 6) Install Figma Desktop
### 6) Install Figma Desktop
- Download from: https://www.figma.com/downloads/ and sign in with your Figma account.
- **Important:** You will need access to three key Figma files for this project:
    - **Token Library:** Design tokens (colors, spacing, typography) — https://www.figma.com/design/xKCxXToxIpf4ELOSMaUDYT/Indeemo-Tokens?node-id=2002-100&m=dev
    - **UI Kit:** Reusable components — https://www.figma.com/design/ytUJSttPknq8WjzSQYlFux/Indeemo-UI-Kit?node-id=8-310&m=dev
    - **Icons:** Icon library — https://www.figma.com/design/JPIsyRnhHuBWwJSeVEVsmc/Indeemo-Icons?node-id=0-1&m=dev
- If you don't have access to these files, ask your project administrator to share them with you.

### 7) About connecting Figma via MCP (plain language)
- MCP (Model Context Protocol) is a way for a local program (a "bridge") to talk to Figma Desktop and run automated tasks (insert components, update tokens, export assets).
- Typical flow:
    - A developer runs a local bridge on your computer.
    - Figma Desktop shows a dialog asking to "Allow connection" — click **Allow**.

### 8) Running a local MCP bridge (if provided)
- If the project includes a bridge script, run it from the VS Code terminal. Example:

```
node src/mcp_bridge.js
```

- Switch to Figma Desktop and look for a popup — click **Allow**. The terminal will show "listening on ..." if running correctly.

### 9) Making changes safely (commits & push — quick guide)
- After editing files, save your work in Git so you can recover or share it:

```
git add .
git commit -m "Describe your change here"
git push
```

- **`add`** stages your changes, **`commit`** saves them locally, **`push`** sends them to the remote repository.
- Learn more: https://docs.github.com/en/get-started/using-git/about-git

### 10) Safety & troubleshooting
- If you see an "Allow connection" dialog, confirm it references `localhost` or `127.0.0.1` (the program is on your own computer).
- If nothing happens:
    - Check the VS Code terminal for messages or errors.
    - Make sure Figma Desktop is running and signed in.
    - Allow the bridge through your OS firewall for local connections.

### 11) If you prefer not to run local programs
- No problem — the design system docs and guidelines are usable without a bridge. Designers can work in Figma directly and export assets manually.

### 12) Where to get help
- If you get stuck, share the exact step and any error message. A developer can run the bridge for you and guide you through the "Allow connection" prompt.

**Links:**
- Visual Studio Code: https://code.visualstudio.com/
- Node.js (LTS): https://nodejs.org/
- Figma Desktop: https://www.figma.com/downloads/
- Git: https://git-scm.com/
- GitHub Git guide: https://docs.github.com/en/get-started/using-git/about-git

-----

If you'd like, I can also create a simple checklist file or a one-click script to automate the developer steps — let me know if you want that.
- If you see an "Allow connection" dialog, confirm it references `localhost` or `127.0.0.1` (this means the program is running on your own computer).
- If nothing happens:
	- Check the terminal in VS Code for a message or error.
	- Make sure Figma Desktop is running and signed in.
	- If asked, allow the bridge through your OS firewall for local connections.

9) If you prefer not to run local programs
- No problem — the design system docs and guidelines are usable without running a bridge. Designers can work in Figma directly and export assets manually.

10) Where to get help
- If you get stuck, share the exact step where you stopped and the text of any error message. If you prefer, a developer can run the bridge for you and guide you through the "Allow connection" prompt.

Links (small set)
- Visual Studio Code: https://code.visualstudio.com/
- Node.js (LTS): https://nodejs.org/
- Figma Desktop download: https://www.figma.com/downloads/

-----

If you'd like, I can also create a simple, clickable checklist file or a one-click script to automate the few developer steps — tell me whether you want that and I will add it.