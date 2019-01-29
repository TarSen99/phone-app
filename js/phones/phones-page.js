'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from "./components/shopping-cart.js";


export default class PhonesPage {
    constructor( {element}) {
        this._element = element;

        this.onAddToBucketButtonClicked = (phoneId, phoneName) => {
            this._shoppingCart.addNewItemToList(phoneId, phoneName);
        };

        this._render();
        this._initCatalog();
        this._initViewer();
        this._initShoppingCart();
    }

    _initShoppingCart() {
        this._shoppingCart = new ShoppingCart({
            element: this._element.querySelector('[data-element="shopping-cart"]'),
        });
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
            element: document.querySelector('[data-component="phone-viewer"]'),
        });

        this._viewer.subscribe(
            'back-button-clicked',
            () => {
                this._catalog.show();
                }
            );

        this._viewer.subscribe(
            'add-button-clicked',
            (phoneId, phoneName) => {
                this._shoppingCart.addNewItemToList(phoneId, phoneName);
            }
        );
    }

    _initCatalog() {
        this._catalog = new PhoneCatalog({
            element: document.querySelector('[data-component="phone-catalog"]'),
            phones : PhoneService.getAll(),
        });

        this._catalog.subscribe(
            'phone-selected',
            (phoneId) => {
                        const phoneDetails = PhoneService.
                            getById(phoneId);

                        this._catalog.hide();
                        this._viewer.show(phoneDetails);
            }
        );

        this._catalog.subscribe(
            'add-button-clicked',
            (phoneId, phoneName) => {
                this._shoppingCart.addNewItemToList(phoneId, phoneName);
            }
        );
    }

    _render() {
        this._element.innerHTML = `
        <div class="row">

      <!--Sidebar-->
      <div class="col-md-2">
          <section>
                  <p>
                    Search:
                    <input>
                  </p>
        
                  <p>
                    Sort by:
                    <select>
                      <option value="name">Alphabetical</option>
                      <option value="age">Newest</option>
                    </select>
                  </p>
                </section>
        
                <section>
                <div data-element="shopping-cart"></div>
            </section>
      </div>
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" hidden></div>
      </div>
    </div>`;
    };
}