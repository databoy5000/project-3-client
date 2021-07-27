# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #3: Memory.map

by [Antoinette Demonceaux](https://github.com/Ant0inette), [Kat Hackethal](https://github.com/khackethal/) and [Anthony Graham](https://github.com/databoy5000/).

Memory.map is a platform to connect with places and cities, through people.

![Homepage](https://imgur.com/82RCNk9.png)

Share memories on a map-based platform, track down urban legends, ancestry & much more.

## Live Demo, Useful Links

[<img alt="Live Demo" src="https://imgur.com/P2NkQ7Q.png" height="35px">](https://memory-map.netlify.app)
[<img alt="Follow databoy5000" src="https://imgur.com/QCKp4U4.png" height="35px">](https://github.com/login?return_to=%2Fdataboy5000)
[<img alt="Client Repository" src="https://imgur.com/XyaL8Dg.png" height="35px">](https://github.com/databoy5000/project-3-client)
[<img alt="Server Repository" src="https://imgur.com/rod7TG4.png" height="35px">](https://github.com/databoy5000/project-3-server)

## Contents

* [Live Demo, Useful Links](#live-demo--useful-links)
* [Contents](#contents)
* [Brief](#brief)
* [Approach](#approach)
* [Technologies Used](#technologies-used)
  + [<ins>Back-end</ins>](#-ins-back-end--ins-)
    - [Additional technologies:](#additional-technologies-)
  + [<ins>Front-end</ins>](#-ins-front-end--ins-)
    - [Additional technologies:](#additional-technologies--1)
* [Wireframes](#wireframes)
* [Responsibilities](#responsibilities)
  + [<ins>Back-end</ins>](#-ins-back-end--ins--1)
    - [1. Memory controller](#1-memory-controller)
    - [2. Error handling](#2-error-handling)
    - [3. Memory model update](#3-memory-model-update)
    - [4. Comment controller](#4-comment-controller)
    - [5. User controller update](#5-user-controller-update)
  + [<ins>Front-end</ins>](#-ins-front-end--ins--1)
    - [Register page](#register-page)
    - [Login page](#login-page)
    - [NewMemory page](#newmemory-page)
    - [Mapbox](#mapbox)
    - [Single Memory Page](#single-memory-page)
      * [Map display](#map-display)
      * [Viewport Boundary Box or Zoom](#viewport-boundary-box-or-zoom)
      * [Comments](#comments)
    - [SecureRoute](#secureroute)
    - [Error](#error)
    - [EditMemory page](#editmemory-page)
* [Thoughts on additional features](#thoughts-on-additional-features)
* [Observations & Key Learnings](#observations---key-learnings)
  + [Human](#human)
  + [Technical](#technical)
* [Conclusions](#conclusions)

## Brief

* **Build a full-stack application** by making your back-end and your front-end.
* **Use an Express API** to serve your data from a Mongo database.
* **Consume your API with a separate front-end** built with React.
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut.
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.

## Approach

To guarantee continuity during the project build, we established the following elements:
* To assure communications on a messaging/video-conferencing app where we could write, talk, exchange resources and share screens.
* [Project Management Sheet](https://docs.google.com/spreadsheets/d/17YFoGBlmBzowzMGTn-n-OWcBpImDZlBbY4UEJlJJn4I/view): to document the project scope and all specifications to the app into a single shared space.

(Sample of the main specifications tab)
<img src="https://imgur.com/dLKrUWe.png" alt="App Specifications" width="700">

Then, we defined the following milestones:

1. Define general app specifications, its models and descending API endpoints.
2. Construct wireframes.
3. Build cycle:
    - Task planning/coordinating as a team,
    - Code,
    - Test,
    - Troubleshoot & fix errors,
    - Push working feature to GitHub.
4. Style completed components/pages.
5. Final tests to validate app flow and design finishing.
6. Backend & Frontend deployment.

During the <ins>build cycle</ins>, we worked our way linearly from the back-end to the front-end, clearly defining tasks (one or multiple complete features per task) between team members to work through them separately to have minimum overlap, avoiding merge conflicts and/or work being done twice.

## Technologies Used

### <ins>Back-end</ins>

<img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
<img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node-dot-js&logoColor=white"/>
<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>

#### Additional technologies:

* NoSQL database
* bcrypt

### <ins>Front-end</ins>

<img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/><br>
<img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/><br>
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>

#### Additional technologies:

* SASS
* Bulma
* Axios
* Cloudinary
* React MapGL
* React MapGL Geocoder
* Moment

## Wireframes

<img alt="Homepage" src ="https://imgur.com/H2rAzZe.png"/>
<img alt="Memories Index" src ="https://imgur.com/q9BeLzT.png"/>
<img alt="Single Memory" src ="https://imgur.com/0Gs4gL5.png"/>
<img alt="Register page" src ="https://imgur.com/A5rnI3U.png"/>
<img alt="Login page" src ="https://imgur.com/yIaOFcj.png"/>

## Responsibilities

### <ins>Back-end</ins>

#### 1. Memory controller
As a general pattern, all CRUD operations are completed in a try/catch block to assure that errors are fed back to the client. Whether a request was completed or not, the client is always fed back with a [response status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). When an error is caught, `next(err)` is used to execute the next middleware function `errorHandler()` in `errorHandler.js`. `if` conditionals are occasionally used within the `try` block to throw specific errors (e.g. when a memory id cannot be found in the collection). Each time that a new operator is built, its respective route is sensibly added to `router.js`.

When querying a specific single element of a collection (e.g. such as a memory or a comment):

* The element's ID is included in the route such as a parameter, to then be used to query the database collection to fetch that element. e.g. To fetch a single memory, `:memoryId` is passed into `router.route('/memories/:memoryId')`. Then, it's collected in the controller as `const id = req.params.memoryId` to pass the `id` variable into `const memory = await Memory.findById(id)`

A quick breakdown of the request operations' differences:

* <ins>Read</ins><br>
There are two controllers: one to query <ins>all memories</ins> in the `memorydb` collection (using the `.find()` method), the other to query <ins>a single specific memory</ins> (using the `findById(id)` method).

* <ins>Create</ins><br>
To create a memory, we need to make sure that it is created when a user is logged into the app. We can do this with `secureRoute.js` which collects the token from the request header, verifies that the user is allowed to perform such operation and injects the following property into the request:

```js
  req.currentUser = {
    userId: payload.userId,
    username: user.username,
  }
```

Then, the user's information is collected and moved into the request body (`req.body.user = req.currentUser`) with all other form properties, fulfilling the requirements of the `Memory` model.

* <ins>Delete</ins><br>
It has a very similar structure to getting a single memory, but with the added `deleteOne()` method to execute the deletion.

* <ins>Update</ins><br>
Same as getting/deleting a single memory but uses the `.updateOne(req.body)` method and return the updated memory into the response.

#### 2. Error handling
The error handling application-level middleware allows us to build custom errors which can be handy when returning form validation error messages.
The first step is adding the middleware `app.use(errorHandler)` into `app.js`, at the last app middleware to make sure that it executes after the router. Then, in an errors library `errors.js` we extend from the Error class to create the custom error's name:

```js
  export class NotValid extends Error {
    constructor() {
      super()
      this.name = 'NotValid'
    }
  }
```

Finally, to configure the `errorHandler()` function (inside `errorHandler.js`), we have to identify each error with their respective class name to return the status and custom error response object:

```js
  if (err.name === 'NotValid') {
    return res.status(400).json({
      errName: err.name,
      errMessage: {
        email: 'Invalid credentials supplied.',
        password: 'Invalid credentials supplied.',
      },
    })
  }
```

To follow the example above, here's how an error is thrown in `userController.js`:

```js
  if (!user) {
    throw new NotValid
  }
```

#### 3. Memory model update
At the time of our first Memory model draft, we weren't yet aware of how to interact with Mapbox's [Geocoder](https://www.npmjs.com/package/react-map-gl-geocoder), and what location information we wanted to retrieve from it. Therefore, the model had to be updated when a successful response was received at front-end level tests, and the documentation understood.

The Geocoder returns detailed information on a successful search of a map location. We conviened that we wanted to keep multiple properties of this search result which would be nested as an object inside of a main property called `location` (for organisational purposes, but also, because we hadn't done it before, we weren't we wanted to try what we didn't know).

Here's an extract of the `location` property from the memory's model:

```js
  location: {
    userInput: { type: String, required: true },
    coordinates: {
      type: [Number],
      required: true,
      validate: [{
        validator: (coordinates) => coordinates.length === 2,
        message: (coordinates) => `Requirement array.length === 2. Current length is ${coordinates.length}`,
      }],
    },
    boundaryBox: { type: [Number] },
    placeType: { type: String },
  },
```

  * `userInput`: Text that was inputted by the user in the Geocoder's search bar.
  * `coordinates`: Latitude and longitude coordinates. The validation requires that if the array length isn't equal to 2, then the coordinates are not valid.
  * `boundaryBox`: Should've been called `boundingBox`. The array (format: [minX, minY, maxX, maxY]) represents the coordinates of a bounding box to the which the viewport is set to display.
  * `placeType`: Options are `country`, `region`, `postcode`, `district`, `place`, `locality`, `neighborhood`, `address`, and `poi`. These are used in case the Geocoder does not return bounding box coordinates to set the viewport at the correct zoom. Depending on the type, the zoom is set abritrarily with conditionals, using the front-end function `subSetViewport(memoryObject)` at './lib/mapbox.js'. [More details here.](#viewport-boundary-box-or-zoom)

#### 4. Comment controller
The comments are embedded into their respective memories. Therefore, the actions we can perform on comments are to create and remove. We thought updating a comment didn't have much value to the MVP since it was simply text that could be deleted and re-created if a mistake was done at the moment of creation. Also, it didn't have much sense to have the ability to modify days later since it could lose context to the thread.

* <ins>Create</ins><br>
The patterns follow the same as the `create()` function in `memoryController.js`, with the difference that new comments are pushed to the comment's array, such as `memory.comments.push(req.body)`.

* <ins>Delete</ins><br>
Here, there are multiple params included in the route:

```js
  router.route('/memories/:memoryId/comment/:commentId')
```

On a single line, both params are deconstructed `const { memoryId, commentId } = req.params`. Then for readbility, the current user ID & comment user ID are collected in variables as such:

```js
  const currentUserId = req.currentUser.userId
  const commentUserId = comment.user.userId
```

That way, we can make a check with a conditional statement (`if (!commentUserId.equals(currentUserId))`) to only allow the current user to delete its comments.

#### 5. User controller update
Although the `User` model has its own validator to only register unique usernames and emails, at the time, I struggled to fetch the error thrown by the back-end validator. In hindsight, I should've used `err.errors.username.properties.message` and `err.errors.email.properties.message`. What I ended up doing, since we already had a `NotUnique` error, I checked if a user was in the database using the `.findOne()` method, combined with the `$or` operator, as such:

```js
  const userFound = await User.findOne(
    { $or:
      [
        { username: req.body.username },
        { email: req.body.email }
      ]
    }
  )

  if (userFound) {
    throw new NotUnique
  }
```

What I also added, is to generate a token at registration (the same way as when logging in) to elevate the user's experience by getting them to use the app directly when registration is completed. Here's how it's done. using the `jwt.sign()` method:

```js
  const token = jwt.sign(
    { userId: newUser._id },
    secret,
    { expiresIn: '12h' }
  )
```

Then, the token is added into the response object to be collected for login, at the front-end level.

### <ins>Front-end</ins>

#### Register page

* <ins>`useForm.js` hook</ins><br>
Using the `useForm.js` hook to handle the form changes and errors, I set the request object as such to match the page input fields:

```js
  const { formData, handleChange, formError, setFormError } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
```

* <ins>Form errors handling</ins><br>
Generally, I chose to use follow the following pattern on inputs:
  1. `onChange={handleChange}`: the event handler coming from the `useForm.js` hook updates the form values.
  2. `handleSubmit`: returns any errors into the formError coming from the back-end, to be displayed under their respective fields, and highlighting the respective input boxes in glowing red.
  3. `onBlur={eventHandler}`: where eventHandler can be either of the callbacks `handleUnique` or `handlePassMatch` which to removes formError property values (therefore removing error messages and input box highlights) given that the correct conditions are met when the user clicks away from the input.

* <ins>`handleUnique()`</ins><br>
To improve the user experience by making a quicker, smoother registration. It makes a call to the back-end when the user clicks away (`onBlur`) from the input fields, to instantly check without submission that either the username or email inputs are not already existing in the database, therefore being unique. In the case that they are not unique, an error message is returned `onBlur`.

`userCheck()` makes a back-end check through a custom route (which I configured), to invalidate a username/email that already exists in the database.

* <ins>`handleValidity()`</ins><br>
This event handler is only used for the email input type. Using the attribute `onInvalid`, when `onInvalid` is true, the formError.email is set with a custom message letting the user know that the email is invalid.

The alternative would've been to use a regex validation at the back-end level, but as I lack practice/experience with regex, it was quicker and I was more comfortable using `onInvalid`.

* <ins>`handlePassMatch()`</ins><br>
Simply checks that passwords match and returns an error when passwords don't match, when the user clicks away, given that both fields (password and passwordConfirmation) are not blank.

The alternative would've been to set errors on submission, but it seemed to make it a quicker and better user experience to set the error message before submission.

* <ins>`handleSubmit()`</ins><br>
The back-end call is made into a try/catch block. When a call returns a successful response, the token is collected and set into localStorage with the `setToken` function imported from the `auth.js` library. That way, the user gets logged as soon as the registration has occurred, avoiding it to re-enter its credentials onto the login page.

Finally, `const history = useHistory()` is used to navigate the user to the `’/memories’` page on successful form submission. Because `history` is the instance of an array where the last index represents the current that the user’s browser has loaded, pushing `’/memories’` to the array will redirect the user to the memories page.

#### Login page
The login page uses a similar pattern as the registration page. However, it is much simpler as it only handles a single message '*Invalid credentials supplied.*' on submission.

There is also a conditional that influences the `Navbar.js`'s display on user login: when a user is logged, `const isLogged = isAuthenticated()` variable returns a boolean because of the function `isAuthenticated()` called from the library `auth.js` (it checks that there is a payload, then that the payload hasn't expired). So if the user is logged, the *Register*/*Login* buttons disappear, and the *New Memory*/*Logout* buttons show up instead.

#### NewMemory page
Its structure contains many similarities with the registration page (form hook & submission, and validation errors). Here are the differences:

* <ins>handleNestedChanges()</ins><br>
First, let's take a look at the `useForm.js` hook's `handleChange` which is in charge of updating the form object:

```js
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
```

Currently, `handleChange()` is designed to access an element's <ins>event</ins> properties (`e.target.name` and `e.target.value`). So, to match this pattern, we re-created a structure using the following state update:

```js
  handleChange(
    {
      target:
      {
        name: 'location',
        value: {
          userInput: e.place_name,
          coordinates: e.center,
          boundaryBox: getBoundaryBox(e),
          placeType: e.place_type[0],
        },
      },
    }
  )
```

* <ins>handleTags()</ins><br>
Tags are typed onto the same single imput, so they need to be formatted so that punctuation and special characters are removed, each keywork is separated into its own string and split into the form's `tags` property array. This is done reformatting tags with `const newTags = formatTagArray(e.target.value)`:

```js
  function formatTagArray(tags) {
    if (typeof tags === 'string') {
      const tagsArray = tags.replace(/[^a-zA-Z0-9]/g, ' ').split(' ')
      const sanitisedTagsArray = tagsArray.filter(tag => tag !== '')
      return sanitisedTagsArray
    }
    return tags
  }
```

We had to make use of the regular expressions `/[^a-zA-Z0-9]/g` which was found through an internet search. As far as I get it, it only keeps lower and capitalised alphanumerical values. Anything else is replaced with spaces, then split into an array every new space. Finally, the remaining empty strings are filtered out. What is left of `newTags` is updated into the formData's `tags` property as an array.

* <ins>Cloudinary</ins><br>
Cloudinary is a SaaS offering cloud-based image and video management services. In our case, we use it to upload memory images on new memory forms, with the provided hook `ImageUploadField.js` which also contains URLs to keep safe in our environment variable's document `.env`. There's also a custom preset to create on cloudinary.com, which will process all images with the configured settings.

#### Mapbox
To increase components readability and add challenges, we decided to have the location search input (the map search) of the `NewMemory.js` page as a separate component `MapboxSearch.js`.

With this exercise, what I learned was to implement Mapbox’s `ReactMapGl` and `Geocoder` components combined, how to go through their documentation and how to pass props from a child to parent component.

Let's take a closer look at `ReactMapGl`'s properties:

  + `ref={mapRef}`: a reference is created such as `const mapRef = React.useRef()` and assigned to the ref attribute of both `ReactMapGl` and `Geocoder`. I'm yet unsure how this part works, but without this set, the component will break. It seems we need to set focus on both the components when they mount to access DOM elements.
  + `{...viewport}`: spreads the viewport's initial state information such as its size, where it is centred and its zoom.
  + `mapboxApiAccessToken={publicToken}`: `publicToken` is a variable set in the custom environment's variables `.env` document. It acts as a login credential linked to my Mapbox account to allow the use of their products.
  + `onViewportChange={handleViewportChange}`: event handler allowing to update the viewport when the user interacts with it (e.g. zoom, changing position).
  + `onError={handleError}`: executed when an error occurs with `ReactMapGl`.
  + `onLoading={handleLoading}`: executed when `ReactMapGl` is looking up a query.
  + `onInit={handleLoaded}`: executed after `ReactMapGl` is initialized.

With `Geocoder`, all attributes above work the same, but there is one additional attribute which is <ins>**key to the entire component**</ins>: `onResult={handleResult}`. The API's search result is collected within `handleResult` and passed to the prop `onResult`, then goes up to its parent component `NewMemory.js` where result data is distributed to the correct nested form properties, controlled by the event handler `handleNestedChange`.

#### Single Memory Page
Most of the component's structure was drafted by [Kat Hackethal](https://github.com/khackethal/). However, I collaborated on the following elements...

##### Map display
We thought it would offer a better user experience to make the map's width responsive, proportionally to the browser's window size.

Initially, when the component mounts, the map's width is set to `const defaultViewportWidth = ((window.innerWidth * 65 ) / 100)`. Then, an event listener such as `window.addEventListener('resize', handleResize)` is set into the useEffect hook to execute `handleResize`, which sets the viewport to its new width, like so:

```js
  function handleResize() {
    const newWidth = ((window.innerWidth * 65 ) / 100)
    setViewport({ ...viewport, width: newWidth })
  }
```

##### Viewport Boundary Box or Zoom
Unfortunately, the `MapboxSearch.js`'s result does not always return the boundary box property (correctly called 'bounding box', but I made a naming mistake) as it is an optional parameter.
In `mapbox.js` library, there is a function `subSetViewport(memoryObject)` which allows the viewport to display the memory's `location` depending if it contains a `boundaryBox` property or not:

  1. When `boundaryBox` values are available (best outcome), mapbox's `WebMercatorViewport` class takes map camera states (latitude, longitude, zoom, pitch, bearing etc.), and performs projections between world and screen coordinates. We retrieve the latitude, longitude and zoom values to set the viewport accoringly.
  2. When no `boundaryBox` values are available (more of an arbitrary outcome), we looked at [zoom values](https://wiki.openstreetmap.org/wiki/Zoom_levels) to manually set the viewport's zoom, on conditionals, depending on the placeType:

```js
  if (placeType === 'country') zoom = 6
  if (placeType === 'region') zoom = 7
  if (placeType === 'postcode') zoom = 8
  // etc...
```

##### Comments
To display each available comment from the memory's comments array, the memory comments are mapped as such `{memory.comments && memory.comments.map(comment => {...})}`.

Only the comment's owner is allowed to delete its own comments. Therefore the function `isOwner(userId)` is called from the `auth.js` library to match the userId in localStorage with the comment's userId set to the button's ID, like so:

```js
  {isOwner(comment.user.userId) &&
    <button
      id={comment._id}
      onClick={handleDelete}
      className="button is-info is-small is-outline"
    >
      Delete comment
    </button>
  }
```

The comment form uses the `useForm.js` hook, like all other forms on the app are. `handleSubmit` is the event handler managing comment posts. Here's a breakdown of what it does:
  + `await createComment(formData, memoryId)`: function called from `api.js`. It executes the POST operation.
  + `e.target.value = ''`: resets the comment's form's text typed by the user on the page.
  + `setHasComments(!hasComments)`: sets a boolan state to `hasComments` which acts as a toggle. It's used in the `useEffect(() => {},[hasComments])` dependancy array to fetch the page's memory data once again and display it with the new comment. An alternative would've been to remove `e.preventDefault()` and let the page reload after each submission, but it sounded a sleeker experience to not do this.
  + Finally, forms are reset at this point.

#### SecureRoute
In `App.js`, SecureRoute works roughly like an extension to the `<Route path="" component={} />` element. First, it makes a conditional check that the user hasn't a valid token in localStorage. When it is the case, the user is redirected to the login page with `<Redirect to="/login"/>`. Else, `<Route {...rest} component={Component} />` is returned, directing the user to the desired component.

#### Error
In `App.js`, `<Route path="/*" component={Error} />` is the last component route added to the router. The wildcard path `/*` means that any paths after the backslash e.g. https://memory-map.netlify.app/ will route to the `Error.js` component. However, because all other component routes in the `<Switch>` are placed before it, the user will only be directed to `Error` when the path is anything but the above routes.

#### EditMemory page
This component is roughly a copy of the `NewMemory.js` component, with the difference that all input values are prefilled e.g. `defaultValue={formData.title}`, and a few tweaks were undergone on form validation requirements, messages and highlights.

## Thoughts on additional features
Having user profile pages would've been a great feature to have, similarly to social media applications. That way users can follow each other's profiles to get updates on memories and perhaps bonus perks.

Additional nice-to-haves would've been:
+ Infinite scroll on the memories index page.
+ Random Memory shuffle page.
+ Count of how many users have seen a single memory.
+ Keyword search in the navigation bar.
+ Turn tags into Hashtags and have a dedicated page to sort memories by Hashtags.

## Observations & Key Learnings

### Human
We hadn't even started the project and teams weren't yet picked, and the first element that came to my attention in this project was "How are we going to manage this project as a team, making it beneficial to all members, where all are treated equally and without instructors designating a leader?".

Without a framework to guide us through the project, things could easily go in many directions. So I prepared a [Project Management Sheet](https://docs.google.com/spreadsheets/d/17YFoGBlmBzowzMGTn-n-OWcBpImDZlBbY4UEJlJJn4I/view) which I thought would be a good start for all of us to interact and set the project boundaries, as a team.

Another challenge is communication, more specifically interpersonal language. We might interpret fairly similar and reasonable thoughts but in different ways which might not be understood in the manner they were originally intended to. To me the best way is to sit back and listen, to get everyone to share their thoughts equally, accept other member's ideas, make compromises, but also to present and have my ideas observed and to argue all ideas constructively.

The project held its weight, and I believe that everyone had a voice and its share of work and authenticity on this project, which made it a successful exercise. There were misunderstandings and disagreements (which I embrace), but they were far from taking the project off the tracks.

### Technical
Starting a project with a language or a framework with which you've had little practice is always a challenge. Walking in a dark room with no echo. I set the challenge for myself to write my work without copying the code from our class. There wasn't much that I could do without looking at resources, especially at the start, but as I wrote more and understood patterns, my brain would retain information and building/debugging code made more and more sense to work through. It developed some creativity to solve encountered problems.

At the start, I got stuck on form validation errors. There are many ways that you can output these. What seemed to work as a general pattern for all forms, is to highlight with messages and colours the invalidated fields once that the user has attempted a submission (as opposed to doing anything before submission, because it creates a lot of confusion and does not add that much more value). Then, using the `onBlur` attribute to remove error messages and highlights from the form.
 
Additionally to the previous point, I questioned the value-to-user vs. potential security issue with indicating owned usernames and emails during the registration process ([see here](#register-page)). My conclusion is that it could potentially pose a threat to users, to indicated hackers which usernames are being used on the platform.

I also realised that adding routes to the back-end is something I found myself doing occasionally, although still working through the MVP. Experience will help to see the bigger picture, to have greater accuracy in planning and efficiency in building.

Although we had set a 'Naming Conventions' tab on our [Project Management Sheet](https://docs.google.com/spreadsheets/d/17YFoGBlmBzowzMGTn-n-OWcBpImDZlBbY4UEJlJJn4I/view), conventions were omitted (Disclaimer: I'm mentioning this for the sole purpose of offering a constructive observation). I don't believe that it matters too much on a project of this scale, but I can foresee how it could turn into a cluster of problems and reduce readability, on a larger scale commercial project where many developers contribute to building a product or service. I firmly believe that diligence is key, but it's also ok to be forgiving (I may have even made some of these mistakes myself).

Nested form values provided satisfaction to keeping data organised. It was a great exercise and I'm glad that we've done it as we now have more complex examples of how to build these. However, my conclusion is that it did not provide much value to the user. On commercial projects, I will tend to keep things simple, unless otherwise advised.

## Conclusions
For me, this project was an immense learning curve, to put in practice concepts that sounded abstract and seeing them become more tangible. I'm grateful for the problems I encountered (also for creating some of them), trying to build and optimise features that we hadn't practised yet in class. It tested my patience and my thinking, which is the outcome I was hoping to take away from this course. It has brought a good deal of positive elements to my mindset.
 
From a human perspective, working on TV productions has taught me to work in teams. However, I'm not talking about it as an acquired skill (if it was the case, we'd all get along seamlessly like in a utopic simulation) and surely there are differences in working on software with other and larger teams. I look forward to seeing more of them.