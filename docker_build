FROM balenalib/amd64-ubuntu-node:20-latest as builder

WORKDIR /app
COPY ./prisma ./prisma
COPY ./src ./src
COPY ./.env .
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .
COPY ./nest-cli.json .

RUN npm install --save-prod --registry=https://registry.npmmirror.com/ &&\
  npx prisma generate &&\
  npm run build

FROM balenalib/amd64-ubuntu-node:20-latest

WORKDIR /root

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules


COPY ./package.json .
COPY .env .
EXPOSE 3000
CMD [ "node","./dist/main.js" ]