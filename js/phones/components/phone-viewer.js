'use strict';

import Component from './../../component.js';

export default class PhoneViewer extends Component{
    constructor({element, onViewerHide}) {
        super({element});
        this._onViewerHide = onViewerHide;

        this._checkTypeOfClick = this._checkTypeOfClick.bind(this);
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
        this._element.removeEventListener('click', this._checkTypeOfClick);
    }

    _addClickListeners() {
        this._element.addEventListener('click', this._checkTypeOfClick);
    }

    _checkTypeOfClick(e) {
        let target = e.target;

        if(target.closest('[data-button="back"]')) {
            this.hide();
            return;
        }

        if(target.closest('[data-selectable-img]')) {
            this._changeMainViewerImage(target.src);
        }
    }

    _changeMainViewerImage(src) {
        let mainImage = this._element.querySelector('.phone');

        mainImage.src = src;
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
                <img data-selectable-img src="img/phones/${this._details.id}.0.jpg">
              </li>
              <li>
                <img data-selectable-img src="img/phones/${this._details.id}.1.jpg">
              </li>
              <li>
                <img data-selectable-img src="img/phones/${this._details.id}.2.jpg">
              </li>
            </ul>
`;
    }
}