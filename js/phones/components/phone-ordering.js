import Component from "../../component.js";

export default class PhoneOrder extends Component{
    constructor({element, phones, makeOrder}) {
        super({element});
        this._phones = phones;
        this._makeOrder = makeOrder;

        this.on('change', '[data-element="select"]', () => {
            let orderSelect = this._element.querySelector('[data-element="select"]');
            let orderValue = orderSelect.value;
            let orderedArr = this._makeOrder(this._phones, orderValue);

            this.emit('order-changed', orderedArr);
        });

        this._render();
    }

    updatePhonesList(phones) {
        this._phones = phones;
    }

    _render() {
        this._element.innerHTML = `
                  <p>
                    Sort by:
                    <select data-element="select">
                      <option value="name">Alphabetical</option>
                      <option value="age" selected>Newest</option>
                    </select>
                  </p>
        `;
    }

}