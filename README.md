# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

First, yo have to upload the server (shippify-backend), following the instructions given in the README file

In the project directory (shippify-frontend) you must run:
### `npm i`
### `npm start`


## Important considerations

Some data has been seeded.

Nevertheless, for the “List vehicles by driver” function to work correctly, it’s necessary to create a vehicle first; so that the relationship between driver and vehicle can be adequately established.

Since the entry of new drivers was not within the scope of the project, the creation of new vehicles requires the use of one of the drivers’ emails. This information was included in the seed.js file of the backend. This data will appear when clicking the “Drivers” option.

If it is required to create a driver, it must be done using the Postman application, making a POST request:

### `method: POST`
### `address: http://localhost:3001/api/drivers`
### `body:     {
        "name": "set the name",
        "email": "set the email",
    },`


Runs the server in the development mode.\
Open [http://localhost:3001](http://localhost:3000) to view it in your browser.

You may see any lint errors in the console.
