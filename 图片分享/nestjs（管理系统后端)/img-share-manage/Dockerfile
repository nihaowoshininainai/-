FROM node:20-alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN npm install -g bun && bun install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main"]
