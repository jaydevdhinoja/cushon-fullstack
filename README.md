# ISA Investment Platform

This project implements a simple investment platform for Cushon's ISA offerings. It allows retail customers to select and invest in funds without being associated with an employer. The project is built with a React frontend and a Node.js/Express backend.

## Features

- **Fund Selection**: Users can view and select from a list of available investment funds.
- **Investment**: Users can specify the amount they wish to invest in a selected fund.
- **Investment Review**: Users can view their past investments.

## Technology Stack

- **Frontend**: React, TypeScript, SASS
- **Backend**: Node.js, Express
- **Database**: SQLite

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

You can check if you have Node and npm installed by running:

```bash
node --version
npm --version
```

### Installation

First, clone the repository to your local machine:

```bash
git clone https://github.com/jaydevdhinoja/cushon-fullstack.git
cd cushon-fullstack
```

**Setting up the Backend**
Navigate to the backend directory and install the necessary dependencies:

```bash
cd backend
npm install
```

Start the backend server:

```bash
npm run start:backend

or
cd backend
npm run debug
```

### Setting up the Frontend

Navigate to the frontend directory from the project root:

```bash
cd frontend
npm install
```

Start the frontend server:

```bash
npm run start:frontend

or
cd frontend
npm run start
```

### Start both Backend and Frontend same time

Navigate to root directory and run the following command:

```bash
npm run start
```

This will install all the dependencies in both backend and frontend and start backend server with default **3001** PORT and frontend with default **http://localhost:3000** url

### Usage

After starting both the frontend and backend, navigate to http://localhost:3000 in your web browser to use the application.

## License

This project is licensed under the MIT License.
