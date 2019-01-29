'use strict';

import Component from './../../component.js';

export default class PhoneViewer extends Component{
    constructor({element, onViewerHide, onAddButtonClicked}) {
        super({element});
        this._onViewerHide = onViewerHide;
        this._addToShopingCart = onAddButtonClicked;
        this._element.addEventListener('click', (e) => {
            this._checkTypeOfClick(e)
        });

        this._checkTypeOfClick = this._checkTypeOfClick.bind(this);
    }

    show(phoneDetails) {
        this._details = phoneDetails;
        this._render();

        super.show();
    }


    hide() {
        super.hide();
        this._onViewerHide();
    }

    _checkTypeOfClick(e) {
        console.log('hello');
        let target = e.target;

        if(target.closest('[data-button="back"]')) {
            this.hide();
            return;
        }

        if(target.closest('[data-button="add-to-basket"]')) {
            this._addToShopingCart(this._details.id, this._details.name);
            return;
        }

        if(target.closest('[data-selectable-img]')) {
            this._changeMainViewerImage(target.src);
            return;
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