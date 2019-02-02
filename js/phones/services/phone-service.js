const getDataFromServer = (id) => {
  const xhr = new XMLHttpRequest();

  xhr.open(
    'GET',
    `https://mate-academy.github.io/phone-catalogue-static/phones/${id}.json`,
    false
  );

  xhr.send();

  if (xhr.status !== 200) {
    console.log(`${xhr.status} : ${xhr.statusText}`);
    return;
  }

  return JSON.parse(xhr.responseText);
};

const compareByName = (a, b) => {
  if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
};

const compareByDate = (a, b) => {
  if (a.age > b.age) {
    return 1;
  } else {
    return -1;
  }
};

const PhoneService = {
  phonesFromServer: [],

  phoneDetails: {},

  getAll({ filterValue = "", orderValue = "" } = {}) {
    const catalogListId = 'phones';
    this.phonesFromServer = getDataFromServer(catalogListId);

    if(!this.phonesFromServer) {
      return;
    }

    let filteredPhones = this._filterPhones(filterValue, this.phonesFromServer);
    return this._sort(orderValue, filteredPhones);
  },

  getById(phoneId) {
    return getDataFromServer(phoneId);
  },

  _sort(orderValue, phones) {
    return phones.sort(PhoneService.sortTypes[orderValue]);
  },

  _filterPhones(filterValue, phones) {
    filterValue = filterValue.toLowerCase();

    return phones.filter(phone => {
      let phoneName = phone.name.toLowerCase().trim();

      if (phoneName.indexOf(filterValue) === 0) {
        return phone.name;
      }
    });
  },

  sortTypes: {
    name: compareByName,
    age: compareByDate
  }
};

export default PhoneService;
