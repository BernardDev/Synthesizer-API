const {
  Synth,
  Manufacturer,
  Specification,
  User,
  Suggestion,
  Admin,
} = require('../models');

async function createAdmin(email, password) {
  try {
    const newAdmin = await Admin.create({
      email: email,
      password: password,
    });
    return [null, newAdmin];
  } catch (error) {
    // console.error('error', error);
    return [error, null];
  }
}

async function checkApiKey(key) {
  try {
    const foundUser = await User.findOne({where: {key}});
    if (foundUser) {
      return foundUser.update({count: foundUser.count + 1});
    } else {
      return null;
    }
  } catch (error) {
    console.error('error', error);
    return false;
  }
}

async function postUser(user) {
  const [dbUser, created] = await User.findOrCreate({
    where: {email: user.email},
    defaults: {
      key: user.key,
    },
  });
  return created;
}

async function postSuggestion(suggestion) {
  try {
    const newSuggestion = await Suggestion.create({
      polyphony: suggestion.polyphony,
      keyboard: suggestion.keyboard,
      control: suggestion.control,
      yearProduced: suggestion.yearProduced,
      memory: suggestion.memory,
      oscillators: suggestion.oscillators,
      filter: suggestion.filter,
      lfo: suggestion.lfo,
      effects: suggestion.effects,
      name: suggestion.name,
      manufacturer: suggestion.manufacturer,
      image: suggestion.image,
    });
    return newSuggestion;
  } catch (error) {
    // @todo: return response error
    return;
  }
}

async function declineSynth(id) {
  try {
    const suggestionToDelete = await Suggestion.findByPk(id);
    if (!suggestionToDelete) {
      return {
        data: null,
        message: 'No suggestion found',
        errors: ['Not found'],
      };
    }
    await suggestionToDelete.destroy();
    return {
      data: null,
      message: 'Suggestion deleted',
      errors: [],
    };
  } catch (error) {
    console.log(`error`, error);
    return {
      data: null,
      message: 'No suggestion found',
      errors: ['Not found'],
    };
  }
}

async function acceptSynth(id) {
  try {
    const suggestion = await Suggestion.findByPk(id);
    if (!suggestion) {
      return {
        data: null,
        message: 'No suggestion found',
        errors: ['Not found'],
      };
    }
    const synth = await Synth.findOne({
      where: {name: suggestion.name},
    });
    if (synth) {
      return {
        data: null,
        message: 'There already is a synth named like that',
        errors: ['Not found'],
      };
    }

    const manufacturer = await Manufacturer.findOne({
      where: {manufacturer: suggestion.manufacturer},
    });

    if (!manufacturer) {
      const synth = await Synth.findOne({
        where: {name: suggestion.name},
      });

      const created = await Synth.create(
        {
          name: suggestion.name,
          img: suggestion.image,
          Specification: {
            polyphony: suggestion.polyphony,
            oscillators: suggestion.oscillators,
            lfo: suggestion.lfo,
            filter: suggestion.filter,
            control: suggestion.control,
            effects: suggestion.effects,
            memory: suggestion.memory,
            keyboard: suggestion.keyboard,
            yearProduced: suggestion.yearProduced,
          },
          Manufacturer: {
            manufacturer: suggestion.manufacturer,
          },
        },
        {include: [Specification, Manufacturer]}
      );
      await suggestion.destroy();
      return created;
    } else {
      const referenced = await Synth.create(
        {
          name: suggestion.name,
          img: suggestion.image,
          Specification: {
            polyphony: suggestion.polyphony,
            oscillators: suggestion.oscillators,
            lfo: suggestion.lfo,
            filter: suggestion.filter,
            control: suggestion.control,
            effects: suggestion.effects,
            memory: suggestion.memory,
            keyboard: suggestion.keyboard,
            yearProduced: suggestion.yearProduced,
          },
          ManufacturerId: manufacturer.id,
        },
        {include: [Specification]}
      );
      return referenced;
    }
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: 'No suggestion found',
      errors: ['Not found'],
    };
  }
}

async function manufacturersAll(limit, offset) {
  const manufacturers = await Manufacturer.findAndCountAll({limit, offset});
  return manufacturers;
}

async function manufacturerByPk(id) {
  const manufacturer = await Manufacturer.findByPk(id);
  return manufacturer;
}

async function manufacturerByName(name) {
  const manufacturer = await Manufacturer.findOne({
    where: {manufacturer: name},
  });
  return manufacturer;
}

async function synthsAll(
  specificationQuery,
  manufacturerQuery,
  pagination = {limit: 20, offset: 0},
  sortByQuery
) {
  const synths = await Synth.findAndCountAll({
    ...pagination,
    include: [
      {
        model: Specification,
        where: {...specificationQuery},
      },
      {
        model: Manufacturer,
        where: {...manufacturerQuery},
      },
    ],
    order: [[Specification, sortByQuery.sortBy, sortByQuery.sortOrder]],
  });
  return synths;
}

async function synthByPk(id) {
  const synth = await Synth.findByPk(id, {
    include: [
      {
        model: Specification,
      },
      {
        model: Manufacturer,
      },
    ],
  });
  return synth;
}
async function synthByName(name) {
  try {
    const synth = await Synth.findOne({
      where: {name},
      include: [
        {
          model: Specification,
        },
        {
          model: Manufacturer,
        },
      ],
    });

    return synth;
  } catch (error) {
    console.log('error', error);
  }
}

module.exports = {
  checkApiKey,
  postUser,
  postSuggestion,
  manufacturersAll,
  manufacturerByPk,
  manufacturerByName,
  synthsAll,
  synthByPk,
  synthByName,
  acceptSynth,
  declineSynth,
  createAdmin,
};
