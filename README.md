<div style="text-align: justify;">
<div style="display: flex; align-items: center; justify-content: space-between;">
    <h1>Domain 4632 Project</h1>
    <img src="./docs/domain.jpeg" alt="CycloOwlIcon" width="100"/>
</div>

## Project Description

This project is a room management application designed to analyze temperature data across multiple areas of a house. The data collection is performed using **ESP32** devices equipped with **DHT22** temperature and humidity sensors, which transmit data to the API at a specified frequency. 

### Technologies 

- **Nginx** : [https://nginx.org/](https://nginx.org/)
- **Docker** : [https://www.docker.com/](https://www.docker.com/)
- **NestJs** : [https://nestjs.com/](https://nestjs.com/)
- **MongoDb** : [https://www.mongodb.com/fr-fr](https://www.mongodb.com/fr-fr)

## Build and start development environment

Navigate to the directory containing your docker-compose.yml file. Build and run the Docker container using :

```bash
docker compose up -d --build 
```

This will run 3 containers : 
- **reverse-proxy** : Nginx application
- **domain4632-api** : NodeJs (NestJs) API that contains the logic to save and provide room and temperature data
- **domain4632-db** : MongoDb database

## Run tests

To run the tests :
```bash
docker compose up -d
docker exec domain4632-api npm run test
```
