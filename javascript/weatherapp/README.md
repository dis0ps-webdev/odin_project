# Weather App 

## Promises
* a then() method is needed, and can be used like an eventlistener
* to use promises effectively, the app must be designed with concurrency in mind

## async / await
* https://medium.com/front-end-weekly/modern-javascript-and-asynchronous-programming-generators-yield-vs-async-await-550275cbe433
* similar to python's yield, which is a generator
  * generators in python return a lazy iterator
  * the lazy iterator encapsulate the function and restores the stack each iteration
  * javascript uses the same principal to allow for sequential execution while not blocking
* always returns a promise
* exceptions may not propagate, so they should be caught closest to the start of async code (try/catch) 


## geocoding * most browsers can provide lat/lon * getting metadata from lat/lon requires another service
* openweathermap provides basic geocoding from name to lat/lon
* capture metdata and lat lon together to enrich the weather data API return set

## building interfaces for API data

* APIs are interchangeable
* more robust
* massage data into the appropriate format for the application and place in a container object
* container objects can be used like components, providing a representation that can be more easily rendered
* use the source json to create an interface for just the data you need, many APIs provide a lot of data that may not be needed

## improving local pubsub functionality

* don't rely on call stack and push to the event queue by using settimeout 