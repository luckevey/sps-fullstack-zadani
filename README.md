# Mariia Bzhezynska
---
## Zvolené rozšíření
- Backend: Node.js + Express + Sqlite3
- Frontend: HTML + CSS + JS
- VitePress

## How to run:
1. fetch from git
2. ensure node is installed on a machine
3. install node modules in the project folder:
   npm install
   (ensure node_modules folder appeared in the project folder)
4. initialize & seed database with data:
   cd /<project-home-full-path>/database
   npm run seed
5. start node server (Ctrl+C to stop):
   node /<project-home-full-path>/server.js
6. reach out in browser: http://127.0.0.1:3000
7. reach out to api: http://127.0.0.1:3000/api/{endpoint-name-here}

## Hints:
1. get active node processes (PID# is in 2nd column):
   ps aux | grep node
2. stop unwanted process by PID:
   kill -9 <PID#>

## TODOs:
1. add books description in seed.sql // done
2. move js from index.html to separate file // done
3. make proper column style for categories  // done
4. try tailwindcss // блять????
5. allowed characters validation on fe // done
6. allowed characters validation on be  // done
7. metadata on html page // done
8. favicon // done 
9. title // done
10. 404 // done