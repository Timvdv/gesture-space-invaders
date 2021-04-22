# Next boilerplate

This is based on the Mirabeau Front-end boilerplate but now React based (using NextJS) and stacked with new functionalities.

What I (Tim) added

- Husky for pre commit linting, checks CSS / JS
- TypeScript (this is very opinionated but I think the best choice)
- CSS Modules
- Few added linting rules
  - Added mandatory React/NextJS linting
  - Added TypeScript linting
  - Added A11Y linting

TODO:

- [] Fix the no-js stuff in the carousel
- [] Fix storybook absolute URLs in scss (right now it errors, works in nextjs though)
- [] Add testing setup

## Easily start your next project

Quickstart your application using the following command

`npx create-next-app your-project-name --example https://github.com/Timvdv/next-boilerplate`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Storybook

How to use Storybook

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
