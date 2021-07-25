# Project 3: Memory.map
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

- [Contents](#contents)
- [Brief](#brief)
- [Approach](#approach)
- [Technologies Used](#technologies-used)
- [Wireframe](#wireframe)
- [Responsibilities](#responsibilities)
- [Key Learnings](#key-learnings)
- [Achievements](#achievements)
- [Challenges](#challenges)
- [Conclusions](#conclusions)

## Brief

* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
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
3. Build cycle
    - Task planning/coordinating as a team
    - Code
    - Test
    - Troubleshoot & fix errors
    - Push working feature to GitHub
4. Syle completed components/pages
5. Final tests to validate app flow and design finishing
6. Backend & Frontend deployment

During the <ins>build cycle</ins>, we worked our way linearly from the back-end to the front-end, clearly defining tasks (one or multiple complete features per task) between team members to work through them separately in order to have minimum overlap, avoiding merge conflicts and/or work being done twice.

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
Following the CRUD pattern, I started working my way through building the memoryController.js in the following order: read (all memories, then single memory), create, delete and update.

As a general pattern, all operations are completed in a try/catch block to assure that errors are fed back to the client. Whether a request was succesfully completed or not, the client is always fed back with a [response status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). When an error is caught, `next(err)` is used to execute the next middleware function `errorHandler()` in `errorHandler.js`. Also, `if` conditionals can be used in the `try` block to throw specific errors (e.g. when a memory id cannot be found in the collection).

Each time that a new operator is built, its respective route is sensibly added to `router.js`. When querying a specific single element of a collection (e.g. such as a memory or a comment):
* the element's ID is included in the route such as a parameter, to then be used in order to query the database collection to fetch that element. e.g. To fetch a single memory, `:memoryId` is passed into `router.route('/memories/:memoryId')`. Then, it's collected in the controller as `const id = req.params.memoryId` to pass the `id` variable into `const memory = await Memory.findById(id)`

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

Then, the user's information is collected and moved into the request body (`req.body.user = req.currentUser`) with all other form properties, fullfilling the requirements of the `Memory` model.

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

At last, to configure the errorHandler function (inside `errorHandler.js`), we have to identify each error with their respective name to return the status and custom error response object:
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

The Geocoder returns detailed information on a successful search of a map location. As a team, we conviened that we wanted to keep multiple properties of this search result which would be nested as an object inside of a main property called `location` (for organisational purposes, but also, because we hadn't done it before, we weren't we wanted to try what we didn't know). Here's an extract of the `location` property's object:
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

* `userInput`: text that was inputted by the user in the Geocoder's searchbar.
* `coordinates`: latitude and longidtude coordinates. The validation requires that if the array length isn't equal to 2, then the coordinates are not valid.
* `boundaryBox`: should've been called `boundingBox`. The array (format: [minX, minY, maxX, maxY]) represents the coordinates of a bounding box to the which the viewport is set to display.
* `placeType`: Options are `country`, `region`, `postcode`, `district`, `place`, `locality`, `neighborhood`, `address`, and `poi`. These are used in case the Geocoder does not return bounding box coordinates to set the viewport at the correct zoom. Depending on the type, the zoom is set abritrarily with conditionals, using the front-end function `subSetViewport(memoryObject)` at './lib/mapbox.js'.

#### 4. Comment controller
The comments are embedded into their respective memories. Therefore, the actions we can perform on comments are to create and remove. We though updating a comment didn't have much value to the MVP since it was simply text that could be deleted and re-created if a mistake was done at the moment of creation. Also, it didn't have much sense to have the ability to modify days later since it could loose sense to follow a thread out of context.

* <ins>Create</ins><br>
The patterns follows the same as the `create()` function in `memoryController.js`, with the difference that new comments are pushed to the comment's array, such as `memory.comments.push(req.body)`.

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
That way, we can make a check with a conditional statement (`if (!commentUserId.equals(currentUserId))`) to only allow the current user to delete its own comments.

#### 5. User controller update
Although the `User` model has its own validator to only register unique usernames and emails, at the time, I struggled to fetch the error thrown by the back-end validator. In hindsight, I should've used `err.errors.username.properties.message` and `err.errors.email.properties.message`. What I ended up doing, since we already had a `NotUnique` error, I checked if a user was in the database using the `.findOne()` method, combined with the `$or` operator, as such:
```js
  const userFound = await User.findOne(
    { $or: [
      { username: req.body.username },
      { email: req.body.email }
    ] } )

  if (userFound) {
  throw new NotUnique
  }
```

What I also added, is to generate a token at registration (the same way as when logging in) to elevate the user's experience by getting them to use the app directly when registeration is completed. Here's how it's done. using the `jwt.sign()` method:
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
  3. `onBlur={eventHandler}`: where eventHandler can be either of the callbacks `handleUnique` or `handlePassMatch` which to removes formError property values (therefore reemoving error messages and input box highlights) given that the correct conditions are met when the user clickes away from the input.

* <ins>`handleUnique()`</ins><br>
The idea behind this event handler is to improve the user experience by making a quicker, smoother registration.

It makes a call to the back-end when the user clicks away from the input fields, to instantly check without submission that either the username or email inputs are not already existing in the database, therefore being unique. In the case that they are not unique, an error message is returned `onBlur`.

`userCheck()` makes a back-end check through a custom route (which I configured), just for the purpose of invalidating if a username/email already exists in the database.

* <ins>`handleValidity()`</ins><br>
This event handler is only used for the email input type. Using the attribute `onInvalid`, when `onInvalid` is true, the formError.email is set with a custom message letting the user know that the email is invalid.

The alternative would've been to use a regex validation at back-end level, but as I lack of practice/experience with regex, it was quicker and I was more comfortable using `onInvalid`.

* <ins>`handlePassMatch()`</ins><br>
Simply checks that passwords match and returns an error when passwords don't match, when the user clicks away, given that both fields (password and passwordConfirmation) are not blank.

The alternative would've been to set error on submission, but it seemed to make it a quicker and better user experience to set the error message before submission.

* <ins>`handleSubmit()`</ins><br>
The back-end call is made into a try/catch block. When a call returns a successful response, the token is collected and set into localStorage with the `setToken` function imported from the `auth.js` library. That way, the user gets logged as soon as the registration has occured, avoiding it to re-enter its credentials onto the login page.

Additionally, `const history = useHistory()` is used to navigate the user to the `/memories` page on successful form submission. The `history` variable being an array, `/` (the home page) is pushed into its last index which represents the page that the user is currently on.

#### Login page
The login page uses a similar pattern as the registration page. However, it is much simpler as it only handle a single message '*Invalid credentials supplied.*' on submission.

Additionally, there is a conditional that influences the `Navbar.js`'s display on user login: when a user is logged, `const isLogged = isAuthenticated()` variable returns a boolean because of the function `isAuthenticated()` called from the library `auth.js` (it checks that there is a payload, then that the payload hasn't expired). So if the user is logged, the *Register*/*Login* buttons disappear, and the *New Memory*/*Logout* buttons show up instead.

#### NewMemory page + cloudinary
Its structure contains much similarities with the registration page when it comes to the form hook, its submission and handling errors returned from the back-end. However, there are novelties worth discussing:

* <ins>handleNestedChanges()</ins>
Because the `Memory` model's `location` value is a nested object, I now have to handle nested changes differently than the other form properties.

TBC

* <ins>handleTags()</ins><br>
Since tags are all inputted into the same text input, they need to be formatted so that punctuation is removed, each keywork is separated into its own string and split into the form's `tags` property array. This is done reformatting tags with `const newTags = formatTagArray(e.target.value)`:
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
As far as my understanding of regular expressions go, `/[^a-zA-Z0-9]/g` only keeps lower and capitalised alphanumerical values. Anything else is replaced with spaces, then split into an array every new space. Finally, remaining empty strings are filtered out. What is left of `newTags` is updated into the formData's `tags` property as an array.

#### Mapbox
#### Comments
#### SecureRoute, Error

#### EditMemory page?

## Challenges, Achievements & Key Learnings

### Things to talk about

* back/front-end username/email unique check at registration. makes me question if it poses a security issue, giving away usernames to potential hackers. also if it makes too many backend calls therefore taking unnecessary strain on the back-end (but intuition tells me that it wno't be the case unless we have a mad amount of signups all at once).

* possible improvement to create a slightly different registration>login process with email confirmation. keep logged and public pages accessible but prompt to confirm email when trying to access secureRoutes.

### Back-end
### Front-end

## Conclusions
