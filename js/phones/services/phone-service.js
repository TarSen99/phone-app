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

const getDataFromServer = (id, callback) => {
  xhr.open(
    'GET',
    `https://mate-academy.github.io/phone-catalogue-static/phones/${id}.json`,
    true
  );

  xhr.onload = function() {
    PhoneService._dataFromServer = JSON.parse(this.responseText);
    callback();
  };

  xhr.onloadend = function() {
    if (xhr.status !== 200) {
      console.log(`${xhr.status} : ${xhr.statusText}`);
    }
  };

  xhr.send();
};

const PhoneService = {
  _dataFromServer: null,

  getAll(
    setLoadingState,
    {
      filterValue = '',
      orderValue = '',
      itemsAmount = 10,
      currentPage = 0
    } = {},
    callback
  ) {
    setLoadingState();
    const phonesListId = 'phones';

    getDataFromServer(phonesListId, () => {
      if (!this._dataFromServer) {
        return;
      }

      let filteredPhones = this._filterPhones(
        filterValue,
        this._dataFromServer
      );

      let pageCount = Math.ceil(filteredPhones.length / itemsAmount);
      console.log(pageCount);

      filteredPhones = filteredPhones.filter((item, index) => {
        return (
          index >= currentPage * itemsAmount &&
          index < currentPage * itemsAmount + itemsAmount
        );
      });

      let phones = this._sort(orderValue, filteredPhones);
      callback(phones, pageCount);
    });
  },

  getById(phoneId, callback) {
    getDataFromServer(phoneId, () => {
      callback(this._dataFromServer);
    });
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
