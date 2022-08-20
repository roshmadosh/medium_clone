FROM node

WORKDIR /office_poll

COPY . /office_poll

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]

