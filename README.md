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

For correctly use you must create the database olx and collections following the models on `/src/models/` and a ".env" file with directions for the database like  `DATABASE=mongodb://127.0.0.1:27017/olx`

## Endpoints available

+ ### Test API [/ping]
  ### GET
  Route for only test communication purpose.
  + Response 200 (application/json):
    ``` 
    {"pong":true}
    ```

+ ### List States [/states]
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

+ ### User register [/user/signup]
  ### POST
  Route for send info from new user.
  + Request (application/json):
    ``` 
    {
	  "name": "Name",
	  "email":"name@teste.com",
	  "state":"60b9468d6bf3599325ede8e1",
	  "password":"123"
    }
    ```
    State must be the same id from the list [GET/states].

  + Response 201 (application/json):
    ``` 
    {
      "token": "$2b$10$2Mf3cdCyoQMQLKXJK6UDD.TO5jUnwhrWZ8CTlNPU1d4Z3coTQKlsK"
    }
    ```
    The `token` must be used to authorize next transactions. 

+ ### User signin [/user/signin]
  ### POST
  Route for login user.
  + Request (application/json):
    ``` 
    {
	  "name": "Name",
	  "password":"123"
    }
    ```

  + Response 200 (application/json):
    ``` 
    {
      "token": "$2b$10$2Mf3cdCyoQMQLKXJK6UDD.TO5jUnwhrWZ8CTlNPU1d4Z3coTQKlsK"
    }
    ```
    The `token` must be used to authorize next transactions. 

+ ### User info [/user/me]
  ### GET
  Route for send info from new user.
  + Request (application/json):
    ``` 
    {
	  "token": "$2b$10$2Mf3cdCyoQMQLKXJK6UDD.TO5jUnwhrWZ8CTlNPU1d4Z3coTQKlsK"
    }
    ```
    
  + Response 200 (application/json):
    ``` 
    {
      "name": "Name",
      "email": "name@teste.com",
      "state": "SP",
      "ads": []
    }
    ```

## TODO 
+ Implement JWT!
+ Finish endpoints documentation.