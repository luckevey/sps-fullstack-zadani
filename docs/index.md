---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "SPS Fullstack Dokumentace"
  text: "Technickaá dokumentace k projektu \"Správa knih v antikvariátu\""
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Zvolené rozšíření
    details: Backend - Node.js + Express + Sqlite3, Frontend - HTML + CSS + JS
  - title: Hints
    details: Get active node processes (PID# is in 2nd column):ps aux | grep node, stop unwanted process by PID:kill -9 <PID#>
  - title: How to run
    details: npm install if node_modules not exist, npm run seed, npm start, ctrl + c to end process
---

