FROM node


COPY . /app
WORKDIR /app

RUN npm i

RUN groupadd -r appuser && useradd --no-log-init -r -g appuser appuser
USER appuser

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]