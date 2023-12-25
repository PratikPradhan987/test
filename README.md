# NextJS 14 and prisma setup

#### Setting up the application

```bash
  npx create-next-app@latest
  cd test
```

![NextJS Installation](https://github.com/PratikPradhan987/test/blob/main/public/nextJS_setup.jpeg?raw=true)

```bash
  npm install prisma --save-dev
  npx prisma init
```

#### Connecting Prisma with your Database

![MySql-DataBase](https://github.com/PratikPradhan987/test/blob/main/public/databaase_url.jpeg?raw=true)

```bash
  DATABASE_URL="mysql://<username>:<password>@localhost:3306/<db-name>"
```

## Using Mysql through Docker

### Docker setup

```bash
docker pull mysql

docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:latest

docker exec -it mysql-db bash
```

## Roadmap

- prisma init

```bash
  npx prisma init
```

- create model in

  `nexts-app->prisma->schema.prisma`

![Prisma-model](https://github.com/PratikPradhan987/test/blob/main/public/prisma-model.jpeg?raw=true)

#### database sync with schema

```bash
Npx prisma migrate dev –name create-user
```

### Connecting Prisma to Next.js

```bash
npm install @prisma/client
npx prisma generate
```

#### create prisma.js/client.js in prisma directory. THe file will host the client connection

```javascript
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
```

#### nextsJS CRUD codes

#### Create

```javascript
// saving data to database

import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, content, published } = req.body;
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
  res.json(result);
}
```

### Update

```javascript
// updating data of previous added data

import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { published } = req.body;
  const result = await prisma.post.update({
    where: {
      id: req.query.id,
    },
    data: {
      published: published,
    },
  });
  res.json(result);
}
```

### Read

```javascript
// Reading data from database

export const getStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};
```

### Delete

```javascript
// delete data

import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.post.delete({
    where: {
      id: req.query.id,
    },
  });
  res.json(result);
}
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
