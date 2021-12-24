# Restaurant Reservation Capstone Projct

This is a full-stack application that allows users (restaurant staff) to create and manage customer reservations and tables at a restaurant.

Project Link: {link}

## Tech Used

Frontend: Javascript, React, HTML, CSS, Bootstrap
Backend: Node, Express, Knex, PostgreSQL, ElephantSQL, DBeaver

## API Endpoints
| URL | HTTP METHOD | DESCRIPTION | 
| ------ | ------ | ------ |
| "/reservations" | GET | Lists all reservations|
| "/reservations" | POST | Creates a new reservation |
| "/reservations/:reservationId" | GET | Reads a specific reservation by its id |
| "/reservations/:reservationId" | PUT | Updates a specific reservation by its id |
| "/reservations/:reservationId/status" | PUT | Updates the status of a specific reservation by its id |
| "/tables" | GET | Lists all tables |
| "/tables" | POST | Creates a new table |
| "/tables/:tableId/seat" | PUT | Seats a reservation at a specific table |
| "/tables/:tableId/seat" | DELETE | Finishes an occupied table  |

### Dashboard
On the dashboard page, you will see the details displayed for all tables and reservations on a specific date. When the customer arrives at the restaurant and is ready to be seated, you can click the 'Seat' button to find an open table. For each reservation, you can make changes by clicking 'Edit', or you can cancel the reservation by clicking 'Cancel'. 
Each table will display its name, capacity, and status, along with a button that allows the user to delete the table.
![Dashboard](https://user-images.githubusercontent.com/80934345/147151219-557515d1-05f3-4602-9004-15a580cd35f4.png)

### Create a new Reservation
From the menu, navigate to the new reservation page by clicking on 'New Reservation'. Fill out the form then click submit. You will then be taken back to the dashboard page where you can view the reservation you just created. The dashboard will display all reservations for that date.
![screenshot](https://user-images.githubusercontent.com/80934345/147151709-2d03ef48-b450-42f9-a148-7e0e844da9d0.png)

### Seat Reservation
![screenshot](https://user-images.githubusercontent.com/80934345/147152296-c7777dea-1644-42ed-82a3-d82092151e27.png)

![screenshot](https://user-images.githubusercontent.com/80934345/147152629-167a1cfd-8981-4ba6-867a-9b8817bcc8e2.png)

### New Table Page
From the menu, navigate to the new table page by clicking on 'New Table'. Fill out the form then click submit. You will then be taken back to the dashboard page where you can view all of the tables at the restaurant. 
![screenshot](https://user-images.githubusercontent.com/80934345/147153629-9a029e6d-43f8-44d2-bc54-350bb7cde401.png)

### Search Customer Page
From the menu, navigate to the search customer page by clicking on 'Search'. Enter a partial or whole phone number of a customer, then click search. This will display all customers that exist in the database that match the phone number.
![screenshot](https://user-images.githubusercontent.com/80934345/147153188-5f26317f-3891-4ef0-b083-39681035c01e.png)

## Installation
1. Fork and clone this repository.
2. Run cp ./back-end/.env.sample ./back-end/.env.
3. Update the ./back-end/.env file with the connection URL's to your ElephantSQL database instance.
4. Run cp ./front-end/.env.sample ./front-end/.env.
5. Include your backend connection within ./front-end/.env (defaults to http://localhost:5000)
6. Run npm install to install project dependencies.
7. Run npm run start to start the server.