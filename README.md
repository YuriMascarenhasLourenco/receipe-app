🍳 Recipe Book AI

AI-powered recipe generation with NestJS, Azure AI Foundry, PostgreSQL, TypeORM, i18n, Docker & JWT Authentication

<div align="center">
🚀 A multilingual, AI-driven recipe backend built with Clean Architecture principles

🔧 Technologies
Nest.js, Docker, CI pipeline, JWT authentication, LLM integration


📊 Status




</div>
📖 Overview

Recipe Book AI is a backend service that generates intelligent recipes from Brazilian and American cuisine using Azure AI Foundry.
It supports:

🌍 Internationalization (i18n)

🔐 JWT Authentication

👤 User CRUD

🍽️ Recipe CRUD

🤖 AI Recipe Generation

🐳 Docker Deployment

📘 Swagger Documentation

Built with Clean Architecture principles for scalability, maintainability, and long-term reliability.

✨ Features
🔥 Core Highlights

🤖 AI-generated recipes (Azure AI LLM)

🌍 Multilingual support via Accept-Language

🔐 Secure JWT authentication

🗄️ PostgreSQL + TypeORM storage

🧱 Clean Architecture folder separation

🐳 Full Docker orchestration

📝 Swagger API documentation

🧠 AI Recipe Engine

Returns recipes in the structure:

{
  "name": "Brazilian Feijoada",
  "ingredients": "...",
  "instructions": "..."
}

📂 Project Structure

src/
├── domain
│   ├── entities
│   ├── interfaces
│   └── auth
├── application
│   ├── use-cases
│   ├── dtos
│   └── services
├── infrastructure
│   ├── database
│   ├── repositories
│   ├── mappers        # ORM <-> Domain conversion
│   ├── auth
│   ├── ai
│   ├── i18n
│   └── typeorm
└── presentation
    ├── controllers
    ├── filters
    ├── guards
    ├── interceptors
    └── swagger

🛠️ Installation (Local)
1. Clone the project
git clone https://github.com/YuriMascarenhasLourenco/receipe-app
cd receipe-app

2. Install dependencies
npm install

3. Create .env

DB_HOST 
DB_NAME
DB_PASSWORD
DB_PORT
DB_USERNAME
GH_AI_ENDPOINT
GH_AI_MODEL
JWT_SECRET
LANGUAGE
PORT


LANGUAGE=pt

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

4. Start PostgreSQL
docker run --name postgres-recipe \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres

5. Start the server
npm run start:dev

🐳 Running with Docker
Start all services
docker compose up --build -d

URLs

📌 API Base: http://localhost:3000
📌 Swagger Docs: http://localhost:3000/api

🔐 Authentication Flow
Register
POST /auth/register
{
  "name": "Yuri",
  "email": "yuri@example.com",
  "password": "123456"
}

Login
POST /auth/login
{
  "email": "yuri@example.com",
  "password": "123456"
}


Response:

{
  "access_token": "jwt_here"
}

Use token in requests
Authorization: Bearer your_token
Accept-Language: en

👨‍🍳 AI Recipe Generation
Generate

POST /recipes/generate

{
  "name": "Feijoada"
}

🌍 Internationalization (i18n)

Set via header:

🇧🇷 Portuguese

Accept-Language: pt


🇺🇸 English

Accept-Language: en


DTO validation, exceptions, and messages automatically adapt.

📘 Swagger Documentation

📌 Access at:

http://localhost:3000/docs


Includes:

Auth button

DTO schemas

Route grouping

Language selector

🧰 Scripts
npm run start
npm run start:dev
npm run test
npm run build

🧠 Technologies Used
<div align="center">
node.js, Nest.js, Typescript, JWT, 










</div>
📄 License

This project is licensed under the MIT License.

⭐ Support the Project

If you enjoy this project, please consider leaving a ⭐ star on GitHub.
It helps a lot and motivates continued development!


