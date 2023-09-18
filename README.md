# MERN CRUD Project

CRUD Project using MERN stack, manage employees and it's login user.

## Description

This project is a CRUD application using the MERN stack (MongoDB, Express, React and Node.js). It's a simple application to manage employees and it's login user.

The backend is a REST API that uses [Prisma](https://www.prisma.io/) as ORM to connect to a [MongoDB](https://www.mongodb.com/) database.

The frontend is a React application using [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/) as build tool.

The project is containerized using Docker and Docker Compose, for frontend, backend and database.

Also I've created a [public collection](https://postman.com/jhordyess/workspace/mern-crud-project/documentation/20955361-9d0c8233-2917-4bc1-8aca-01a83f65ee26) for this project in Postman, that you can use to test the API. Note that you need to have the backend running in order to use it.

### Technologies Used

#### Backend

- JS libraries: [Express](http://expressjs.com/), [Prisma](https://www.prisma.io/)
- Server environment: [Node.js](https://nodejs.org/en/)

#### Frontend

- JS libraries: [React](https://reactjs.org/)
- Programming Language: [TypeScript](https://www.typescriptlang.org/)
- Build tool: [Vite](https://vitejs.dev/)

#### Others

- Document database: [MongoDB](https://www.mongodb.com/)
- Containerization: [Docker](https://www.docker.com/)
- Dev Environment: [VSCode](https://code.visualstudio.com/) with [dev containers](https://code.visualstudio.com/docs/remote/containers) in [Zorin OS](https://zorinos.com/)

## How to use for development

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
docker compose -f docker-compose.dev.yml up -d
```

5. Open the command palette (Ctrl+Shift+P) and select the option `Dev Containers: Open folder in Container`.

6. Select the folder `backend` and wait for the container to be built.

7. Open the integrated terminal (Ctrl+Shift+`) and run the following command:

```bash
yarn dev
```

8. Repeat the steps 5, 6 and 7 for the folder `frontend`.

9. Open the browser and visit <http://localhost:5173/> and lets code!

## To-Do

- Develop frontend
- Add seed for DB
- Prepare for production
- Add more to-do's 😅

## Contribution

If you would like to contribute to the project, open an issue or make a pull request on the repository.

## License

© 2022> [Jhordyess](https://github.com/jhordyess). Under the [MIT](https://choosealicense.com/licenses/mit/) license. See the [LICENSE](./LICENSE) file for more details.

---

Made with 💪 by [Jhordyess](https://www.jhordyess.com/)
