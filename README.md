# MERN Project with GraphQL and Prisma

Simple MERN Project using GraphQL and Prisma.

## Description

This project is application using the MERN stack (MongoDB, Express, React and Node.js) with GraphQL and Prisma. It's a simple application to manage users, with login.

The project is containerized using Docker and Docker Compose, for frontend, backend and database.

### Technologies Used

#### Backend

- JS libraries: [Express](http://expressjs.com/), [Prisma](https://www.prisma.io/), [GraphQL](https://graphql.org/), [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- Server environment: [Node.js](https://nodejs.org/en/)
- Programming Language: [TypeScript](https://www.typescriptlang.org/)

#### Frontend

- JS libraries: [React](https://reactjs.org/), [Apollo Client](https://www.apollographql.com/docs/react/)
- Programming Language: [TypeScript](https://www.typescriptlang.org/)
- Build tool: [Vite](https://vitejs.dev/)

#### Others

- Document database: [MongoDB](https://www.mongodb.com/)
- Containerization: [Docker](https://www.docker.com/)
- Dev Environment: [VSCode](https://code.visualstudio.com/) with [dev containers](https://code.visualstudio.com/docs/remote/containers).

## How to use for development with Dev Containers

You can use the VSCode dev containers to run the project in a containerized environment.

You need to have installed [Docker](https://www.docker.com/) and [VSCode](https://code.visualstudio.com/), and the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.

1. Clone this repository

```bash
git clone git@github.com:jhordyess/mern-crud-project.git
```

2. Open the project in VSCode

```bash
code mern-crud-project
```

3. Create a `.env` file in the root folder by copying the example from the [`.env.example`](./.env.example) file.

4. Open the integrated terminal (Ctrl+Shift+`) and run the following command:

```bash
docker compose -f docker-compose.devcontainer.yml up -d
```

5. Open the command palette (Ctrl+Shift+P) and select the option `Dev Containers: Open folder in Container`.

6. Select the folder `backend` and wait for the container to be built.

7. Open the integrated terminal (Ctrl+Shift+`) and run the following command:

```bash
yarn dev
```

8. Repeat the steps 5, 6 and 7 for the folder `frontend`.

9. Open the browser and visit <http://localhost:5173/> and lets code!

## How to use for production

To run the project in production mode, remember to create the `.env` file in the root folder by copying the example from the [`.env.example`](./.env.example) file.

Then, run the following command:

```bash
docker compose -f docker-compose.prod.yml up -d
```

To stop or remove the containers, use the following commands:

```bash
docker compose -f docker-compose.prod.yml down
```

Take note that this production configuration is just for testing purposes, and maybe need some changes to be used in a real production environment.

## To-Do

- Add seed for DB
- Add more to-do's 😅

## Contribution

If you would like to contribute to the project, open an issue or make a pull request on the repository.

## License

© 2022> [Jhordyess](https://github.com/jhordyess). Under the [MIT](https://choosealicense.com/licenses/mit/) license. See the [LICENSE](./LICENSE) file for more details.

---

Made with 💪 by [Jhordyess](https://www.jhordyess.com/)
