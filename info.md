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
