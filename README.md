# Clone OLX Backend

## Introduction to project

This project is about to replicate a backend from the old version of website [https://www.olx.com.br](https://www.olx.com.br). This API uses a MongoDB to save informations from Users, Ads, States and Categories of Products.

## Status 

### `complete`

## Instructions

Clone the repository and in the project directory run:


### For nodemon use and edit

```
npm install
npm run startDev
```


### For tests or simple usage

```
npm install
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Endpoints available

+ ### Test API [/ping]
  ### GET
  Route for only test communication purpose.
  + Response 200 (application/json):
    ``` 
    {"pong":true}
    ```

+ ### Test API [/states]
  ### GET
  Route to list the states stored on DB.
  + Response 200 (application/json):
    ``` 
    {
  "states": [
    {
      "_id": "60b9468d6bf3599325ede8e1",
      "name": "SP"
    },
    {
      "_id": "60b946ae6bf3599325ede8e2",
      "name": "RJ"
    },
    {
      "_id": "60b946eb6bf3599325ede8e3",
      "name": "MG"
    }
  ]
}
    ```