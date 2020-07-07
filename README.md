# Wallpaper-APp
This is a Wallpaper App developed using React Js and nodejs . Redux and React-Redux is used for state management.

To start the nodejs rest api on your system , type following by opening terminal from node-rest-shop folder :
1) npm install   
2) npm start

Nodejs APi has following routes : 
1) http://localhost:4000/users/login/   ..POST
    body : {
              "email: " " ,
              "password": " "
           }   

2) http://localhost:4000/users/signup/    ..POST
    body : {
              "first_name": " ",
              "last_name": " ",
              "phone" : " ",
              "email" : " ",
              "password" : " "
            }
            profileImage is optional
  
3) http://localhost:4000/users/:userId    ...DELETE

4) http://localhost:4000/images/       ...GET

To start the react js front end , type following commands from terminal opened from react-frontend folder
1) npm install
2) npm start

