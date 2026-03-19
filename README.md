# Task Manager

A full-stack task management application built with Angular, Spring Boot, and MySQL, fully containerized with Docker for one-command deployment.

---

## Tech Stack

| Layer     | Technology              | Version  |
|-----------|-------------------------|----------|
| Frontend  | Angular CLI             | 21.2.2   |
| Backend   | Spring Boot (Java)      | Java 21  |
| Database  | MySQL                   |          |
| Container | Docker & Docker Compose |          |

---

## Prerequisites

Make sure the following are installed on your machine before running the application:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Getting Started

```bash
# 1. Clone the repository
git clone <git@github.com:achala2702/task_manager.git>

# 2. Navigate into the project folder
cd <task_manager>

# 3. Start the full application
docker compose up
```

Docker will build and start all three services — frontend, backend, and database — automatically.

---

## Default URLs

| Service  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:4200 |
| Backend  | http://localhost:8080 |

---

## Features

- View all tasks in one place
- Create new tasks
- Edit existing task details
- Delete tasks
- Update the status of a task to track progress

---

## Project Structure

```
├── frontend/           # Angular application (port 4200)
├── backend/            # Spring Boot application (port 8080)
├── docker-compose.yml
└── README.md
```

---

## Docker Services

The `docker-compose.yml` defines three services:

- **frontend** — Angular app accessible on port `4200`
- **backend** — Spring Boot REST API accessible on port `8080`
- **db** — MySQL database, used internally by the backend

To stop all running services:

```bash
docker compose down
```

To stop all services and remove volumes (this will reset the database):

```bash
docker compose down -v
```

---
