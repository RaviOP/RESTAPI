## RESTAPI made using Node/Express/MongoDB

Example:  https://ravi-internship-api.herokuapp.com/

## To Run Locally

1. Clone Repo
2. npm install
3. Add MONGODB_URL in config/.env file
4. Add JWT_SECRET in config/.env file
5. Download Api.postman_collection.json file and import it in your POSTMAN APPLICATION

## Endpoints

1. **CREATE/SIGNUP(Method -> POST) USERS --> /users** </br>
Format --> JSON
Body: {</br>
    'name' : '',</br>
    'email' : '',</br>
    'dateOfBirth' : 'DD/MM/YYYY',</br>
    'phone': 0000000000,</br>
    'password': ''</br>
}</br>
Example: https://ravi-internship-api.herokuapp.com/users   --> Add Body

1. **READ USER(Method -> GET) --> /users/me** 

Example: https://ravi-internship-api.herokuapp.com/users/me

3. **UPDATE USER(Method -> PATCH) --> /users/me**
Format --> JSON

Body: {
    'name of field': 'value of field'
}

Example: https://ravi-internship-api.herokuapp.com/users/me --> Add Body

4. **DELETE USER(Method -> DELETE) --> /users/me**

Example: https://ravi-internship-api.herokuapp.com/users/me

5. **LOGIN USER(Method -> POST) --> /users/login**
Format --> JSON

Body: {
    'email': '',
    'password': ''
}

Example: https://ravi-internship-api.herokuapp.com/users/login  --> Add Body

6. **LOGOUT USER FROM CURRENT DEVICE(Method --> POST) --> /users/logout**
   
Example: https://ravi-internship-api.herokuapp.com/users/logout

7. **LOGOUT USER FROM ALL DEVICES(Method --> POST) --> /users/logoutAll**
   
Example: https://ravi-internship-api.herokuapp.com/users/logoutAll