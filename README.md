<p align="center">
  <a href="https://nextjs-fastapi-starter***REMOVED***vercel***REMOVED***app/">
    <img src="https://assets***REMOVED***vercel***REMOVED***com/image/upload/v1588805858/repositories/vercel/logo***REMOVED***png" height="96">
    <h3 align="center">Next***REMOVED***js FastAPI Starter</h3>
  </a>
</p>

<p align="center">Simple Next***REMOVED***js boilerplate that uses <a href="https://fastapi***REMOVED***tiangolo***REMOVED***com/">FastAPI</a> as the API backend***REMOVED***</p>

<br/>

## Introduction

This is a hybrid Next***REMOVED***js + Python app that uses Next***REMOVED***js as the frontend and FastAPI as the API backend***REMOVED*** One great use case of this is to write Next***REMOVED***js apps that use Python AI libraries on the backend***REMOVED***

## How It Works

The Python/FastAPI server is mapped into to Next***REMOVED***js app under `/api/`***REMOVED***

This is implemented using [`next***REMOVED***config***REMOVED***js` rewrites](https://github***REMOVED***com/digitros/nextjs-fastapi/blob/main/next***REMOVED***config***REMOVED***js) to map any request to `/api/:path*` to the FastAPI API, which is hosted in the `/api` folder***REMOVED***

On localhost, the rewrite will be made to the `127***REMOVED***0***REMOVED***0***REMOVED***1:8000` port, which is where the FastAPI server is running***REMOVED***

In production, the FastAPI server is hosted as [Python serverless functions](https://vercel***REMOVED***com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel***REMOVED***

## Demo

https://nextjs-fastapi-starter***REMOVED***vercel***REMOVED***app/

## Deploy Your Own

You can clone & deploy it to Vercel with one click:

[![Deploy with Vercel](https://vercel***REMOVED***com/button)](https://vercel***REMOVED***com/new/clone?repository-url=https%3A%2F%2Fgithub***REMOVED***com%2Fdigitros%2Fnextjs-fastapi%2Ftree%2Fmain)

## Developing Locally

You can clone & create this repo with the following command

```bash
npx create-next-app nextjs-fastapi --example "https://github***REMOVED***com/digitros/nextjs-fastapi"
```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result***REMOVED***

The FastApi server will be running on [http://127***REMOVED***0***REMOVED***0***REMOVED***1:8000](http://127***REMOVED***0***REMOVED***0***REMOVED***1:8000) – feel free to change the port in `package***REMOVED***json` (you'll also need to update it in `next***REMOVED***config***REMOVED***js`)***REMOVED***

## Learn More

To learn more about Next***REMOVED***js, take a look at the following resources:

- [Next***REMOVED***js Documentation](https://nextjs***REMOVED***org/docs) - learn about Next***REMOVED***js features and API***REMOVED***
- [Learn Next***REMOVED***js](https://nextjs***REMOVED***org/learn) - an interactive Next***REMOVED***js tutorial***REMOVED***
- [FastAPI Documentation](https://fastapi***REMOVED***tiangolo***REMOVED***com/) - learn about FastAPI features and API***REMOVED***

You can check out [the Next***REMOVED***js GitHub repository](https://github***REMOVED***com/vercel/next***REMOVED***js/) - your feedback and contributions are welcome!
