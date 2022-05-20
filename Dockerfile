FROM node:14-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . ./
EXPOSE 4000
CMD ["npm", "start"]
