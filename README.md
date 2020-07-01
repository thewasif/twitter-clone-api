<center>
<h1>Twitter Clone API</h1>
<p>Backend for Twitter Clone Client</p>
</center>

## 🧑‍💻 Tech Stack

- Node.js
- Expressjs
- Mongoose (MonogDB)
- JSON Web Tokens and other nodejs libraries

## 🤖 Set Environment Variables

Insert all values in `.env.example` file and rename the file to `.env`

- Create a MongoDB database and paste mongo uri string or you can use mongodb locally
- Create a cloudinary account and paste API Key, Cloud name and Cloudinary Secret. This will be used for uploading photos to cloudinary
- JWT Secret can be any string

## 📦 Setup

To run this app locally,

```bash
$ git clone https://github.com/MuhammadWasif/twitter-clone-api.git
$ cd twitter-clone-api
$ npm install
$ npm start
```

> Don't forget to set environment variables after cloning the repo

The app wil start on http://localhost:5000

## 🐟 Run with Docker

To run the container run following commands inside the directory

- Create image  
  `docker build -t twitter-clone-api .`
- Run container  
  `docker run -d -p 5000:5000 --name=twitter-api twitter-clone-api`

## ⚙️ Workflow

The API is deployed to Heroku (Platfrom as a Service) Cloud. GitHub Actions has been used for Continuous Deployment (CD)

_Happy Coding!_
