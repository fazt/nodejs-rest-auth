## Node REST API Authentication

This project is a REST API example using Nodejs, Mongodb, Redis and docker. The code is written considering a production environment with docker-compose in the cloud

### Installation for production

Requeriments:
* Nodejs
* Redis
* Mongodb

### Installation for development with docker-compose (Recommended)

Fist, you need to clone the project and install the dependencies
```
git clone https://github.com/FaztWeb/nodejs-restapi-auth
cd nodejs-restapi-auth
npm install 
```

then, you can execute docker-compose for redis and mongodb

```
docker-compose up -d
```

finally, you can run the project with the command

```
npm run dev
```

now you can visit the http://localhost:3000 with your favorite *rest client*
