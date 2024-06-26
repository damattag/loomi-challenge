FROM node:20.9

RUN corepack enable

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm generate

COPY --chown=node:node . .

USER node

EXPOSE 3001

CMD [ "pnpm", "dev" ]

# para a documentação seguida para construção desse arquivo, vá para o step 3 do link:
# https://www.digitalocean.com/community/tutorials/como-construir-uma-aplicacao-node-js-com-o-docker-pt