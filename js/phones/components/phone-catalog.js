"use strict";

import Component from './../../component.js';

export default class PhoneCatalog extends Component{
  constructor({ element, phones = [], onPhoneSelected = () => {} }) {
    super({ element });

    this._phones = phones;
    this._showPhoneDetails = onPhoneSelected;

    this._element.addEventListener("click", event => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      if (!phoneElement) {
        return;
      }

      this._showPhoneDetails(phoneElement.dataset.elementId);
    });

    this._render();
  }

  _render() {
    this._element.innerHTML = `
        <ul class="phones">
            ${this._phones
              .map(phone => {
                return `
                  <li class="thumbnail" data-element="phone" data-element-id="${
                    phone.id
                  }">
                        <a href="#!/phones/${phone.id}" class="thumb">
                          <img alt="${phone.id}" src="${phone.imageUrl}">
                        </a>
            
                        <div class="phones__btn-buy-wrapper">
                          <a class="btn btn-success">
                            Add
                          </a>
                        </div>
            
                        <a href="#!/phones/motorola-xoom-with-wi-fi">${
                          phone.name
                        }</a>
                        <p>${phone.snippet} 
                   </li>
                `;
              })
              .join("")}
         </ul>   
`;
  }
}
