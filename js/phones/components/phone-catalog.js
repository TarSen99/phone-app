"use strict";

import Component from './../../component.js';

export default class PhoneCatalog extends Component{
  constructor({
                element,
                phones = []

  }) {
    super({ element });

    this._phones = phones;

    this.on('click', '[data-element="phone"]', (event) => {
        let target = event.target;
        let phoneElement = target.closest('[data-element="phone"]');

        if(target.closest('[data-show-details]')) {
            this.emit(
                'phone-selected',
                phoneElement.dataset.elementId
            );

            return;
        }

        if(target.closest('[data-add-to-bucket]')) {
            this.emit('add-button-clicked',
                phoneElement.dataset.elementId,
                phoneElement.dataset.elementId
            );

            return;
        }
    });

    this._render();
  }

  _render() {
    this._element.innerHTML = `
        <ul class="phones">
            ${this._phones
        .map(phone => {
          return `
                 <li class="thumbnail"
                    data-element="phone"
                    data-element-id="${phone.id}"
                    data-element-name="${phone.name}">
                     
                        <a href="#!/phones/${phone.id}"
                           data-show-details class="thumb">
                              <img alt="${phone.id}"
                               src="${phone.imageUrl}">
                        </a>
            
                        <div class="phones__btn-buy-wrapper">
                          <a data-add-to-bucket
                           class="btn btn-success">
                            Add
                          </a>
                        </div>
            
                        <a data-show-details
                         href="#!/phones/motorola-xoom-with-wi-fi">
                            ${phone.name}
                         </a>
                        <p>${phone.snippet} 
                  </li>
                `;
        }).join('')}
         </ul>   
`;
  }
}
