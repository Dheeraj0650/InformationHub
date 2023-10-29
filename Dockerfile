FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV mongodb_password=Kdheeraj123 \
    SECRET=loveurselfbewhatyouwannabe \ 
    PORT=8000

EXPOSE 8000

CMD ["node", "app.js"]
