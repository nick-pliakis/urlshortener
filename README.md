# URL Shortener

This project aims at implementing a simple URL shortener. The project has been implemented as a three-tiered application with the following stack:

* Database layer, implemented with the PostgreSQL RDBMS
* Backend layer, implemented in Python with the Django framework
* Frontend layer, implemented in React

The three layers have been implemented as docker containers, and docker-compose was used.

Two functionalities are supported.

* The user inputs the URL they want to shorten and clicks the button on the right. The system returns a notification on whether or not the operation was successful. If a URL is produced and returned, it is copied to the clipboard, otherwise an error message appears
* The user inputs a URL that they have already shortened, and if the URL is present in the system, it is returned to the user. A notification appears if the URL is not present in the system

## Installation instructions

1. Navigate to a folder of your choice and clone the project:
```
git clone https://github.com/nick-pliakis/urlshortener.git .
```
2. Navigate to the folder ```backend/urlshortener/urlshortener```. Create an ```.env``` file by copying the existing ```.env.example``` file
```
cp .env.example .env
```
Populate the ```POSTGRES_USER``` and ```POSTGRES_PASSWORD``` fields with the appropriate values. Please note that these values must be the same as the corresponding values in the ```stack``` folder (see below)

3. Navigate to the folder ```stack```. Create an ```.env``` file by copying the existing ```.env.example``` file
```
cp .env.example .env
```
Populate the ```POSTGRES_USER``` and ```POSTGRES_PASSWORD``` fields with the appropriate values. Please note that these values must be the same as the corresponding values in the ```backend/urlshortener/urlshortener``` folder (see below)

4. While in the folder ```stack```, build the application stack with ```docker-compose```:
```
docker-compose up -d
```
5. Perform the database migrations by entering the backend container and running the ```migrate``` command:
```
docker exec -it api bash
python manage.py migrate
```
6. The app should now be up and running. 
 
You can navigate to ```http://localhost:3000``` to use the app's functionalities.

## How it works

The backend application has been implemented as an API, with two main routes that can perform the necessary functionalities. To shorten a URL, the application encodes it with the shake_128 Python function. Since cryptographic hashes have a small chance of collision, the output is further encoded by converting it to a base64 representation. The resulting URL, along with the initial URL, is stored in the PostgreSQL database for later retrieval, along with the datetime of the operation. 

When passing a shortened URL, a query is performed in the database, and if the requested URL can be matched with a previously stored URL, both the URLs are returned to the user and shown in the application.

In both cases, if a URL is returned, it is automatically copied to the clipboard.

## Future improvements

The following is a list of improvements that could be implemented:

* Modify the Dockerfiles to support a development and a production environment and create additional docker-compose.override.yml files for each
* Introduce the option to shorten the URL by using an external service, such as bit.ly
* General layout improvements, such as separating the two functionalities with tabs
* Introduce serializers for validating the input in the backend
* Modify the routes and make the API more RESTful
* Implement a test suite
