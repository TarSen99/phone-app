'use strict';

import Component from './../../component.js';

export default class PhoneViewer extends Component {
    constructor({element}) {
        super({element});

        this.on('click', '[data-element="phone-viewer"]', (e) => {
            this._checkTypeOfClick(e);
        });
    }

    show(phoneDetails) {
        this._details = phoneDetails;
        this._render();

        super.show();
    }

    _checkTypeOfClick(e) {
        let target = e.target;

        if (target.closest('[data-button="back"]')) {
            this.hide();
            this.emit('back-button-clicked');

            return;
        }

        if (target.closest('[data-button="add-to-basket"]')) {
            this.emit(
                'add-button-clicked',
                this._details.id,
                this._details.name
            );

            return;
        }

        if (target.closest('[data-selectable-img]')) {
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
         <div data-element="phone-viewer">
            <img class="phone"
             src="img/phones/${this._details.id}.0.jpg"
             >
             
            <button data-button="back">Back</button>
            <button data-button="add-to-basket">Add to basket</button>
        
            <h1>${this._details.name}</h1>
        
            <p>${this._details.description}</p>
            
            <ul class="phone-thumbs">
                ${this._details.images.map(image => {
                    return `
                        <li>
                           <img data-selectable-img src="${image}">
                        </li>
                       `;
                      }).join('')}    
            </ul>
        </div>
       `;
    }
}