# Related Products Service
This component renders the images for the products with zoom functionality

## Getting Started
```sh
npm install
```

## Running the tests

```sh
npm run test
```

## Running server and client locally

```sh
npm start
npm run build
```

## CRUD Operations
| HTTP Verb |           Endpoint                  |            Action            |
|-----------| ------------------------------------| ---------------------------- |
| **POST**  |       /api/related_products/:id     |  CREATE a new item into DB   |
| **GET**   |       /api/addProduct/              |  READ data and return data   |
| **PATCH** |       /api/updateProduct/           |  UPDATE item with new image  |
| **DELETE**|       /api/deleteProduct/           |  DELETE item based on ID     |
