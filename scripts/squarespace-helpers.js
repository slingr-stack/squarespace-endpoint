
var analyzeParams = function (args) {
    var paramsSize = 0;
    var params = [];
    var argumentsObj = null;
    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] != 'object') {
            paramsSize++;
            params.push(args[i]);
        } else {
            argumentsObj = args[i];
        }
    }
    return {
        paramsSize: paramsSize,
        argumentsObj: argumentsObj,
        params: params
    };
};

var replaceUrl = function(url, params) {
    if (!url) {
        return null;
    }
    if (params.length > 0) {
        var i = 0;
        url = url.replace(/:(\w+)/g, function () {
            return params[i++];
        });
    }
    return url;
};

var addArgumentsToUrl = function(url, args) {
    if(args) {
        var tmp = Object.keys(args).map(function (k) {
            return encodeURIComponent(k) + '=' + args[k];
        }).join('&');

        if (url.split("\?").length > 1) {
            url += '&' + tmp;
        } else {
            url += '?' + tmp;
        }
    }
    return url;
};

// GET https://api.squarespace.com/1.0/commerce/inventory?cursor={c}
// GET https://api.squarespace.com/1.0/commerce/inventory/{variantId1},{variantId2}...
endpoint.commerce = {};
endpoint.commerce.inventory = {};
endpoint.commerce.inventory.get = function() {

    var url = '/commerce/inventory';
    var params = analyzeParams(arguments);

    if(params.paramsSize > 0) {
        url = replaceUrl('/commerce/inventory/:variantIds', params.params)
    }

    url = addArgumentsToUrl(url, params.argumentsObj)

    return endpoint.get(url);

};

// POST https://api.squarespace.com/1.0/commerce/inventory/adjustments
//     - Idempotency-Key additional header
endpoint.commerce.inventory.adjustments = {};
endpoint.commerce.inventory.adjustments.post = function() {

    var url = '/commerce/inventory/adjustments';
    var params = analyzeParams(arguments);
    var idempotencyKey = null;

    if(params.paramsSize > 0) {
        idempotencyKey = params.params[0];

        params.argumentsObj = params.argumentsObj || {};
        params.argumentsObj.idempotencyKey = idempotencyKey;

        var options = checkHttpOptions(url, params.argumentsObj);

        return endpoint._postWithHeader(options);
    }

    return endpoint.post(url, params.argumentsObj);
};

// GET https://api.squarespace.com/1.0/commerce/orders?modifiedAfter={a}&modifiedBefore={b}&cursor={c}&fulfillmentStatus={d}
// GET https://api.squarespace.com/1.0/commerce/orders/{orderId}
endpoint.commerce.orders = {};
endpoint.commerce.orders.get = function() {

    var url = '/commerce/orders';
    var params = analyzeParams(arguments);

    if(params.paramsSize > 0) {
        url = replaceUrl('/commerce/orders/:orderId', params.params)
    }

    url = addArgumentsToUrl(url, params.argumentsObj)

    return endpoint.get(url);
};

// POST https://api.squarespace.com/1.0/commerce/orders/{orderId}/fulfillments
endpoint.commerce.orders.fulfillments = {};
endpoint.commerce.orders.fulfillments.post = function() {

    var url = '/commerce/orders/:orderId/fulfillments';
    var params = analyzeParams(arguments);

    if(params.paramsSize > 0) {
        url = replaceUrl(url, params.params);
    }

    return endpoint.post(url, params.argumentsObj);
};


// GET https://api.squarespace.com/1.0/commerce/transactions?modifiedAfter={a}&modifiedBefore={b}&cursor={c}
// GET https://api.squarespace.com/1.0/commerce/transactions/{documentId1},{documentId2}...
endpoint.commerce.transactions = {};
endpoint.commerce.transactions.get = function() {

    var url = '/commerce/transactions';
    var params = analyzeParams(arguments);

    if(params.paramsSize > 0) {
        url = replaceUrl('/commerce/transactions/:documentIds', params.params)
    }

    url = addArgumentsToUrl(url, params.argumentsObj)

    return endpoint.get(url);
};

endpoint.idempotencyKey = function() {
    return endpoint._idempotencyKey();
}