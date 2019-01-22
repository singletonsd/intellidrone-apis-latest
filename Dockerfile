FROM keymetrics/pm2:8-alpine

LABEL mainteiner="Patricio Perpetua <patricio.perpetua.arg@gmail.com>" \
    name="intellidrone/api" \
    architecture="x86_64" \
    vendor="SINGLETON" \
    vcs-type="git" \
    vcs-url="https://gitlab.com/intelliDrone/api_new.git" \
    distribution-scope="private" \
    Summary="Image to run intellidrone api."

RUN apk add --no-cache \
    python \
    bash make gcc g++ openssh-keygen

ENV PYTHON /usr/bin/python

WORKDIR /usr/app

COPY src src/
COPY package.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

RUN npm install -g nodemon

EXPOSE 3000

COPY scripts/init_service.sh scripts/
COPY scripts/keys_generator.sh scripts/
COPY environment/.docker.env ./.env
COPY database.json .
COPY ecosystem.config.docker.js ./ecosystem.config.js
# Generate keys and api_tokens file.
RUN ./scripts/init_service.sh p

VOLUME /usr/app/assets

# Show current folder structure in logs
RUN ls -al -R src && ls -al .

RUN apk del bash openssh-keygen python bash make gcc g++ \
    && rm -rf /var/cache/apk/*

EXPOSE 3000

CMD [ "pm2-runtime", "start", "src/server.js" ]