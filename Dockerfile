# readme-stats: express serve /api (cards SVG) + frontend estático (dist). Build no runner.
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci || npm install
COPY . .
RUN npm run build
ENV NODE_ENV=production
ENV PORT=9000
EXPOSE 9000
HEALTHCHECK --interval=15s --timeout=5s --retries=5 --start-period=15s \
  CMD wget --spider -q http://127.0.0.1:9000/health || exit 1
CMD ["node","express.js"]
