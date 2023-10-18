FROM node:14.18.0-alpine 
WORKDIR /api
COPY . .
# Uncomment next line for Macs with M processor
# RUN apk add --update python make g++\
#    && rm -rf /var/cache/apk/*
RUN npm install
RUN npm run build
EXPOSE 4002
CMD npm start