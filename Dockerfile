FROM node:20

ENV PEDIDOS_URL=url

VOLUME ["/main/data"]

RUN mkdir -p /main/node_modules && mkdir -p /main/data && chown -R node:node /main/data
WORKDIR /main
COPY package*.json ./
RUN npm install && install typescript -g
COPY . .
RUN tsc

EXPOSE 4040

CMD ["npm", "start"]
