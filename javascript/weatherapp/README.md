# Weather App 

## Promises and async/await

* *must* be in a function as execution needs to be paused to allow others to run
* wrapping async functions in classes can be tricky
* a final then() is most likely needed, and can be used like an eventlistener
* to use promises effectively, the app must be designed with concurrency in mind

## geocoding

* most browsers can provide lat/lon
* getting metadata from lat/lon requires another service
* openweathermap provides basic geocoding from name to lat/lon
* capture metdata and lat lon together to enrich the weather data API return set

## building interfaces for API data

* APIs are interchangeable
* more robust
* massage data into the appropriate format for the application and place in a container object
* container objects can be used like components, providing a representation that can be more easily rendered

## improving local pubsub functionality

* don't rely on call stack and push to the event queue by using settimeout 