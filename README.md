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

+ ### List Categories [/categories]
  ### GET
  Route to list the categories stored on DB.
  + Response 200 (application/json):
    ``` 
    {
      "categories": [
      {
        "_id": "60ea4be78980be3da569df7a",
        "name": "Bebês",
        "slug": "baby",
        "img": "http://localhost:5000/assets/images/baby.png"
      },
      {
        "_id": "60ea4c298980be3da569df7b",
        "name": "Carros",
        "slug": "cars",
        "img": "http://localhost:5000/assets/images/cars.png"
      },
      {
        "_id": "60ea4c408980be3da569df7c",
        "name": "Roupas",
        "slug": "clothes",
        "img": "http://localhost:5000/assets/images/clothes.png"
      },
      {
        "_id": "60ea4c698980be3da569df7d",
        "name": "Eletrônicos",
        "slug": "electronics",
        "img": "http://localhost:5000/assets/images/electronics.png"
      },
      {
        "_id": "60ea4c868980be3da569df7e",
        "name": "Esportes",
        "slug": "sports",
        "img": "http://localhost:5000/assets/images/sports.png"
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
  
  ### POST
  Route for send info from new user.
  + Request (application/json):
    ``` 
    {
	  "token": "$2b$10$2Mf3cdCyoQMQLKXJK6UDD.TO5jUnwhrWZ8CTlNPU1d4Z3coTQKlsK",
      "name": "New Name"
    }
    ```
    It is possible to send only the fields that must be edited, not required to send all data.
    
  + Response 200 (application/json):
    ``` 
    {
      "name": "New Name",
      "email": "name@teste.com",
      "state": "SP",
      "ads": []
    }
    ```
+ ### Ads list [/ad/list]
  ### GET
  Route for request ads list. 
  + Response 200 (application/json):
    ``` 
    {
      "ads": [
        {
          "id": "60efa9f46d1c75621dba485b",
          "title": "Test",
          "price": 222.35,
          "priceNegotiable": true,
           "image": "http://localhost:5000/media/b1e11380-4a49-4877-aeca-e5a8a37c49e6.jpg"
        }
      ],
      "total": 1
    }
    ```

+ ### Get Item by ID [/ad/:id]
  ### GET
  Route for request all info from an id. 
  + Response 200 (application/json):
    ``` 
    {
      "id": "60efa9f46d1c75621dba485b",
      "title": "Teste de edição",
      "price": 222.35,
      "priceNegotiable": true,
      "description": "Qualquer coisa",
      "dateCreated": "2021-07-15T03:22:28.807Z",
      "views": 42,
      "images": [
         "http://localhost:5000/media/b1e11380-4a49-4877-aeca-e5a8a37c49e6.jpg"
      ],
      "category": {
        "_id": "60ea4be78980be3da569df7a",
        "name": "Bebês",
        "slug": "baby"
      },
      "userInfo": {
        "name": "Isaac",
        "email": "isaac@teste.com"
      },
      "stateName": "RJ",
      "others": []
    }
    ```

## TODO 
+ Implement JWT!
+ Finish endpoints documentation.