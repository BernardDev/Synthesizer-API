## Synthesizer API

[Go to API explorer!](https://60253856f22fd91ddd33781e--zen-brattain-86e1ab.netlify.app)

For all you gearslutz out there! This free API is the only collection of synthesizers out there. Explore over 800 synthesizers from past and present. Get insight in their manufacturers and specifications. The API builds upon the data available on the vintagesynthexplorer website. Future work will be aimed to broaden querying options and let you fellow synth lovers contribute to the collection.

### Table of contents

- Usage
- Future work
- Goals for this project
- Used technologies and concepts
- User stories
- Project board
- Wireframes
- Datamodel
- Git version control
- Backend server repo

---

<br>

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
> **GET /synths/Jupiter-8**

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

> **GET /manufacturers/1**\ >**GET /manufacturers/Roland**

Get one manufacturer resource, by either giving it's ID or exact name.

<br>

---

<br>

## Future work

<br>

This API is working but not nearly finished. Future work aims to improve querying, removing and/or adding queriable synth specifications and creating a moderated POST endpoint to make you able to add resources to this collection.

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

Planned to remove: memory
Planned to minimize: keyboard
Planned to add: VCA, envelopes, Arp/Seq, multitimbral

Planned to remove: effects only units
Planned to remove: software synths

### Queries

<!-- how are spaces queried -->
<!-- queries not sensitive for upper/lowercasing -->
<!-- sorting functionality yearProduced -->
<!-- query for includes instead of precise match -->
<!-- querying manufacturers only happens by name -->

<!-- normalizing data with ENUM -->
<!-- transform strings to number -->
<!-- sorting functionalities beyond yearProduced -->

GET /synths?manufacturer=Roland
