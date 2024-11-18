## How to run locally

1. Clone the repository

```
git clone https://github.com/devkrishnasai/tutor-app .
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables

```env
DATABASE_URL="postgresql://krishna:krishna@localhost:5432/tutor?schema=public"
```

3. Run database

```bash
docker compose up -d
```

4. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

5. Generate Prisma Client

```bash
npx prisma generate
```

6. Run the server

```bash
npm run dev
```

7. Open the browser and navigate to `http://localhost:3000`
