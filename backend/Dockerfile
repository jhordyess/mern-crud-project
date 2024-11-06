FROM node:18-alpine

WORKDIR /app

COPY package.json cmd.prod.sh .yarnrc.yml tsconfig.json yarn.lock ./
COPY prisma ./prisma
COPY src ./src

RUN yarn install --immutable

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG SECRET
ENV SECRET=${SECRET}

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["./cmd.prod.sh"]