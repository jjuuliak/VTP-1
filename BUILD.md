Run the following command to build the docker images:
```
docker compose build
```
If you work on multiple branches of the project add `--no-cache` argument so that project is build from scratch

Run the following command to launch the project. This will create a docker network and build images as containers on it.
```
docker compose up
```
If you don't want to see the printouts from the containers, add argument `-d` to launch the container in a detached mode. 

You can access the  web application in a web browser by navigating to http://localhost:3000. The backend server can be also connected to through http://localhost:8080.

Once the containers are running you can run the backend tests with
```
docker exec vtp-backend-1 npm test
```
Exit the test printout with `ctrl + c` 


To close the project use command
```
docker compose down
```
to shutdown the containers

If you have problems with mysql database container, use the command
```
docker volume rm vtp_db_data
```
to remove the stored databse. Note that this will destroy all the data stored in there. Once you launch the project again the mysql container will create a new database file in the volume.