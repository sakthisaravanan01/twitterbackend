import express  from "express";
//importing express 
import userroutes from './Routes/userroutes';
import tweet from './Routes/tweet';
import Tokens from './Routes/Tokens';
import { authtoken } from "./middlewares/authmiddleware";
const app=express();
//app uses express
app.use(express.json());
app.use('/user',userroutes)
app.use('/tweet',tweet)
app.use('/token',Tokens)

//what ever we sent it will take it as json
app.get('/',(request,respond)=>{
    respond.send('hello sakthi updated')
})



app.listen(3000,()=>{
    console.log("server is ready sakthi")
})
//https://www.geeksforgeeks.org/node-js-vs-express-js/

//https://api.example.com/products?category=electronics
//upto product it is api edpoint and after that it is query params
// An API endpoint is a specific URL that a client can use to interact with an API. It is a specific location that represents a resource or an action that a client can access or perform. An API endpoint typically includes a domain, a path, and can include additional parameters to specify the action or resource being requested.

// On the other hand, query parameters are a way to pass data to an API endpoint. They are additional parameters that are appended to the URL of an API endpoint. Query parameters can be used to filter, sort, or paginate data, or to provide additional information about the request being made.

// For example, consider an API endpoint for retrieving a list of products:

// https://api.example.com/products
// To retrieve only products with a certain category, you could add a query parameter to filter the results:

// https://api.example.com/products?category=electronics
// In this case, "category" is the query parameter, and "electronics" is the value being passed for that parameter.

// So while query parameters are used to pass data to an API endpoint, they are not the same thing as the endpoint itself.






