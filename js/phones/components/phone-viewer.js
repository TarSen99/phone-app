'use strict';

import Component from './../../component.js';

export default class PhoneViewer extends Component{
    constructor({element, onViewerHide}) {
        super({element});
        this._onViewerHide = onViewerHide;
    }

    show(phoneDetails) {
        this._details = phoneDetails;
        this._render();
        this._addClickListeners();

        super.show();
    }


    hide() {
        super.hide();
        this._onViewerHide();
    }

    _addClickListeners() {
         this._backButton = this._element.querySelector('[data-button="back"]');
         this._addToBusketButton = this._element.querySelector('[data-button="back"]');

        this._backButton.addEventListener('click', () => {
            this.hide();
        });
    }

    _render() {
        this._element.innerHTML = `
         <img class="phone" src="img/phones/${this._details.id}.0.jpg">

            <button data-button="back">Back</button>
            <button data-button="add-to-basket">Add to basket</button>
        
            <h1>${this._details.name}</h1>
        
            <p>${this._details.description}</p>
        
            <ul class="phone-thumbs">
              <li>
                <img src="img/phones/${this._details.id}.0.jpg">
              </li>
              <li>
                <img src="img/phones/${this._details.id}.1.jpg">
              </li>
              <li>
                <img src="img/phones/${this._details.id}.2.jpg">
              </li>
            </ul>
`;
    }
}