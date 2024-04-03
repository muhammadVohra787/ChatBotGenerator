# **Robust Authentication & Authorization**

Welcome to **Robust Authentication & Authorization**, a comprehensive solution designed to streamline authentication and authorization processes in your projects. This template offers a robust foundation for future endeavors, complete with API call hooks, user authentication hooks, and user location tracking functionalities. Additionally, it features multiple meticulously crafted components that can be easily reused across various projects.
#### Deployed: <a>https://auth-app-full-stack-beta.vercel.app/</a>
## Technologies Utilized

![React Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/64px-React-icon.svg.png) ![Node.js Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/64px-Node.js_logo.svg.png) ![PostgreSQL Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/64px-Postgresql_elephant.svg.png) <img src="https://mui.com/static/logo.png" width="64" height="64" alt="Material-UI Logo">


### Additional Libraries
- React Auth Kit
- Tanstack Query
---

### Nodemailer Integration
Nodemailer is used to handle email notifications for the forget password functionality. Ensure that you have configured Nodemailer properly in your project to enable this feature. You may need to set up SMTP credentials or use other email service providers for sending emails.

### Getting Started

To begin using this template, follow these simple steps:

1. **Set Up Environment Variables:**
   - Add a `.env` file to the server and configure the necessary environment variables. Template files have been provided for your convenience.

2. **Install Dependencies:**
   - Run `npm run install-deps` to automatically install dependencies for both the server and the client.

3. **Start the Application:**
   - Execute `npm start` to concurrently start the server and client, leveraging the provided scripts.

---

### npm Scripts

```json
{
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && nodemon server",
    "client": "cd client && npm start",
    "install-deps": "cd server && npm install && cd ../client && npm install"
  }
}
```

---

Enhance your project's authentication and authorization capabilities today with **Robust Authentication & Authorization**. Happy coding! 🚀
