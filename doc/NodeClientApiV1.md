# Client API (version 1) <br/> Facets Microservices Client SDK for Node.js

Node.js client API for Facets microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [FacetV1 class](#class1)
* [IFacetsClientV1 interface](#interface)
    - [getFacetsByGroup()](#operation1)
    - [addFacet()](#operation2)
    - [removeFacet()](#operation3)
    - [deleteFacetByGroup()](#operation4)
    - [clear()](#operation5)
* [FacetsHttpClientV1 class](#client_http)
* [FacetsSenecaClientV1 class](#client_seneca)
* [FacetsDirectClientV1 class](#client_direct)
* [FacetsNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-facets-node": "^1.0.*",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-facets-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.FacetsHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
    
    // Record facets
    client.addFacet(
        null,
        'statistics',
        '12234',
        function (err, facets) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Facet usage history is');
            console.log(facets);
            
            // Read facets usage history
            client.getFacetsByGroup(
                null,
                'statistics',
                function (err, facets) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('facets usage history is');
                    console.log(facets);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

### <a name="class1"></a> FacetV1 class

Registers number of facet instances

**Properties:**
- group: string - group that represents particular service and search field in the service
- name: string - facet name
- count: number - number of registered instances of the facet

## <a name="interface"></a> IFacetsClientV1 interface

If you are using Typescript, you can use IFacetsClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IFacetsClient. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IFacetsClientV1 {
    getFacetsByGroup(correlationId, group, paging, callback);
    addFacet(correlationId, group, callback);
    removeFacet(correlationId, group, callback);
    deleteFacetsByGroup(correlationId, group, callback);
    clear(correlationId, callback);
}
```

### <a name="operation1"></a> getFacetsByGroup(correlationId, group, paging, callback)

Retrieves facets for specified froup

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- group: string - facet group name
- paging: PagingParams - paging parameters
- callback: (err, result) => void - callback function
  - err: Error - occured error or null for success
  - result: DataPage<FacetV1> - page with recorded facets

### <a name="operation2"></a> addFacets(correlationId, group, callback)

Add facet by incrementing facet counter

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- group: string - group name
- name: string - facet name
- callback: (err, result) => void - callback function
  - err: Error - occured error or null for success
  - result: FacetV1 - object with recorded facets

### <a name="operation3"></a> removeFacets(correlationId, group, callback)

Remove facet by decrementing facet counter

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- group: string - group name
- name: string - facet name
- callback: (err, result) => void - callback function
  - err: Error - occured error or null for success
  - result: FacetV1 - object with recorded facets

### <a name="operation4"></a> deleteFacetsByGroup(correlationId, group, callback)

Delete recorded facets for specified group

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- group: string - group name
- callback: (err, result) => void - callback function
  - err: Error - occured error or null for success

### <a name="operation5"></a> clear(correlationId, callback)

Delete all recorded facets

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- callback: (err, result) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_rest"></a> FacetsHttpClientV1 class

FacetsHttpClientV1 is a client that implements HTTP protocol

```javascript
class FacetsHttpClientV1 extends CommandableHttpClient implements IFacetsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getFacetsByGroup(correlationId, group, paging, callback);
    addFacet(correlationId, group, callback);
    removeFacet(correlationId, group, callback);
    deleteFacetsByGroup(correlationId, group, callback);
    clear(correlationId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> FacetsSenecaClientV1 class

FacetsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class FacetsSenecaClientV1 extends CommandableSenecaClient implements IFacetsClientV1 {
    constructor(config?: any);        
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getFacetsByGroup(correlationId, group, paging, callback);
    addFacet(correlationId, group, callback);
    removeFacet(correlationId, group, callback);
    deleteFacetsByGroup(correlationId, group, callback);
    clear(correlationId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - protocol: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> FacetsDirectClientV1 class

FacetsDirectClientV1 is a client that calls controller from the same container.
It is intended to be used in monolythic deployments

```javascript
class FacetsDirectClientV1 extends DirectClient implements IFacetsClientV1 {
    constructor(config?: any);        
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getFacetsByGroup(correlationId, group, paging, callback);
    addFacet(correlationId, group, callback);
    removeFacet(correlationId, group, callback);
    deleteFacetsByGroup(correlationId, group, callback);
    clear(correlationId, callback);
}
```

## <a name="client_null"></a> FacetsNullClientV1 class

FacetsNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class FacetsNullClientV1 implements IFacetsClientV1 {
    constructor();
    getFacetsByGroup(correlationId, group, paging, callback);
    addFacet(correlationId, group, callback);
    removeFacet(correlationId, group, callback);
    deleteFacetsByGroup(correlationId, group, callback);
    clear(correlationId, callback);
}
```
