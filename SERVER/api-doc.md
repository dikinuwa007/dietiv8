# Dietiv8 API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `PUT /users/:id`
- `GET /achievements`
- `POST /achievements`
- `GET /foods`
- `GET /openai/menu` 
- `GET /menus/:historyId`
- `POST /menus/:historyId`
- `PATCH /menus/:historyId`
- `GET /histories/now`
- `GET /foods`
- `POST /foods/:historyId`
- `GET /fitnes/bmi`
- `GET /users/:id`


  &nbsp;

## 1. POST /users/register

Request:

- body:

```json
{
	"username":"sayabedjo",
	"gender":"male",
	"email":"sayabedjo1234@mail.com", 
	"password":"sayabedjo", 
	"weight":"60", 
	"height":"170",
	"dateBirth":"1997-01-26",
	"activityLevel":"1",
	"extra":"diabetes",
	"targetWeight":"70"
}
```

_Response (201 - Created)_

```json
{
	"gender": "male",
	"username": "sayabedjo",
	"email": "sayabedjo1234@mail.com",
	"weight": 60,
	"height": 170,
	"extra": "diabetes",
	"calorieLimit": 1538,
	"targetWeight": "70"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password cannot be empty"
}
OR
{
  "message": "Weight cannot be empty"
}
OR
{
  "message": "Height cannot be empty"
}
OR
{
  "message": "Date Birth cannot be empty"
}
OR
{
  "message": "Activity Level cannot be empty"
}
OR
{
  "message": "Target Weight cannot be empty"
}
OR
{
  "message": "password must be 5 or greater"
}
OR
{
  "message": "Email Already Exists"
}
```

&nbsp;

## 2. POST /users/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImdlbmRlciI6Im1hbGUiLCJ1c2VybmFtZSI6ImFrdW5maXgydXBkYXRlMiIsImVtYWlsIjoiYWt1bmZpeDJ1cGRhdGUyQG1haWwuY29tIiwid2VpZ2h0IjoiNjAiLCJoZWlnaHQiOiIxNzAiLCJleHRyYSI6ImRpYWJldGVzIiwiY2Fsb3JpZUxpbWl0IjoxNTM4LCJ0YXJnZXRXZWlnaHQiOiI3MCIsImFjdGl2aXR5TGV2ZWwiOiIxIiwiZGF0ZUJpcnRoIjoiMTk5Ny0wMS0yNiIsImlhdCI6MTcwMDI3OTUyNX0.wm8B0nnYwohrG6Bxk-n8vC4fA_ITGRiz7bTidjjfs7E"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "error invalid username or email or password"
}
```

&nbsp;

## 3. PUT /users/:id

Description:

- Update user by access token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
	"username":"akunfix2update2",
	"gender":"male",
	"email":"akunfix2update2@mail.com", 
	"password":"akunfix2update2", 
	"weight":"60", 
	"height":"170",
	"dateBirth":"1997-01-26",
	"activityLevel":"1",
	"extra":"diabetes",
	"targetWeight":"70"
}
```

_Response (200 - OK)_

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImdlbmRlciI6Im1hbGUiLCJ1c2VybmFtZSI6ImFrdW5maXgydXBkYXRlMiIsImVtYWlsIjoiYWt1bmZpeDJ1cGRhdGUyQG1haWwuY29tIiwid2VpZ2h0IjoiNjAiLCJoZWlnaHQiOiIxNzAiLCJleHRyYSI6ImRpYWJldGVzIiwiY2Fsb3JpZUxpbWl0IjoxNTM4LCJ0YXJnZXRXZWlnaHQiOiI3MCIsImFjdGl2aXR5TGV2ZWwiOiIxIiwiZGF0ZUJpcnRoIjoiMTk5Ny0wMS0yNiIsImlhdCI6MTcwMDI3OTUyNX0.wm8B0nnYwohrG6Bxk-n8vC4fA_ITGRiz7bTidjjfs7E"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data with id 1100 not found"
}
```

&nbsp;

## 4. GET /achievements

Description:

- Get Achievements user by access token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
	{
		"id": 1,
		"idUser": 15,
		"idAchievement": 7,
		"createdAt": "2023-11-17T10:21:01.462Z",
		"updatedAt": "2023-11-17T10:21:01.462Z",
		"Achievement": {
			"id": 7,
			"date": null,
			"weightBefore": 60,
			"currentWeight": 100,
			"createdAt": "2023-11-17T10:21:00.144Z",
			"updatedAt": "2023-11-17T10:21:00.144Z"
		}
	},
	{
		"id": 2,
		"idUser": 15,
		"idAchievement": 8,
		"createdAt": "2023-11-17T10:22:15.534Z",
		"updatedAt": "2023-11-17T10:22:15.534Z",
		"Achievement": {
			"id": 8,
			"date": null,
			"weightBefore": 60,
			"currentWeight": 90,
			"createdAt": "2023-11-17T10:22:14.241Z",
			"updatedAt": "2023-11-17T10:22:14.241Z"
		}
	},
...
]
```

_Response (404 - Not Found)_

```json
{
  "message": "data with id 1100 not found"
}
```

&nbsp;

## 5. POST /achievements

Description:

