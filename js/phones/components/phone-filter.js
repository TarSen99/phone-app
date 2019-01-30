import Component from "../../component.js";

export default class PhoneFilter extends Component{
    constructor({element, phones}) {
        super({element});
        this._phones = phones;

        this._render();
        this._findSimilarItemsWrapper = this._debounce(this._getSimilarItems, 500);

        this.on('input', '[data-element="input"]', this._findSimilarItemsWrapper);
    }

    _debounce(f, delay) {
        let timerId;

        return () => {
            clearTimeout(timerId);
            timerId = setTimeout(f.bind(this), delay);
        }
    }

    _getSimilarItems() {
        let filteredPhones = this._filterPhones();

        this.emit('input-enter', filteredPhones);
    }

    _filterPhones() {
        let input = this._element.querySelector('[data-element="input"]');
        let inputValue = input.value.toLowerCase()
            .trim();

        let filteredPhones = this._phones.filter(phone => {
           let phoneName = phone.name.toLowerCase().
            trim();

           if(phoneName.indexOf(inputValue) === 0) {
               return phone.name;
           }
       });

       return filteredPhones;
    }

    _render() {
        this._element.innerHTML = `
                  <p>
                    Search:
                    <input data-element="input">
                  </p>
        `;
    }
}