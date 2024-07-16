# System Requirements

- Nodejs v21.4.0
- MySQL

&nbsp;

# Generate Prisma ORM

- npm install to install dependencies
- add file .env
- add database url to .env DATABASE_URL="mysql://root:@localhost:3306/marketplace_db?schema=public"
- npx prisma migrate dev to run migration
- npx prisma generate to generate prisma client

&nbsp;

# Running Application

- npm run dev
- make sure the terminal showing {"level":"info","message":"app listening on http://localhost:4000"} on the console
- app already running on local

&nbsp;
### Notes
- If you want to call API in collection API on postman need to add some header Authorization with value token that generated on login after register an user