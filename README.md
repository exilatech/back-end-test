# back-end-test

### Technologies
##### Node.js
##### MongoDB


### Starting with project:

1. Checkout the project

2. Navigate to the containing folder 

3. Type "npm start" . It will start the the server at http://localhost:3005/

Note: it is assumend that the user has already started the mongoDB on the system.

### Web Api list:

#### Add Beer [POST]:
 http://localhost:3005/beer/add
 
{"name":String,
"type":String,
"rating":Number
}

#### Update Rating [POST]:
  http://localhost:3005/beer/updateRating
  
  {
  "id":String,
  "rating":Number
  }


#### Get Beer by search string [GET]:
  http://localhost:3005/beer/getBeers?search=<String>


Note: It will return all the records if the url does not contains the 'search' parameter 
