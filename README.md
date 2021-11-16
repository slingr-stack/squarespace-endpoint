---
title: Squarespace endpoint
keywords: 
last_updated: June 02, 2020
tags: []
summary: "Detailed description of the API of the Squarespace endpoint."
---

## Overview

With Squarespace Commerce APIs, you can build applications that manage data from your Squarespace store. 
HTTP endpoints are provided which allow you to:

- Retrieve orders
- Update orders with fulfillment information
- Retrieve product variant stock levels
- Update stock levels using incremental and decremental adjustments
- Set finite stock levels for product variants
- Mark product variants as having unlimited stock


Before integrating Squarespace endpoint, you’ll need to generate an API Key as describe
[Generating an API Key](https://developers.squarespace.com/commerce-apis/making-requests).

In most cases you will be using the provided shortcuts to access the API. For example, you could use the REST API
directly by doing an HTTP request like this:

```js
var res = app.endpoints.squarespace.get('/commerce/inventory');
```

However you probably want to use the shortcuts:

```js
var res = app.endpoints.proxy.commerce.inventory.get(); 
```

These shortcuts are based on the [Squarespace REST API](https://developers.squarespace.com/commerce-apis/what-can-i-do).
You can see more information about that in the [shortcuts section](#shortcuts).

## Configuration

You can create a new key using these steps, after logging into your Squarespace site:

1. In the Home Menu, click Settings, and then click Advanced.
2. Click Developer API Keys.
3. Click Generate Key.

Check [Generating an API Key](https://developers.squarespace.com/commerce-apis/making-requests) for more information. 

### Token

Access token. Use it to make API requests.

## Javascript API

Use shortcuts or directly the API request.

```js
var res = app.endpoints.squarespace.get('/commerce/inventory');
```

- **HTTP request**: this allows to make regular HTTP requests like `GET` and `POST` to the API.
- **Shortcuts**: these are helpers to make HTTP request to the API in a more convenient way. Sign request automatically.

### HTTP requests

You can make `GET` and `POST` request to the 
[Squarespace API](https://developers.squarespace.com/commerce-apis/what-can-i-do) like this:

Please take a look at the documentation of the [HTTP endpoint]({{site.baseurl}}/endpoints_http.html#javascript-api)
for more information.

### Shortcuts

Instead of having to use the generic HTTP methods, you can make use of the shortcuts provided in the endpoint.

These shortcuts follow these rules:

- **Path sections get converted to namespaces**: for example if the method is GET `~/commerce/inventory` 
  it is converted to `app.endpoints.squarespace.commerce.inventory.get()`. As you can see the version is removed. 
- **HTTP method is appended at the end of the method**: for example if the method is `GET`, you will see a method with 
  the suffix `.get(...)`. For example `GET ~/commerce/orders/{orderId}` will become `app.endpoints.squarespace.commerce.orders.get(orderId)`. 
  This is the mapping of names:
  - `GET`: `get`
  - `POST`: `post`
- **Path variables become method parameters**: if the method has variables in the path, they will become parameters for 
  the method.
- **Query parameters are sent in the last param as JSON**: if the method accepts more parameters or it allows to send a query parameters, 
   that will be sent in the last parameter in case of GET. In case to method POST it is going to be before the body. 
   For example the method  `POST ~/commerce/orders/{orderId}/fulfillments`  will become 
   `app.endpoints.squarespace.commerce.orders.fulfillments.put(orderId, {...params to send...})`
- **Body are sent in the last param as JSON**: if the method accepts more parameters or it allows to send a body, 
   that will be sent in the last parameter. 
- **Idempotency-Key in inventory adjustments**: it should be send as first parameter in order to attach in headers. By
example `app.endpoints.squarespace.commerce.inventory.adjustments.post(key, {...params to send...});`. Also there are a
helper to generate Idempotency-Key  `app.endpoints.squarespace.idempotencyKey()`
- **Multiple documents**: when need send multiples parameters as describe API `https://api.squarespace.com/1.0/commerce/inventory/{variantId1},{variantId2}...`
you should send as string with comma separation `app.endpoints.squarespace.commerce.transactions.get("{variantId1},{variantId2}");`
  
Here are some URLs of the REST API and their corresponding shortcut:

```js
var res = app.endpoints.squarespace.get('/commerce/inventory');
var res = app.endpoints.squarespace.commerce.inventory.get({cursor: 'a637d2e4f3c5437fb384b9de5930d705'});
var res = app.endpoints.squarespace.commerce.inventory.get();
var inventoryIds = "xxx,yyyy";
var res = app.endpoints.squarespace.commerce.inventory.get(inventoryIds);
var key = app.endpoints.squarespace.idempotencyKey();
var res = app.endpoints.squarespace.commerce.inventory.get(variantId);
var res = app.endpoints.squarespace.commerce.inventory.adjustments.post(key, {...});
var res = app.endpoints.squarespace.commerce.orders.get();
var res = app.endpoints.squarespace.commerce.orders.get(orderId);
var res = app.endpoints.squarespace.commerce.orders.fulfillments.post(orderId, {...});

var res = app.endpoints.squarespace.commerce.transactions.get();
var res = app.endpoints.squarespace.commerce.transactions.get(transactionId);
```

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.

