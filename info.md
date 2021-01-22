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