- Post achievement by access token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
	"currentWeight":"90"	
}
```

_Response (200 - OK)_

```json
{
	"message": "Berhasil Menambahkan Achievement"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data with id 1100 not found"
}
```

&nbsp;

## 6. GET /foods

Description:

- Get all food from database

Request:


_Response (200 - OK)_

```json
[
	{
		"id": 1,
		"name": "Nasi Padang",
		"calorie": 300,
	},
	
  ...,
]
```

&nbsp;

### 7. GET /openai/menu 

## Description

- Create Menu With Ai Based On User Calory Limit And Extra Restriction


## Request

- Headers 
````json
{
    "access_token": "string"
}
````

## Response

_200 - Ok
````json
{
    "breakfast": "string",
    "breakfastCalorie": "integer",
    "lunch": "string",
    "lunchCalorie": "integer",
    "dinner": "string",
    "dinnerCalorie": "integer",
    "snack": "string",
    "snackCalorie": "integer",
    "message": "string"
}
````
&nbsp;

## Menu

## 8. GET /menus/:historyId

### Description

- Get Menus Based On Today And On User Login

## Request

- Params
````json
{
    "historyId": "integer"
}
````
- Headers 
````json
{
    "access_token": "string"
}
````

## Response

_200 - Ok

````json
{
    "id": "integer",
    "historyId": "integer",
    "breakfast": "string",
    "breakfastCalorie": "integer",
    "breakfastEaten": "boolean",
    "lunch": "string",
    "lunchCalorie": "integer",
    "lunchEaten": "boolean",
    "dinner": "string",
    "dinnerCalorie": "integer",
    "dinnerEaten": "boolean",
    "snack": "string",
    "snackCalorie": "integer",
    "snackEaten": "boolean"
}
````

_404 - Not Found
````json
{
    "message": "Menu Recommendation Is Empty Try Create One"
}
````
&nbsp;

## 9. POST /menus/:historyId

### Description

- Create Menu Today On User Based On Ai

### Request

- Params
````json
{
    "historyId": "integer"
}
````
- Headers 
````json
{
    "access_token": "string"
}
````
- Body
````json
{
    "breakfast": "string",
    "breakfastCalorie": "integer",
    "lunch": "string",
    "lunchCalorie": "integer",
    "dinner": "string",
    "dinnerCalorie": "integer",
    "snack": "string",
    "snackCalorie": "integer",
}
````

### Response

_201 - Created_ 
````json 
{
    "id": "integer",
    "historyId": "integer",
    "breakfast": "string",
    "breakfastCalorie": "integer",
    "breakfastEaten": "boolean",
    "lunch": "string",
    "lunchCalorie": "integer",
    "lunchEaten": "boolean",
    "dinner": "string",
    "dinnerCalorie": "integer",
    "dinnerEaten": "boolean",
    "snack": "string",
    "snackCalorie": "integer",
    "snackEaten": "boolean"
}
````
&nbsp;

## 10. PATCH /menus/:historyId

### Description

- Change food eaten from false to true and add calorie gain on history


## Request 
- Params
````json
{
    "historyId": "integer"
}
````
- Headers 
````json
{
    "access_token": "string"
}
````
- Body
````json
{
    "eaten": "string|breakfast|lunch|dinner|snack",
    "calorie": "integer"
}
````
## Response
_201 - Ok_
````json
{
    "message": "Food has been inputed" 
}
````
&nbsp;

## History

## 11. GET /histories/now

### Description

- Get The User Today History

### Request

- Headers 
````json
{
    "access_token": "string"
}
````

### Response

_200 - OK_
````json
{
    "id": 1,
    "day": "date",
    "calorieLimit": "integer",
    "calorieGain": "integer",
    "isOver": "boolean",
    "userId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Food": [
        {
            "id": "integer",
            "name": "string",
            "calorie": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        },
        {
            ...
        }    
    ],
    "Menu": {
        "id": "integer",
        "historyId": "integer",
        "breakfast": "string",
        "breakfastCalorie": "integer",
        "breakfastEaten": "boolean",
        "lunch": "string",
        "lunchCalorie": "integer",
        "lunchEaten": "boolean",
        "dinner": "string",
        "dinnerCalorie": "integer",
        "dinnerEaten": "boolean",
        "snack": "string",
        "snackCalorie": "integer",
        "snackEaten": "boolean",
        "createdAt": "2023-11-18T10:30:38.900Z",
        "updatedAt": "2023-11-18T10:37:44.900Z"
    }
}
````
&nbsp;
## Food
## 12. GET /foods

### Description

- Get All Food On Server And Filter It

### Request

- Headers 
````json
{
    "access_token": "string"
}
````
- Query
````json
{
    "filter": "string"
}
````

### Response

_200 - Ok_

````json
{
    [
        {
            "id": "integer",
            "name": "string",
            "calorie": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        },
        {
            ...
        }
    ]
}
````

&nbsp;

## 13. POST /foods/:historyId

## Description

- Input Food To Eaten Food And Ask It Calorie To Ai If It Didnt Exist In Food Server Then Add Calorie Gain In History

## Request

- Headers 
````json
{
    "access_token": "string"
}
````

- Body
````json
{
    "food": "string"
}
````

## Response

_201 - Created_
````json
{
    "message": "Food has been inputed"
}
````

_400 - Bad Request_
````json
{
    "message": "string"
}
````

&nbsp;
## Fitnes

## 14. GET /fitnes/bmi

## Description

- Get BMI Based on API And Data From Login User

## Request

- Headers 
````json 
{
    "access_token": "string"
}
````

## Response

_200 - Ok_
````json
{
    "bmiMax": "integer",
    "bmiMin": "integer",
    "bmi": "integer",
    "health": "string"
}
````

&nbsp;
## 15. GET /users/:id

Description:

- Get user by access token

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
	"id": "integer",
	"username": "string",
	"gender": "string",
	"email": "string",
	"weight": "integer",
	"height": "integer",
	"dateBirth": "date",
	"activityLevel": "integer",
	"targetWeight": "integer",
	"extra": "string",
	"calorieLimit": "integer",
	"createdAt": "date",
	"updatedAt": "date"
}
```

&nbsp;
## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
