FROM node:20

ENV PORT=4000
ENV PEDIDOS_URL=url

VOLUME ["/main/data"]

RUN mkdir -p /main/node_modules && mkdir -p /main/data && chown -R node:node /main/data
WORKDIR /main
COPY package*.json ./
RUN npm install
COPY . .


EXPOSE 4000

CMD ["npm", "start"]
