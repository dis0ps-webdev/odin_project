# Can-Do Kanban

This exercise in the Odin Project may be an example of over-engineering, but demonstrates some key areas of modern web development.  It was important to me to get a feel for what a cleanly designed framework would require before using a major framework like Angular or React.   

Site: https://dis0ps-webdev.github.io/can-do-kanban/

Webpack Template: https://github.com/dis0ps-webdev/webpack-template

## UX Design

### Look and Feel

For this project, I started by looking into design tools and how I could envision the final product in a way that helped with the implementation.  I stumbled upon a great video tutorial series by [Gary Simon](https://www.youtube.com/watch?v=4G9c5swUyOc) on Youtube that utilized [Adobe XD](https://www.adobe.com/products/xd.html).  

There are a few other interface design tools, and each has its own pros and cons.  Utilizing Abode XD I was able to put together a design and flow that matched the exercise specifications and my own tastes.

I aimed for a mobile-first design, considering most people access sites on phones these days.  I also wanted the interface buttons to be close to the outer edges for easier use with the phone being used in one hand.  The final design doc was then used to create a working mock up.  

Download Adobe XD at the link above to give it a try:  [Adobe XD Source File](mockup/adobe_xd/cando-kanban-mobile.xd)

### Mockup and Chop Up

One common factor with UX design tools is that none of them do conversion to proper HTML and CSS cleanly.  Coding is still a human-driven art form, and as such manual intervention is needed to take the code spit out by Adobe XD and get working code to be used in our project.

Many assets are exportable from Adobe XD, including SVG icons which makes transfer to a mockup pretty easy.  Adobe XD does like to use pathing to draw boxes and borders as opposed to div tags or other more responsive constructs.  Taking the main layout and converting to clean flexbox with divs was done using a single CSS file organized in a loose hierarchy to be cut up with Sass later.

With the final conversion to [mockup](mockup/index.html) complete, it's time to get ready for Typescript!

## TypesScript

I decided to step up the object-oriented design by utilizing TypeScript within the Webpack template used in the restaurant exercise.  A template repo was created as a starting point for future projects, and incorporating TypeScript was easy through Babel, but including additional typing for components such as localized CSS and Sass were a little more tricky.  

The trickiness may be due to [configuring](tsconfig.json) TypeScript to be strict, which forces definitions of everything.  While this can be annoying, it makes sharing and building code over time much more manageable.  I did cheat a bit and loosen variable initialization, which seemed overkill when populating object members outside the constructor.

The moral of the story is that no two Webpack configurations are the same, and everyone does it a bit differently.  If you find a configuration that works, stick with it!

## Component-based Architecture

I iterated on the component-based architecture of the restaurant page.  While reimplementing basic components was a good learning exercise, it was also tedious.  Without utilizing a known framework like React, it just didn't make sense to get that granular.  

Main areas of the page were broken out, such as footer, header, and the various views that would reside in the middle of the page.  Each was encapsulated within objects using TypeScript's private and protected keywords to augment ES6's classes.  

A [Component Prototype](src/components/Prototype/Component.ts) was used to abstract away all common methods and data handling and focus on building out the states and behaviors needed by each component of my design.

One nice organizational byproduct of this approach is the ability to summary export.  Dot notation within object-oriented programming is nice at keeping things concise while providing context.  By creating a  [summary export](src/components/Components.ts) that essentially re-exports a subdirectory of objects we can attain that same dot notation using an 'as' at import time.

This rollup of objects, along with local CSS using MiniCssExtractPlugin for WebPack provides enough enapsulation to work on individual areas of the project without affecting anything else around it.  This level of decoupling is nice when working in larger development groups.

## PubSub Architecture

Decoupling is also a major part of object-oriented design.  When deciding how to wire the components together the idea of using a publish-subscribe (PubSub) model came to mind.  PubSub is often used on bigger projects and microservice architectures, as the decoupling leads to less downtime and better fault tolerance.

Our project is nowhere near that complexity, but using PubSub offers a glimpse into how to handle messaging and keep things nice and tidy.

The first step was to enumerate our messages to ensure we don't introduce typos or other issues.  Using our Adobe XD design flow, we can envision what events will need to be handled.  An initial set was added to a config object, and added to as the project progressed.

The final set of events:
[Enumerated Event Messages](src/app/config/AppConfig.ts)

Now that we have events, they will have to be passed around somehow.  In earlier projects, creating callbacks directly between objects was fine, but that creates a direct coupling.  In full-scale applications, the backend will handle messaging through services like RabbitMQ, Amazon SQS, or others.  For our purposes, we will have to forgive some direct coupling to have a common line for all our objects to talk through.

To that end, a [PubSub](src/app/pubsub/PubSub.ts) object was created that gets passed to all components at instantiation time.  The individual components react to messages recieved through the PubSub object, and can also publish events through the same common object.

This makes another tenet of object-oriented programming easier, namely single responsibility.  In this project's case, we have both a [Controller](./src/app/controller/Controller.ts) and a [PageRouter](src/app/router/PageRouter.ts) object.  Each is responsible for affecting the data model and loading of pages respectively, and only interact through the messaging bus provided by the PubSub object.

## Testing

### Display Testing

Even in today's web ecosystem, testing against multiple browsers is important.  Standards compliance is pretty good (except for older Microsoft browsers), but responsiveness testing against multiple screen sizes is always needed.  

Luckily, most of the major browsers include the ability to change to major screen sizes and device types.  Safari in particular has specific Apple devices types to test, and Firefox or Chrome both allow for testing various device sizes as well.

### PubSub Debugging

Messaging can get tricky in a PubSub architecture, but luckily having a single point by which all events pass makes it easier to see what is going on.  A debug flag is available in the [AppConfig](src/app/config/AppConfig.ts) object, providing the ability to dump messages to console.  


## Potential Improvements

In the interest of sanity, I chose to stop development once the core functionality was there.  There is plenty more that could be done with this project. 

* More input validation - not letting input break layout is key, and some additional checking would help prevent those problems

* allow all three states to be shown on desktop version of page - designing for mobile first is almost designing two sites.  A Kanban board should have all states visibile with a bigger screen size
  
* allow the deletion or clearing of the default project - right now a manual localStorage.clear() is needed to get rid of todos in the default view.  This would require some additional logic on the deletion option in settings