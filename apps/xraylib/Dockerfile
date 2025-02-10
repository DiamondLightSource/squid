FROM node:22-alpine AS base
RUN apk update && apk add bash

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!
# https://turbo.build/repo/docs/guides/tools/docker

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat bash wget
# Set working directory
WORKDIR /app
COPY package.json package.json

# bash
# https://pnpm.io/docker
# corepack pnpm installation

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN source /root/.bashrc && pnpm i -g turbo

# alternative manual installation
# RUN wget -qO- https://get.pnpm.io/install.sh | sh -
# RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
# ENV PATH="/root/.local/share/pnpm:$PATH"

# RUN source /root/.bashrc
# RUN npm i -g pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable
# RUN pnpm setup
# RUN pnpm i -g turbo
COPY . .
RUN pnpx turbo prune xraylib --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm i -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# RUN pnpm setup
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
