FROM node:16

WORKDIR /usr/src/app
COPY package.json /usr/src/app
ENV NODE_ENV development

RUN npm install react-hot-loader --legacy-peer-deps
RUN npm install --loglevel verbose --legacy-peer-deps

EXPOSE 3000
CMD ["npm", "start"]