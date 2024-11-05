#/bin/sh
ls -al

npm install --save-prod --registry=https://registry.npmmirror.com/
npx prisma generate

node ./dist/main.js
