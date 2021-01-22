const app = require('../app');
const db = require('../models');

const request = require('supertest');

const server = request(app);

describe('GET /', () => {
  afterAll(async () => {
    await db.sequelize.close();
  });
  describe('End to End', () => {
    afterAll(async () => {
      await db.Manufacturer.destroy({truncate: true, cascade: true});
      await db.Synth.destroy({truncate: true, cascade: true});
    });

    beforeAll(async () => {
      await db.Manufacturer.destroy({truncate: true, cascade: true});
      await db.Synth.destroy({truncate: true, cascade: true});
      const testManufacturers = [
        {
          name: 'Korg',
        },
        {
          name: 'Novation',
        },
        {
          name: 'Roland',
        },
      ];
      const [korg, novation, roland] = await db.Manufacturer.bulkCreate(
        testManufacturers
      );

      const testSynths = [
        {
          name: 'Korg synth 1',
          img: 'img1',
          ManufacturerId: korg.id,
          Specification: {
            polyphony: '12 voices',
            oscillators:
              '2 Osc per voice plus 1 Sub-Osc: Sine, tri, saw, variable width pulse, oscillator sync. 1 FM Mode: 64 digital FM spectral waveforms.',
            lfo:
              '2 per voice with tri, saw down, square, sample/hold, sample/glide and more',
            filter:
              '2 independent resonant filters; lowpass, hipass, bandpass, band reject, parallel, split & 2 serial modes with up to 36dB/voice (6-poles), overdrive/saturation.',
            control: 'MIDI (16 multitimbral parts)',
            effects:
              'Up to 22 simultaneous effects: 4 Chorus effects, Global Reverb/Delay, Vocoder',
            memory: '256 ROM patches, 256 RAM patches, 128 multi RAM patches',
            keyboard: 'None',
            yearProduced: 1997,
          },
        },
        {
          name: 'Korg synth 2',
          img: 'img1',
          ManufacturerId: korg.id,
          Specification: {
            polyphony: '12 voices',
            oscillators:
              '2 Osc per voice plus 1 Sub-Osc: Sine, tri, saw, variable width pulse, oscillator sync. 1 FM Mode: 64 digital FM spectral waveforms.',
            lfo:
              '2 per voice with tri, saw down, square, sample/hold, sample/glide and more',
            filter:
              '2 independent resonant filters; lowpass, hipass, bandpass, band reject, parallel, split & 2 serial modes with up to 36dB/voice (6-poles), overdrive/saturation.',
            control: 'MIDI (16 multitimbral parts)',
            effects:
              'Up to 22 simultaneous effects: 4 Chorus effects, Global Reverb/Delay, Vocoder',
            memory: '256 ROM patches, 256 RAM patches, 128 multi RAM patches',
            keyboard: 'None',
            yearProduced: 2000,
          },
        },
      ];
      await db.Synth.bulkCreate(testSynths, {include: [db.Specification]});
    });

    // ----------------------------------------------------------------------------------
    // tests start
    // ----------------------------------------------------------------------------------
    test('should give all manufacturers', async (done) => {
      const res = await server.get('/manufacturers');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      done();
    });

    // ----------------------------------------------------------------------

    test('should give one manufacturer by id', async (done) => {
      const manufacturer = await db.Manufacturer.findOne();
      const res = await server.get(`/manufacturer/${manufacturer.id}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(manufacturer.name);
      done();
    });

    // or...

    test('should give one manufacturer by name', async (done) => {
      const res = await server.get('/manufacturer/Korg');
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Korg');
      done();
    });

    // ----------------------------------------------------------------------

    test('should give one manufacturer by id and all synths', async (done) => {
      const response = await server.get('/manufacturer/1/synths');
      expect(response.status).toBe(200);
      expect(response.body.Synths.length).toBe(2);
      done();
    });

    // or...

    test('should give one manufacturer by name and all synths', async (done) => {
      const response = await server.get('/manufacturer/Korg/synths');
      expect(response.status).toBe(200);
      expect(response.body.Synths.length).toBe(2);
      done();
    });

    // ----------------------------------------------------------------------

    test('should give one manufacturer by id and all synths they made with the specs', async (done) => {
      const response = await server.get('/manufacturer/1/synths/detailed');
      expect(response.status).toBe(200);
      expect(response.body.Synths.length).toBe(2);
      done();
    });

    // or...

    test('should give one manufacturer by name and all synths they made with the specs', async (done) => {
      const response = await server.get('/manufacturer/Korg/synths/detailed');
      expect(response.status).toBe(200);
      expect(response.body.Synths.length).toBe(2);
      done();
    });

    // ----------------------------------------------------------------------
    test('should give all synths with manufacturer', async (done) => {
      const res = await server.get('/synths');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      done();
    });

    // or...

    test('should give all synths with specs and manufacturer', async (done) => {
      const res = await server.get('/synths/detailed');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      done();
    });

    // ----------------------------------------------------------------------

    test('should give one synth by id with specs and manufacturer', async (done) => {
      const synth = await db.Synth.findOne();
      const res = await server.get(`/synth/${synth.id}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(synth.name);
      done();
    });

    // NOT PASSING
    // test('should give one synth by name with specs and manufacturer', async (done) => {
    //   const res = await server.get('/synth/Korg');
    //   expect(res.status).toBe(200);
    //   expect(res.body).toBe(null);
    //   done();
    // });

    // ----------------------------------------------------------------------
    test('should get all synths with spec value yearProduced n', async (done) => {
      const res = await server.get('/synths/specification/2000');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      done();
    });
  });
});
