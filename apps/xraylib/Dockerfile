FROM node:22-bookworm AS base
RUN apt-get update && apt-get upgrade -y

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!
# https://turbo.build/repo/docs/guides/tools/docker

FROM base AS builder

WORKDIR /app
COPY package.json package.json
COPY .dockerignore .dockerignore


ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install -g pnpm \
    && SHELL=bash pnpm setup

RUN pnpm i turbo

COPY . .
RUN pnpx turbo prune xraylib --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install -g pnpm \
    && SHELL=bash pnpm setup
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm i vite --filter xraylib
RUN pnpm turbo build --filter=xraylib

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/xraylib/next.config.js .
COPY --from=installer /app/apps/xraylib/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/xraylib/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/xraylib/.next/static ./apps/xraylib/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/xraylib/public ./apps/xraylib/public

CMD node apps/xraylib/server.js
