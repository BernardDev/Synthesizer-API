# Synthesizer API :musical_keyboard:

:fire:[Go to API explorer!](https://synthesizer-api.netlify.app/):fire:
<br>
:fire:[Synthesizer Directory](https://synthesizer-directory.netlify.app/):fire:
:fire:[Synthesizer Directory repo](https://github.com/BernardDev/Synthesizer-directory):fire:

For all you gearslutz out there! This free API is the only one out there (since I checked). Explore over 800 synthesizers from past and present. Get insight in their manufacturers and specifications. The API builds upon the data available on the vintagesynthexplorer website. Future work will be aimed to broaden querying options and let you fellow synth lovers contribute to the collection.

---

## Growing as a Developer:

- [About this Project](#about-this-project) :dart:
  <br>

- [User Stories](#user-stories) :bust_in_silhouette:
  <br>

- [Project Board](#project-board) :memo:
  <br>

- [Wireframes API Explorer](#wireframes-api-explorer) :house:
  <br>

- [Datamodel](#datamodel) :floppy_disk:
  <br>

- [Git Version Control](#git-version-control) :octocat:
  <br>

## For Usage:

- [Usage](#usage) :zap:
  <br>

- [Future Work](#future-work) :fire:
  <br>

---

## About this Project

<br>

The goal of this project is to build an public REST API :dart: and thereby applying existing knowledge and explore new terrains. This was done independently by reading its documentation, watching online videos, consulting StackExchange & sometime my coach.

Although this project aimed at making a public API, I obviously tried it out myself! Therefore I made a [frontend](https://github.com/BernardDev/Synthesizer-directory/tree/development/) that uses it. In development some features where added to the backend as well. Such as a route to suggest synthesizer and an admin login system.

<br>

Be sure to visit the :fire:[Synthesizer Directory](https://synthesizer-directory.netlify.app/):fire: as well.
<br>
<br>

### This repo contains three main folders:

<br>

> [SCRAPER](https://github.com/BernardDev/Synthesizer-API/scraper) <br>

The scraper folder contains DOM oriented programming. Before I could fill the database with synthesizers, manufacturers & specification I needed to [scrape data](https://github.com/BernardDev/Synthesizer-API/tree/development/scraper/index.js). My source also had images, therefore I needed to [download images](https://github.com/BernardDev/Synthesizer-API/tree/development/scraper/index.js) from their respective URL's. After scraping the data it needed to be [normalized](https://github.com/BernardDev/Synthesizer-API/tree/development/scraper/index.js) to fit the SQL database structure. For this, some JS object/string manipulation was used.

> [SERVER](https://github.com/BernardDev/Synthesizer-API/server) <br>

This folder is the heart of the project. It contains the server ([with database](https://github.com/BernardDev/Synthesizer-API/tree/development/server/models/)). You will find [endpoints](https://github.com/BernardDev/Synthesizer-API/tree/development/server/app.js) ([& queries](https://github.com/BernardDev/Synthesizer-API/tree/development/server/queries)) making use of [validation middlewares](https://github.com/BernardDev/Synthesizer-API/tree/development/server/validators/) ([& Yup](https://github.com/BernardDev/Synthesizer-API/tree/development/server/app.js)). People are able to suggest synths that can get approved through an admin login-system. Look around in [authorization](https://github.com/BernardDev/Synthesizer-API/tree/development/server/auth/jwt.js) ([& model](https://github.com/BernardDev/Synthesizer-API/tree/development/server/models/admin.js)) done through Express middlewares with JWT tokens, to see more of it. The development was mostly fuelled by [end-to-end testing](https://github.com/BernardDev/Synthesizer-API/tree/development/server/tests/). Another thing that needed to be done was [migrating images](https://github.com/BernardDev/Synthesizer-API/tree/development/server/cloudinary/) to Cloudinary db and save the image URL's to the main SQL database.

> [CLIENT](https://github.com/BernardDev/Synthesizer-API/client) <br>

Here you can find the [API explorer](https://github.com/BernardDev/Synthesizer-API/tree/development/client) repo, done with ReactApp. Through the explorer an [apikey](https://github.com/BernardDev/Synthesizer-API/tree/development/server/sendEmail.js) can be sent to your email. It utilizes [frontend validation](https://github.com/BernardDev/Synthesizer-API/tree/development/client/src/pages/Autorization.js)(with React Hook Form) and some [storage concepts](https://github.com/BernardDev/Synthesizer-API/tree/development/client/src/context/AuthContext.js)(useContext) for the apikey. 
:fire:[Go to API explorer!](https://synthesizer-api.netlify.app/):fire:

<br>

<br>

### Leading topics:

<br>

> [ENVIRONMENTS](https://github.com/BernardDev/Synthesizer-API/tree/development/server/config/config.js) <br>

Throughout the project we have used the development, testing and production environments. Switching in/out sources and storing key's and secret's in .env and hosts.
Wrapping my head around it was challenging at first. Now I feel comfortable to use this in real projects.

<br>

> [END-TO-END TESTING](https://github.com/BernardDev/Synthesizer-API/tree/development/server/tests) <br>

All end-point have been thoroughly tested. The [testing](https://github.com/BernardDev/Synthesizer-API/tree/development/server/tests/) formed the basis of development in the project. Checking if correct responses were given & testing the possible 'un-happy' paths. This made me feel safe to refactor some code. Jest and Supertest were used in de backend, Jest & Playwright (like Puppeteer) in the frontend.

<br>

> [VALIDATION & ERROR HANDLING](https://github.com/BernardDev/Synthesizer-API/tree/development/server) <br>

Validation was done with Yup, used in the [backend](https://github.com/BernardDev/Synthesizer-API/tree/development/server/app.js) as well as the [frontend](https://github.com/BernardDev/Synthesizer-API/tree/development/client/src/pages/Autorization.js). Together with [middlewares](https://github.com/BernardDev/Synthesizer-API/tree/development/server/validators) to safeguarded the routes from user errors and send meaningful feedback to the client when they do occur.
Also validated in the backend: multipart/form-data & attachments.

<br>

> [AUTHENTIFICATION & PASSWORD HASHING](https://github.com/BernardDev/Synthesizer-API/tree/development/server/app.js) <br>

To be able to control the flow of user suggested synthesizers I implemented a admin login-system with JWT token. Although this was not my first encounter with this, it was the first time that I implemented it inside of my [model](https://github.com/BernardDev/Synthesizer-API/tree/development/server/models/admin.js) and validated expiration of the token. Hashing/comparing of the user's password is also done in the model directly.

<br>

### Things I've done in the backend:

|                                  |                                  |                                      |                                  |
| -------------------------------- | -------------------------------- | ------------------------------------ | -------------------------------- |
| DOM manipulation                 | downloading images :star:        | managing multiple dsb’s              | normalizing data                 |
| generating tables                | relating tables                  | mocking seed data :star:             | using environments :star:        |
| managing secrets                 | deploying                        | writing npm scripts                  | big O notation :star:            |
| end-to-end testing :star:        | pagination                       | validation                           | sending emails :star:            |
| writing middlewares              | routing middlewares              | continuous Integration :star:        | error handling                   |
| CORS                             | handling FormData                | HTTP methods (all)                   | Netlify                          |
| Heroku                           | JSDOM                            | Yup :star:                           | Express                          |
| Cloudinary (db) :star:           | Sendgrid :star:                  | Jest                                 | Supertest :star:                 |
| Sequelize ORM                    | ElephantSQL                      | SQL                                  | JWT                              |
| custom Promises                  |                                  |                                      |                                  |

<br>
<br>

### Things I've done in the frontend:

|                              |                         |                          |                       |
| ---------------------------- | ----------------------- | ------------------------ | --------------------- |
| React DOM routing            | Bootstrap :star:        | Sass                     | caching :star:        |
| copy to clipboard            | custom Hooks            | UseContext :star:        | local storage         |
| React children :star:        | validation              | error handling           | fetching data         |

<br>

:star: _New technologies learned in this project_

<br>

### User Stories

- As a User I want to be able to fetch synthesizers and manufacturers
- As a User I want to be able to see visualize the synthesizers I'm fetching
- As a User I want to be able to sort the synthesizers by the year they are produced first
- As a User I want to be able to define how many synthesizers I fetch and view them on different pages
- As a User I want to be able to request an API key
- As a User I want to be able to contribute to the API by suggesting new synthesizers

<br>

### Project Board

- You can find it [here](https://github.com/BernardDev/Synthesizer-API/projects).

<br>

### Wireframes API Explorer

- Checkout the wireframes made for the [API Explorer](https://github.com/BernardDev/Synthesizer-API/tree/development/img/wireframe-api-explorer.png).

<br>

### Datamodel

- Checkout the [datamodel](https://github.com/BernardDev/Synthesizer-API/tree/development/img/datamodel.png) used as base for data structure.

<br>

### Git Version Control

...

<br>

---

<br>

---

## Usage

<br>

### API key

For each request send, you have to send your API key with it. It can be obtained through registering your email at [API explorer](https://60253856f22fd91ddd33781e--zen-brattain-86e1ab.netlify.app/Authorization).
The API key can be located anywhere inside the query string. The following example requests with and without additional queries are all valid:

```md
.../synths?key=<apiKey>
```

```md
.../synths?yearProduced=1980&key=<apiKey>
```

```md
.../synths?key=<apiKey>&yearProduced=1980
```

---

### Pagination

<br>

Calling any API endpoint without a resource ID or name will return a paginated list of available resources for that API. By default, a "page" will contain up to 20 resources. If you would like to change this just add a 'limit' query parameter to the GET request, e.g. ?=60. You can use 'offset' to move to the next page, e.g. ?limit=60&offset=60.

| Name   | Result                                   | Type    |
| ------ | ---------------------------------------- | ------- |
| offset | Get all synths/manufacturers with offset | integer |
| limit  | Get all synths/manufacturers with limit  | integer |

<br>

---

### Endpoint: Synthesizers

<br>

> **GET /synths**

Get a list of synth resources including their image, manufacturers and ten specifications

**NOTE:**\
Some data is not normalized yet. Some specifications will have a null value.

Example of json resources:

```
{
    "count": 815,
    "synths": [
        {
            "id": 309,
            "name": "Native Instruments Pro-53",
            "img": "https://res.cloudinary.com/dgte68hwi/image/upload/v1613044108/Native_Instruments_Pro-53.jpg",
            "ManufacturerId": 50,
            "SpecificationId": 309,
            "synthType": null,
            "interfaceFeature": null,
            "format": null,
            "Specification": {
                "id": 309,
                "polyphony": "32 voices per Instance",
                "keyboard": null,
                "control": null,
                "yearProduced": 2002,
                "memory": "512 Programs (8 programs per bank, 8 banks per file, 8 files). Unlimited Files (512 programs) can be created and stored on your computer for virtually unlimited memory.",
                "oscillators": "2 Oscillators. Osc. A has sawtooth and pulse waveforms. Osc. B has sawtooth, triangle and pulse waveforms.",
                "filter": "24 dB/oct low-pass / high-pass filter with resonance, self oscillation, ADSR envelope",
                "lfo": "1 with sawtooth, square and pulse waveforms, MIDI sync, envelope triggering. Assignable to oscillators, filter, etc.",
                "effects": "Delay Section creates Multi-Echo, Chorus, Flange effects and is MIDI-syncable"
            },
            "Manufacturer": {
                "id": 50,
                "manufacturer": "Native Instruments"
            }
        },
```

> **GET /synths/1**\
> <br> **GET /synths/Jupiter-8**

Get one synth resource, by either giving it's ID or exact name.

**NOTE:**\
All **specifications** and the **manufacturer** are of synth resources are delivered in a request by default. Specifying them specifically in a query is not necessary.
Some data is not normalized yet. This makes it only possible to query with exact name matches. Look into future work to see development goals for querying.

| Name         | Result                                                                | Type    |
| ------------ | --------------------------------------------------------------------- | ------- |
| manufacturer | Get all synths by a given manufacturer                                | string  |
| yearProduced | Get all synths by a given year they hit the market                    | integer |
| polyphony    | Get all synths with description of amount of voices                   | string  |
| keyboard     | Get all synths with description of keyboard specifics                 | string  |
| control      | Get all synths with description of given control (e.g. MIDI, CV/GATE) | string  |
| memory       | Get all synth with description of memory                              | string  |
| oscillators  | Get all synths with description of oscillators                        | string  |
| filter       | Get all synths with description of filter                             | string  |
| lfo          | Get all synths with description of lfo                                | string  |
| effects      | Get all synths with description of effects                            | string  |

<br>

---

### Endpoint: Manufacturers

<br>

> **GET /manufacturers**

Get a list of manufacturer resources.

> **GET /manufacturers/1**\
> <br> **GET /manufacturers/Roland**

Get one manufacturer resource, by either giving it's ID or exact name.

<br>

---

<br>

## Future Work

<br>

This API is a work in process. Future work aims to improve querying, removing and/or adding queriable synth specifications and creating a moderated POST endpoint, to make you able to add to this collection.

**PLANNED**

| Name           | Result                                                                          | Type    | Options                     |
| -------------- | ------------------------------------------------------------------------------- | ------- | --------------------------- |
| manufacturer   | Get all synths produced by a given manufacturer                                 | string  | name or id                  |
| yearProduced   | Get all synths that hit the market by a given year                              | integer | range, asc/dec              |
| polyphony      | Get all synths that have a given amount of voices                               | integer | range, asc/dec              |
| keyboard       | Get all synths that have or do not have a keyboard                              | ENUM    | none/yes                    |
| control        | Get all synths that are controlled with MIDI and/or CV/GATE                     | ENUM    | MIDI, CV/GATE               |
| oscillators    | Get all synths that have a given amount of oscillators                          | integer | range, asc/dec              |
| oscillatorType | Get all synths that are either VCO or DCO                                       | ENUM    | VCO, DCO                    |
| filter         | Get all synths that contain one or a combination of lowpass, highpass, bandpass | ENUM    | lowpass, highpass, bandpass |
| effects        | Get all synths that have or do not have built in effects                        | ENUM    | none/yes                    |
| type           | Get all synths that are either analog, digital or hybrid                        | ENUM    | analog, digital, hybrid     |

---

<br>

## Updates

<br>

- [x] Adding sort by year, ascending and descending
- [ ] Adding, merging specification that will be queriable
- [ ] Make querying possible without strictly needing to equal the resource name
- [ ] Sorting sorting by number functionalities used in more than yearProduced alone
- [ ] And there will be more...

<br>

---

<br>
