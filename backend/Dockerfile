FROM oven/bun:1-alpine AS deps

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

FROM deps AS builder

COPY tsconfig.json ./
COPY source ./source

RUN bun run build

# Remove dev dependencies
RUN rm -rf node_modules \
    && bun install --production --frozen-lockfile

FROM oven/bun:1-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 3000

USER bun

CMD ["bun", "dist/index.js"]
