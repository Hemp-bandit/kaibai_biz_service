FROM balenalib/amd64-ubuntu-node:20-latest

WORKDIR /root/kaibai

COPY ./dist ./dist
# COPY ./node_modules ./node_modules
COPY prisma ./prisma
COPY ./package.json .
COPY .env .
COPY run.sh .
EXPOSE 3000

CMD [ "sh","run.sh" ]