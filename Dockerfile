FROM node:20

ENV PORT=4000
ENV PEDIDOS_URL=url

WORKDIR /main
COPY package*.json ./
RUN npm install
COPY . .

VOLUME ["/main/data"]

EXPOSE 4000

CMD ["npm", "start"]
