# Structure of the Application 

![alt text](https://github.com/rymX/client/blob/develope/public/assets/img/structure.png?raw=true)


### `Client Side` 

i am using the package create-react-app to create a react application ,
I have the App component , wchich is the root component of the application , Nested inside it i have login component and the signup component, 
When the user logged in a dashboard component will be loaded , Nested on it a ProductContainer and it will be responsible for listing out all the products properties allow us to delete and edit product , the same thing with WishhlistContainer.
For state managing i am not using any syteme for state managing , because , in my opinion it will be a quite a bit more work for small state , i am using the concept of render prop to passing data between components.

i use the framework  Bootstrap and Bootstrap grid  to help me to create responsive web applications
 and responsive mobile-first grid system that uses containers,

I Use AntDesign which is  UI framework for react and an open source tools  as they give me pre-build components that are efficient, responsive, and customizable.



### `Server Side` 

I build a REST API with Node.js and Express. [server](https://github.com/rymX/server)
I choose express as it is a frame work  allow us to easily manage resquest and  responses server side , and it saves our time and allow us to write clean code. and for routing i use  Express Router.

for Authorization I use jwt and express session  to make sure that the user who send the request to the server is actually the same user who logged in , and to protect our Routes.

i use the open-source document database MONGODB  to go further and faster when developing applications that have to handle data of all sorts in a scalable way.

