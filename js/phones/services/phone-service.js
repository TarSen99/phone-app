const xhr = new XMLHttpRequest();

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

const getDataFromServer = (id, showMethod, getMethod, searchSettings) => {
  xhr.open(
    "GET",
    `https://mate-academy.github.io/phone-catalogue-static/phones/${id}.json`,
    true
  );

  xhr.onload = function() {
    if (!searchSettings) {
      PhoneService._phoneDetails = JSON.parse(this.responseText);
      let PhoneDetails = getMethod();
      showMethod(PhoneDetails);

      return;
    }

    PhoneService._phonesFromServer = JSON.parse(this.responseText);
    let phones = getMethod(searchSettings);
    showMethod(phones);
  };

  xhr.send();

  if (xhr.status !== 200) {
    console.log(`${xhr.status} : ${xhr.statusText}`);
  }
};

const PhoneService = {
  _phonesFromServer: [],

  _phoneDetails: {},

  loadDataFromServer(id, showMethod, searchSettings) {
    getDataFromServer(
      id,
      showMethod,
      searchSettings ? this.getAll.bind(this) : this.getById.bind(this),
      searchSettings
    );
  },

  getAll({ filterValue = "", orderValue = "" } = {}) {
    if (!this._phonesFromServer) {
      return;
    }

    let filteredPhones = this._filterPhones(
      filterValue,
      this._phonesFromServer
    );

    return this._sort(orderValue, filteredPhones);
  },

  getById() {
    return this._phoneDetails;
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
