# Weather App 

Site: https://dis0ps-webdev.github.io/weatherapp

Webpack Template: https://github.com/dis0ps-webdev/webpack-template

This exercise in the Odin Project highlights the usage of API calls and asynchronous activity within modern web applications.  The previous era of web applications relied more on content provided server-side.  In modern web applications, API calls (most via the REST protocol) bring backend data into the dynamic nature of the client side code.


Because of this dynamic nature, those API calls cannot block rendering and user interaction.  Previously, AJAX was all the rage and the `XMLHTTPRequest` function was king.  The problem with XHR is the possibility of 'callback hell' as functionality had to be daisy chained resulting in a muddled mess.  

With the release of ES2015 Javascript gained the concept of promises, allowing for cleaner asynchrous code.

## Promises

Promises are a construct that represent the eventual completion of a asynchronous function.  That function will return a promise object that can either resolve or be rejected at a later time.  This prevents blocking when calling potentially long running or expensive calls (e.g. network-based activity).

To use promises effectively, the design of the application must taken concurrency into consideration.
Coding for asynchronous activity can be difficult, as synchronous code is more imperative and following logic flow is easier.

While promises helped clean up asynchronous code, they also can be a bit cumbersome to read and write.  
The contributors to ES2017 understood this, and introduced the concepts of `async` and `await` to function calls.

## async / await

`async` and `await` provide a way to defer execution of a function until a promise is resolved or rejected.  With this capability, a function's call stack is saved and execution is returned to the code calling the function that paused.  Once the promise completes, execution returns to the 'paused' function and resumes where it left off.

Functions marked as `async` always return a promise, which can be acted on directly, or deferred again using `await`.

Generators are another feature of ES2015 that use this concept.  If you have function that iterates over a set and you need to return each set item, the `yield` keyword can be used instead of `return`.  In this case, the same 'pause' ability is used to freeze the stack and come back to it later.

The result of both generators and async/await is more linear code, which leads to more readability and comprehension. 

The [WeatherService](src/app/services/WeatherService.ts) object makes extensive use of promises and async/await to encapsulate all external API calls into a single point.

Sergio Valverde wrote a [great article](https://medium.com/front-end-weekly/modern-javascript-and-asynchronous-programming-generators-yield-vs-async-await-550275cbe433) detailing the similarities between generators and async/await.

## Handling API Data

API data varies from service to service, and require some thought around what data is needed for a particular application.

This project uses Typescript, which allows for the creation of [interfaces](src/app/models/DailyForecastData.ts) describing the shape of the data we need.

This has a few of benefits:

* Documents the data fields needed for the operation of the application
* Container objects can be created that implement the interface and maintain type safety
* If we change APIs, we can easily map the new data into the interface
  
Overall, third-party API data should not be taken at face value, and should be translated into a format needed by the application being developed.

## PubSub Improvements

The enlightening [video](https://www.youtube.com/watch?v=8aGhZQkoFbQ) from Phillip Roberts provided by the Odin Project shed some light on the the issues of blocking within a client-side Javascript application.

The original PubSub implementation that was used in the 'Can-Do Kanban' project did not take into account blocking, and used a subscribe function that placed a direct function call into an array.

To improve upon this, a `setTimeout` was used to wrap each subscribed function call to ensure they would be placed in the event queue as opposed to being directly called.  

By making this change, the new [PubSub](src/app/service/../services/PubSub.ts) implementation provides better protection against missing subscribed function calls and ensures that all actions are taken when a message is received.

## Potential Improvements

* Add pulser between API calls to signal activity
* Expand on data displayed from the weather API by expanding the interface and component objects
* Add conditional images for different weather mapped to the API weather descriptions


