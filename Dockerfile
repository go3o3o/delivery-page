FROM node:10

LABEL maintainer yonikim

ENV NODE_ENV production 

COPY . .

# RUN yarn install

WORKDIR /app

EXPOSE 8000
CMD ["yarn", "run", "dev"]