FROM node:20

ENV PEDIDOS_URL=url

VOLUME ["/main/data"]
VOLUME [ "/main/hidratation"]
RUN mkdir -p /main/node_modules 
RUN mkdir -p /main/data && chown -R node:node /main/data
RUN mkdir -p /main/public && chown -R node:node /main/public
RUN mkdir -p /main/hidratation && chown -R node:node /main/hidratation

WORKDIR /main
COPY package*.json ./
COPY . .
RUN if [ "$(ls -A /main/hidratation)" ]; then cp -r /main/hidratation/* /main/public; else echo "Diretório hidratation está vazio"; fi
RUN npm install && npm install -g typescript 
RUN tsc

EXPOSE 4040

CMD ["npm", "start"]
