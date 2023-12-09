# Webfejlesztés-projekt

This is a CRUD application with Spring Boot as backend, Angular as frontend, and with an H2 database. Here you can create, read, update, and delete the information of owners and their pets.

## Made with

- Java 17
- Spring Boot
- Maven
- Angular 16

## How to run

- Clone this repository
- Open terminal in the backend directory
- Run `mvn clean install` to build the application
- Run `mvn spring-boot:run` to start the server
- Open terminal in the frontend directory
- Run `npm install` to install the necessary npm packages
- Run `ng serve` to start the Angular application

Backend location: `http://localhost:9090`.\
Frontend location: `http://localhost:4200`.

## API

- `/api/owners`: GET request to retrieve all owners.
- `/api/owners/{id}`: GET request to retrieve an owner by their ID.
- `/api/owners`: POST request to create an owner.
- `/api/owners/{id}`: PUT request to update an owner by their ID.
- `/api/owners/{id}`: DELETE request to delete an owner by their ID.
- `/api/owners`: DELETE request to delete all owners.
- `/api/owners/{ownerId}/pets`: GET request to recieve all pets of an owner by their ID.
- `/api/pets/{id}`: GET request to retrieve a pet by its ID.
- `/api/pets/{id}/ownerId`: GET request to retrieve the ID of a pets owner by its ID.
- `/api//owners/{ownerId}/pets`: POST request to create a pet for an owner by their ID.
- `/api/pets/{id}`: PUT request to update a pet by its ID.
- `/api/pets/{id}`: DELETE request to delete a pet by its ID.
- `/api/owners/{ownerId}/pets`: DELETE request to delete all pets of an owner by their ID.
