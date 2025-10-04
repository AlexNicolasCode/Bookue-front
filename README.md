# Bookue Front

A modern and responsive frontend application for managing books, built with Next.js and styled using Tailwind CSS.

## Features

* **User Authentication**: Secure login and registration using JWT tokens.
* **Book Management**: View, add, edit, and delete books.
* **Responsive Design**: Optimized for both desktop and mobile devices.
* **Dark Mode**: Toggle between light and dark themes.
* **API Integration**: Connects seamlessly with the [Bookue API](https://github.com/AlexNicolasCode/Bookue-api).

## Technologies Used

* **Next.js**: React framework for building the application.
* **React**: JavaScript library for building user interfaces.
* **Tailwind CSS**: Utility-first CSS framework for styling.
* **JWT**: JSON Web Tokens for secure authentication.
* **Axios**: Promise-based HTTP client for the browser and Node.js.

## Getting Started

### Prerequisites

* Node.js (>=14.0.0)
* npm or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/AlexNicolasCode/Bookue-front.git
cd Bookue-front
```

Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

## Usage

* **Login**: Use the credentials provided in the backend's README or register a new account.
* **Dashboard**: After logging in, you'll be redirected to the dashboard where you can manage your books.
* **Dark Mode**: Toggle the theme using the button located at the top-right corner.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature-branch`).

3. Make your changes.

4. Commit your changes using **Conventional Commits**:

   * **feat**: for new features
   * **fix**: for bug fixes
   * **docs**: for documentation changes
   * **style**: for code formatting or style changes
   * **refactor**: for code refactoring
   * **test**: for adding or updating tests
   * **chore**: for maintenance tasks

   Example: `git commit -m "feat: add dark mode toggle"`

5. Push to the branch (`git push origin feature-branch`).

6. Create a new Pull Request.
