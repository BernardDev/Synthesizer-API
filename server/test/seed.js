const db = require('../models');

async function seedDummyData() {
  const testManufacturers = [
    {
      manufacturer: 'Vermona',
    },
    {
      manufacturer: 'Roland',
    },
    {
      manufacturer: 'Sequential Circuits',
    },
    {
      manufacturer: 'TC|Works',
    },
  ];
  const [
    vermona,
    roland,
    sequentialCircuits,
    TCWorks,
  ] = await db.Manufacturer.bulkCreate(testManufacturers);

  const testSynths = [
    {
      name: 'TC|Works Mercury-1',
      img:
        'http://www.vintagesynth.com/sites/default/files/2017-05/mercury1.jpg',
      ManufacturerId: TCWorks.id,
      Specification: {
        polyphony: 'Monophonic',
        oscillators:
          'Modeled Analog Synthesis: 2 plus sub-osc; osc 1: saw/sine/square/noise; osc 2: saw/tri/square/variable pulse width. Osc 1 and 2 SYNC. White Noise Generator.',
        lfo: '1 (sine/saw/square/S&H)',
        filter:
          '24 dB/Octave Low Pass 4-pole Filter (Resonance, Key Follow, LFO amount, assignable to either Envelope Generator)',
        control: 'MIDI (4-parts, velocity, key range can be split)',
        effects: 'URing-Mod, Pulse-Width Mod',
        memory: '128 Patches (Unlimited storage to disk)',
        keyboard: 'None',
        yearProduced: 2001,
      },
    },
    {
      name: 'Vermona Dual Analog Filter (DAF-1)',
      img: 'http://www.vintagesynth.com/sites/default/files/2017-05/daf1.jpg',
      ManufacturerId: vermona.id,
      Specification: {
        polyphony: '4 filters: Stereo with 2 per channel',
        oscillators: 'n/a',
        filter: '4 lowpass/highpass 24dB/oct filters, Freq. Cutoff, Resonance,',
        control: 'CV /Footswitch Input',
        memory: 'None',
        keyboard: 'n/a',
        yearProduced: 2002,
      },
    },
    {
      name: 'Vermona M.A.R.S. Monophonic Analog Rack Synthesizer',
      img:
        'http://www.vintagesynth.com/sites/default/files/2020-05/VermonaMars.jpg',
      ManufacturerId: vermona.id,
      Specification: {
        polyphony: '8 voices',
        lfo: 'YES',
        filter: 'Resonant low pass analog filter',
        keyboard: 'None',
        control: 'MIDI / SCSI',
        memory: '2MB internal',
        yearProduced: 1999,
      },
    },
    {
      name: 'Sequential Circuits Prophet 3000',
      img: 'http://www.vintagesynth.com/sites/default/files/2017-05/p3000.jpg',
      ManufacturerId: sequentialCircuits.id,
      Specification: {
        polyphony: '1 Voice',
        oscillators: '2',
        lfo: '2 LFO with sample & hold, sine, square, Triangle',
        control: 'MIDI In/Out/Thru',
        effects:
          'Up to 22 simultaneous effects: 4 Chorus effects, Global Reverb/Delay, Vocoder',
        memory: '128 patches',
        yearProduced: 1997,
      },
    },
    {
      name: 'Roland JV-2080',
      img:
        'http://www.vintagesynth.com/sites/default/files/2017-05/roland_jv2080.jpg',
      ManufacturerId: roland.id,
      Specification: {
        polyphony: '64 voices',
        oscillators:
          '8MB of sample ROM and acoustic simulation. Expandable with SR-JV80 expansion boards',
        lfo:
          "2 LFO's (sine, saw, square, triangle, trapezoid, sample&hold, random and chaos) w/ key or external sync. Can modulate the pitch, filter, pan, or level",
        filter:
          'TVF (lowpass, bandpass, highpass, peak) with cutoff, resonance, key follow and velocity sensitivity',
        memory:
          '128 user, 640 presets, 2 user rhythm kits, 10 preset rhythm kits, 32 user performances, 64 preset performances and 8 expansion board slots',
        keyboard: 'None',
        control: 'MIDI (16 channels)',
        yearProduced: 1996,
      },
      manufacturer: 'Roland',
    },
  ];
  await db.Synth.bulkCreate(testSynths, {include: [db.Specification]});
}

module.exports = seedDummyData;
