# Brewery Api using Hexagonal Architecture

[Brewery Api](https://api.openbrewerydb.org) used in this case.

Rest API using Hexagonal Architecture.

## Description

![img](/arch.png)

## Getting started

Create `.env` file in root, and fill with the same keys that `.end.dev`

Using `ENV='dev'` you will use sqlite in memory. Using `ENV='prod'` you will use postgresql connected to db url passed in config file.

To run the app with docker compose just use:

```sh
docker-compose up
```

You can see documentation and details of API in `http://localhost:8000/docs`

### Available routes

- POST /api/v1/user/create

- POST /api/v1/user/login

- GET /api/v1/brewery
