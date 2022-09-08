FROM node

WORKDIR /office_poll

COPY . /office_poll

RUN npm install

RUN mkdir -p /var/www/html/images

EXPOSE 3000

CMD ["npm", "run", "docker"]

