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
- [ ] auto add key to explorer url
- [ ] display json

- [ ] copy url to clipboard

- [ ] if storedKey close toast

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
