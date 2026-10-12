# ⚡ Palak Sharma — Hogwarts Portfolio & AI Chamber

> *"I solemnly swear that I am up to great innovations."*

A custom, fully-responsive, interactive Harry Potter-themed portfolio website for **Palak Sharma** — 17-year-old **B.Tech CSE Core** undergraduate at **JECRC University**, aspiring **Artificial Intelligence Developer**, avid reader, singer, dancer, and guitarist.

---

## 📁 Repository Structure

```
├── index.html            # Main website entry point (Hogwarts Theme)
├── style.css             # Harry Potter themes, typography & responsive layouts
├── script.js             # Interactive wand sparks, Web Audio synth, snitch physics
├── resume.html           # Print-ready academic & technical resume scroll
├── README.md             # Project documentation & deployment guide
└── assets/
    └── images/
        ├── hero-banner.jpg   # Hogwarts AI study artwork
        └── palak-avatar.jpg  # Scholarly avatar portrait
```

---

## 🚀 How to Deploy on GitHub Pages (Step-by-Step)

### Option 1: Using GitHub Web Interface (Easiest — No Commands Needed)
1. Go to [GitHub.com](https://github.com) and sign in.
2. Click **New Repository** (green button).
3. Name the repository: `palak-portfolio` (or `portfolio`).
4. Set visibility to **Public**.
5. Click **Create repository**.
6. On the empty repo page, click **uploading an existing file**.
7. Drag and drop all files and folders (`index.html`, `style.css`, `script.js`, `resume.html`, `README.md`, and the `assets/` folder).
8. Click **Commit changes**.
9. Now go to **Settings** (top tab of repository) > **Pages** (left sidebar).
10. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
11. Click **Save**.
12. Your portfolio will be live in ~1 minute at:
    `https://<your-github-username>.github.io/palak-portfolio/`

---

### Option 2: Using Git Commands in Terminal / PowerShell
Open PowerShell inside this folder and run:

```bash
# 1. Initialize git
git init -b main

# 2. Stage and commit all files
git add .
git commit -m "Initial commit: Palak Sharma Harry Potter Portfolio"

# 3. Connect to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/palak-portfolio.git

# 4. Push to GitHub
git push -u origin main
```

After pushing:
- In GitHub, go to **Settings** > **Pages**.
- Select branch `main` and root `/` > Click **Save**.

---

## ✨ Features Included

- **Hogwarts Acceptance Letter**: Featuring Palak's 12th score (**89% distinction**), admission to **B.Tech CSE Core** at **JECRC University**, and her ambition in **AI Development**.
- **Interactive Wand Sparks**: Real-time cursor particle trail emitting glowing golden sparks.
- **Golden Snitch Easter Egg**: Flies around the screen; clicking it catches the snitch with golden fireworks and awards 150 points to Ravenclaw.
- **Lumos / Nox Modes**: Instant toggle between warm candlelight and deep midnight starlight.
- **Web Audio Chimes**: Synthesizes ethereal celesta arpeggios on casting spells without external audio files.
- **Room of Requirement**: Interactive spellcasting console (*Lumos*, *Expecto Patronum*, *Wingardium Leviosa*, *Alohomora*) and Sorting Hat oracle.
- **Owl Post (Contact Channels)**:
  - Email: `sharmapalak2549@gmail.com` (1-click copy & mailto)
  - LinkedIn: `palak-sharma-a172ba42b` (direct profile link)
  - Interactive Owl Dispatch parchment form.
- **The Marauder's Map Footer**: Click to toggle *"I solemnly swear that I am up to no good"* ⇄ *"Mischief Managed"*.
