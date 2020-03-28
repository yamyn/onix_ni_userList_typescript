# yamyn-onix-ni-lesson-3

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Authentication

### sign up in system and get tokens

```
curl --location --request POST 'localhost:3030/v1/auth/signup' \
 --header 'Content-Type: application/json' \
 --data-raw '{ "nickName": "test", "email": "test@gmail.com", "password": "pas12345" }'

```

### login in system and get tokens

```
curl --location --request POST 'localhost:3030/v1/auth/login' \
 --header 'Content-Type: application/json' \
 --data-raw '{ "email": "test@gmail.com", "password": "pas12345" }'

```

### get tokens with old refresh

```
curl --location --request GET 'localhost:3030/v1/auth/refreshup' \
 --header ''refresh-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNTc1OTd9.MTSIibdOXOZ3oTHuuI6TZzb06nnI6GD6kZppxl9Ade4'' \

```

## Userlist API

### Find all users

```
   curl --location --request GET 'localhost:3030/v1/users' \
    --header ''x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNTc1OTd9.MTSIibdOXOZ3oTHuuI6TZzb06nnI6GD6kZppxl9Ade4'' \

```

### Find user by ID

```
   curl --location --request GET 'localhost:3030/v1/users/5e50265429fbb59255fb8428' \
    --header ''x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNTc1OTd9.MTSIibdOXOZ3oTHuuI6TZzb06nnI6GD6kZppxl9Ade4'' \

```

### Get users`s statistic

```
   curl --location --request GET 'localhost:3030/v1/users/statistic' \
    --header ''x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNTc1OTd9.MTSIibdOXOZ3oTHuuI6TZzb06nnI6GD6kZppxl9Ade4'' \

```

### Create User

```
curl --location --request POST 'localhost:3030/v1/users' \
 --header ''x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNTc1OTd9.MTSIibdOXOZ3oTHuuI6TZzb06nnI6GD6kZppxl9Ade4'' \
 --header 'Content-Type: application/json' \
 --data-raw '{ "email": "test@gmail.com", "fullNzame": "Wow Yay" }'

```

### Update User

```
curl --location --request PUT 'localhost:3030/v1/users' \
 --header ''x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNTc1OTd9.MTSIibdOXOZ3oTHuuI6TZzb06nnI6GD6kZppxl9Ade4'' \
 --header 'Content-Type: application/json' \
 --data-raw '{ "id": "5e50265429fbb59255fb8428", "fullName": "Yay Foo" }'

```

### Delete User

```
curl --location --request DELETE 'localhost:3000/v1/users' \
 --header ''x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNTc1OTd9.MTSIibdOXOZ3oTHuuI6TZzb06nnI6GD6kZppxl9Ade4'' \
 --header 'Content-Type: application/json' \
 --data-raw '{ "id": "5e502541bb617386c48f6a8c" }'

```

## Testing

### integration testing with mocha

```
'npm test'

```
