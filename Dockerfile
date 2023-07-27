FROM node:18-alpine
WORKDIR /usr/local/apps/bookue-front
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src ./src
COPY pages ./src/pages
COPY .babelrc ./
RUN yarn
RUN yarn build
EXPOSE 3000
CMD yarn start