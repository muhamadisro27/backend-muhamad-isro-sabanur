# Product API Spec

## List Product API

Endpoint : GET /api/products

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "name": "Product 1",
      "price": 1500000,
      "quantity": 5
    },
    {
      "id": 2,
      "name": "Product 2",
      "price": 2500000,
      "quantity": 1
    },
  ]
}
```

Response Body Error :

```json
{
  "errors": "Product is not found"
}
```
