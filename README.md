This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Run with Docker
You'll be able to test the program by running the following commands:


```bash
docker build -t comment_search:latest .
docker run -p 8080:8080 comment_search:latest
````



## Features
The application let the user search specific posts or comments by using the  `jsonplaceholder`  API.

There is a pagination so user can go back and forward results

## UNIT TEST
The function that fetch data is tested with  `JEST`

