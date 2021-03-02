### Release 1.0:

- [x] add a [home page](###development) in the menu
- [x] fix [mobile compatibility](###Mobile-compatibility)of api explorer
- [x] add proper [status code responses](###Error-handling) from back end and frontend
- [x] add images [that failed upload](###Image-uploads) manually
- [ ] simple [cleanup code base](###Cleanup-codebase) : what do I want to show?
- [ ] finish readme (usage side)
- [x] do [simple refactor](###refactor)

### Error handling

- [ ] Status: Loading
- [ ] Status: Idle
- [ ] Status: Okay!
- [ ] Server: status code 400
- [ ] Client: status code 400
- [ ] Server: status code 404
- [ ] Client: status code 404
- [ ] Server: status code 500
- [ ] Client: status code 500
- [ ] Server: status code 200
- [ ] Client: status code 200
- [ ] Server: status code 409 record already exists
- [ ] Client: status code 409
- [ ] Implement for GET routes
- [ ] Implement for POST routes
- [ ] notify user about present apiKey, on every request
- [ ] display notification after email has been send

### Image uploads

- [ ]
- [ ]
- [ ]

### Cleanup codebase

- [ ] Show only the commit's I want to show
- [ ] Rewrite commits if needed
- [ ] Show only the PR I want to show
- [ ] Rewrite commits if needed
- [ ] Rewrite projectboard
- [ ] Write user stories

### Refactor

- [ ] create custom hook for the useContext component
- [ ]
- [ ]
- [ ]

### Development

- [ ] adding a home page in navbar
- [ ] do not display 'loading' notification on startup
- [ ] redeploy!

-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.

### new markdown!

- [x] move image folder to server (temporarily), so we can access images
- [x] write a small script that does the following:

  - [x] get one record from the test database (findOne)
  - [x] grab the imageUrl from the record
  - [x] strip the filename from the url (.split('/'))
  - [x] check if the filename exists in our images folder (fs.readDir)
  - [x] if not -> stop and log: image not found or name does not match, time for Bernard to use the GUI?
  - [x] if yes
  - [x] grab the name of the synth
  - [x] turn the name of the synth into a `public_id` for cloudinary (replaces spaces with `*` for example)
    - [x] example: Casio Big fuckin' keyboard -> `Casio_Big_fuckin'_keyboard`
    - [x] maybe use `EncodeUriComponent` -> ` ` -> `%20`
  - [x] Upload to cloudinary
    - [x] if success
    - [x] update the url of the Synth in the database to the cloudinary url
    - [x] failure
    - [x] log failure, check what went wrong

### Complete cleanup list:

-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.

- [x] save or not to save... that is the question -> onClick/save or onChange/input
- [x] interaction of local storage and the store:
  - [x] if handleStoreKeySave:localStorage.setItem('apiKey', keyStore.apiKey)
  - [x] if key is in local storage, dupe this inside the keyStore.apiKey
- [x] components where store's data is useful:
  - [x] PopUp
    - [x] remove popup if apiKey (saved)
  - [x] Authorization
    - [x] notify user about present apiKey, on every request
  - [x] UrlExplorer > API key input field - [ ] display currently (saved) API key - [ ]
        -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.

-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.

### useContext (superb way)

- [x] seperate the Provider from App js with React children

### useContext (nice way)

- [x] pass the setter in the store instead of as callback prop

### useContext (simple way)

- [x] createContext
- [x] consider where you get data you want to have inside the context?
  - [x] UrlExplorer
- [x] consider where you want to use the context
  - [x] Toast, Autorization
- [x] wrap everything from App inside AuthContext.Provider (work with React children)
- [x] in App (parent), import and create a useState for the data you want to be in the context
- [x] in App (parent), pass the component that is responsible for updating the state a callback prop (pass it through even deeper if needed)
- [x] use the callback prop to change state in App
- [x] pass the state ass value
- [x] in App, pass -> NameContext.Provider value={state} <-
- [x] test it out in different components with useContext
- [x] get what you want out of the state useContext name.apiKey

### Todo before presentation

- [x] display data in json viewer
- [x] remove draggsizing
- [x] rescale textarea
- [x] not visible only after succesful retrieval
- [x] edit scrollbar to always show
- [ ] edit scrollbar to not have a border

- [x] copy url to clipboard
- [x] notify the user about copy
- [x] notification disappears after a few seconds
- [x] notification disappears after 4 seconds

- [x] display content op link in field
- [x] anchor tags that update the state of route or query field, and also url
- [ ] in case of &queries it is a addition on top of current state

- [ ] user notification messages

<!-- what is the current situation of backend error handling -->

- [ ] you do not seed bad request on mount of page
- [ ] should give a general error in notification
- [ ] should give more detailed error inside the json viewer

---

- [ ] &manufacturer=Pietje should give message: no records found, error: no records found
- [ ] &yearProduced=4000 should give message: no record found, error: no records found
- [ ] &yearProduced=chesse should give a message: bad request, error: yearProduced must be... type
- [ ] &offset=0&limit=cheese should give message: bad request , errors: offset must be... type

---

- [ ] /snits should give a message: this route does not exist
- [ ] /
- [ ]

- [ ] validation when no record has been found (404)
- [ ] validation when bad request has been made (400)
- [ ] validation when error on server side (500)
- [ ] validation anything else
- [ ] get all messages from server instead of client

- [ ] validate when email is already in the db (?)
- [ ] validation when error on server side (500)

- [ ] if storedKey/something in key input close toast

<!-- extra -->

- [ ] add a home route in the navigation
- [ ] design: color scheme, change
- [ ] refactor: urlExplorer, authorization
- [ ] add documentation page
- [ ] add about page

### Todo

<!-- validation and testing -->

- [x] send succes message
- [x] send succes message from server
- [x] display feedback: request succeeds, request fails (get out of server)
- [x] hide/disable button and inputfield (no double requests)

- [x] inputfield for api key explorer, save the key in local storage
- [x] make explorer url read only

- [x] when app starts check local storage for key and load it if there
- [x] if there load it into url
- [ ] make a request and display json

- [x] input field: route
- [x] input field: query
- [x] when user edits route or query update the url
- [x] auto add key to explorer url

#### As a developer I want my api users to send an api key with each request, so I can identify who is using my api

- [x] Make a route to request a key
- [x] Validate the request for a key: valid email
- [x] Generate a key (not safe yet, not conversion)
- [x] Setup sendgrid
- [x] Store api key in .env
- [x] Send an email with the key
- [x] Create a user table
- [ ] When a user request a key: create user with the generated key

Middelware

- [x] change test/new test on GET /manufacturers to not allow request without apikey
- [x] implement logic for GET /manufacturers
- [x] apikey present in querystring?
- [x] apikey present in db?
- [ ]
- [ ] Validate on each api request: did the user send us a key at all?
- [ ] Implement an api key middleware that checks if the key is valid
- [ ]Valid request: apikey is present in querystring && apikey is in db && under max of request
- [ ]
- [ ]
- [ ]
- [ ]

Daily limit

- [ ] Count the requests
- [ ] Reset the
- [ ] Configure cors for api / request key route

### TO DO'S

// - try catch
// - validation: query / params | id / name
// - pagination
// - route naming: 'detailed'

- [ ] Generalize the validation middleware

- [-] Try catch handle 400 and 500 status codes
- [x] id or name in all that need it
- [x] migrate all pagination to plural synths/manufactures
- [x] move back all validation stuff to route level
  - [x] put schema on the route
  - [x] remove some files
  - [x] think of querying and params with ['option']
- [x] handle 404 error (uses validate())
- [] validate each query/param

- [ ] Validate params / queries
- [ ] Cleanup comments, unless they explain why

Future Expand query options:

- [ ] Perhaps include specs when querystring contains: ?includeSpecifications=true
- [ ] Generalise a query for synths where you pass options (together)

### ROUTES

give and limit pagination options
include or not include specifications
always include manufacturer
use name OR id
Example of Search
GET /synths/search?name=Roland

- GET /synths/specification?year=2000
  GET /synths/specification?polyphony=8

  ---SYNTHS---

Lookup all synths
GET /synths

Lookup one synth (with specs and manufacturer!)

- [ ] GET /synth/:id
- [ ] GET /synth/:name

Lookup one random synth ()

- [ ] GET /synth/getRandom

Lookup all synths by year (or any other spec value) \*

- [ ] GET /synths/specification/:name

Lookup all synth with synth type

- [ ] GET /synths/synthType/:name

Lookup all synth with interface feature

- [ ] GET /synths/interfaceFeature/:name

Lookup all synth with format

- [ ] GET /synths/format/:name

---

Lookup all manufactures

- [ ] GET /manufacturers
      Lookup one manufacturer
- [ ] GET /manufacturer/:id
- [ ] GET /manufacturer/:name
      Lookup one manufacturer with all synths
- [ ] GET /manufacturers/:name/synths
      Lookup one manufacturer with all synths and specs
- [ ] GET /manufacturers/:name/synths
      Lookup one manufacturer and one synth ?
- [ ] GET /manufacturers/:name/synth/:id

### MORE IMPORTANTLY: SYNTH TYPE

synthType:

- Analog
- Digital
- Drum machine
- Effects processor
- Sampler

format:

- Computer software
- Desktop / Tabletop
- Keyboard
- Rack-mount

interfaceFeature: **(least important)**

- Hybrid
- Modern
- Vintage

### MUST CONTAIN

- Endpoint to look for all synths (20 at the time)
- Endpoint to look for all manufacturers (20 at the time)

- Endpoint to look for specific synth with specs
- Endpoint to look for specific manufacturer

- Endpoint to look for specific manufacturer and all synths they made

- Endpoint to look for a specification and all synths that have this specification
- Endpoint to look for a specification and all synths that have this specification: with a certain value (string/regex)

## ORDER

- Alphabetically
- Year
- Number of ...

## POSSIBLE SPEC DATA TO PARSE NUMBERS FROM

- polyphony
- keyboard
- control
- yearProduced
- memory
- oscillators
- filter
- lfo
- effects

---

**feasibility rating%**

- Filter: **100%**

  - All info bundled

- Polyphony: **90%**

  - Monophonic
  - n
  - CPU
  - expandable
  - between,to
  - Other
  - NULL

- Control: **80%**

  - MIDI
  - CV
  - MIDI & CV
  - Other
  - NULL

- Oscillators: **60%**

  - n
    &&
  - VCO/DCO || Voldate controlled oscillator / Digital ...
  - Other
  - NULL

- Effects: **70%**

  - All types of effects

- Keyboard: **90%**

  - n
  - Other
  - NULL

- Memory: **40%**
