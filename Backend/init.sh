git fetch origin master
git pull origin master
pm2 stop all
pm2 start src/index.js