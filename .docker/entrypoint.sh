#!/bin/bash

if [ "$APP_ENV" = "dev" ]; 
    then
        echo "Install depencies"
            yarn install
            yarn run start:dev
    else 
        echo "Running - $APP_ENV"
        yarn run start:prod
fi