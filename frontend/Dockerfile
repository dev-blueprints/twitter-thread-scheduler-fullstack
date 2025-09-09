# Dockerfile.dev (development)
FROM node:18-alpine
WORKDIR /app

# Copy manifests and install
COPY package.json package-lock.json* ./
RUN npm install



# Copy source
COPY . .

ENV NODE_ENV=development
ENV PORT=3000



RUN npm run build

EXPOSE 3000

RUN pwd && ls -la

CMD ["npm", "run", "start"]
