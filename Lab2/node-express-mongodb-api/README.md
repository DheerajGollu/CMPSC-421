# Order System API

## Overview
The Order System API is a RESTful service built with Node.js, Express.js, and MongoDB. It allows users to manage:
- Customers (Create, Retrieve, Update, Delete)
- Items (Create, Retrieve, Update, Delete)
- Orders (Create, Process, Cancel, Retrieve, Delete)

This API follows RESTful principles and includes Swagger documentation.

### Access Swagger API Documentation
Once the server is running, visit:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Customers
| Method | Endpoint        | Description               |
|--------|-----------------|---------------------------|
| GET    | /customers      | Get all customers         |
| POST   | /customers      | Create a new customer     |
| PATCH  | /customers/{id} | Update a customer         |
| DELETE | /customers/{id} | Delete a customer         |

### Items
| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| GET    | /items         | Get all items           |
| POST   | /items         | Create a new item       |
| PATCH  | /items/{id}    | Update an item          |
| DELETE | /items/{id}    | Delete an item          |

### Orders
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | /orders              | Get all orders             |
| POST   | /orders              | Create a new order         |
| PUT    | /orders/{id}/process | Process an order           |
| PUT    | /orders/{id}/cancel  | Cancel an order            |
| DELETE | /orders/{id}         | Delete an order            |


## MongoDB Schemas

### Item Schema
```js

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "No description" } 
});

```
#### Example
```
{
  "id": "987654",
  "name": "Laptop",
  "price": 1200,
  "description": "High-end gaming laptop"
}
```


### Customer Schema
```js

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  addressType: { type: String, required: true }
}, { timestamps: true });

```

#### Example
```
{
  "id": "123456",
  "firstName": "John",
  "lastName": "Doe",
  "userName": "johndoe",
  "password": "securepassword",
  "address": "123 Main St",
  "addressType": "Home"
}
```


### Order Schema
```js

const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  items: [{ itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, name: String, quantity: Number }],
  status: { type: String, enum: ["Pending", "Cancelled", "Completed"], default: "Pending" },
  totalPrice: { type: Number }
}, { timestamps: true });

```

#### Example
```
{
  "id": "987654321",
  "customer_id": "123456",
  "items": [
    {
      "item_id": "324253",
      "name": "Laptop",
      "quantity": 2
    }
  ],
  "totalPrice": 2400
}
```


## Testing with Postman
To test the API using Postman:
1. Open Postman and create a new collection.
2. Add requests for each endpoint listed above.
3. Set Content-Type of body to `json` when sending POST/PATCH requests.
4. Run tests and verify responses.

## Error Handling
| Status Code | Description |
|-------------|------------|
| 200 OK | Successful request |
| 201 Created | Resource successfully created |
| 400 Bad Request | Invalid input data |
| 404 Not Found | Resource not found |
| 500 Internal Server Error | Server error |

## Project Structure
```
/order-system-api
│-- /models
│   ├── customer.js
│   ├── item.js
│   ├── order.js
│-- /routes
│   ├── customers.js
│   ├── items.js
│   ├── orders.js
│-- /controllers
│-- /middlewares
│-- index.js
│-- swagger.js
│-- package.json
│-- README.md
```

## Built With
- Node.js - Backend runtime
- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - ODM for MongoDB
- Swagger - API Documentation
- Postman - API Testing
   ```

