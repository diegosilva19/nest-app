FROM node:16

ARG APP_ENV
ENV APP_ENV $APP_ENV

RUN apt-get update && apt-get install -y openssl
#RUN apk add --no-cache bash openssl

WORKDIR /app

COPY . .
COPY .docker/entrypoint.sh .

RUN if [ "$APP_ENV" = "prod" ] || [ "$APP_ENV" = "qa" ]; then \
        echo "\n\n****** Running Env: $APP_ENV ****** install dependecies\n\n" \
        && yarn install \
        && yarn build; \
fi

RUN chmod a+x "./entrypoint.sh"

EXPOSE 3000
ENTRYPOINT [ "./entrypoint.sh" ]