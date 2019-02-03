'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneFilter from './components/phone-filter.js';
import PhoneOrder from './components/phone-ordering.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();
    this._initPhoneFilter();
    this._initPhoneOrdering();
    this._initShoppingCart();
    this._initCatalog();
    this._initViewer();
  }

  _showPhones() {
    let searchSettings = {
      filterValue: this._phoneFilter.getFilterValue(),
      orderValue: this._phoneOrdering.getOrderValue()
    };

    this._catalog.show = this._catalog.show.bind(this._catalog);
    const PhonesListId = 'phones';

    PhoneService.loadDataFromServer(
      this._catalog._renderWhileLoading.bind(this._catalog),
      PhonesListId,
      this._catalog.show,
      searchSettings
    );
  }

  _initPhoneOrdering() {
    this._phoneOrdering = new PhoneOrder({
      element: this._element.querySelector('[data-component="phone-order"]')
    });

    this._phoneOrdering.subscribe('order-changed', () => {
      this._showPhones();
    });
  }

  _initPhoneFilter() {
    this._phoneFilter = new PhoneFilter({
      element: this._element.querySelector('[data-component="phone-filter"]')
    });

    this._phoneFilter.subscribe('input-enter', () => {
      this._showPhones();
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]')
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: document.querySelector('[data-component="phone-viewer"]')
    });

    this._viewer.subscribe('back-button-clicked', () => {
      this._showPhones();
    });

    this._viewer.subscribe('add-button-clicked', (phoneId, phoneName) => {
      this._shoppingCart.addNewItemToList(phoneId, phoneName);
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: document.querySelector('[data-component="phone-catalog"]')
    });

    this._catalog.subscribe('phone-selected', phoneId => {
      this._catalog.hide();

      PhoneService.loadDataFromServer(
        this._viewer._renderWhileLoading.bind(this._viewer),
        phoneId,
        this._viewer.show.bind(this._viewer)
      );
    });

    this._catalog.subscribe('add-button-clicked', (phoneId, phoneName) => {
      this._shoppingCart.addNewItemToList(phoneId, phoneName);
    });

    this._showPhones();
  }

  _render() {
    this._element.innerHTML = `
        <div class="row">
          <!--Sidebar-->
          <div class="col-md-2">
              <section>
                <div data-component="phone-filter"></div>
                <div data-component="phone-order"></div>
              </section>
            
              <section>
                <div data-component="shopping-cart"></div>
              </section>
          </div>
          <!--Main content-->
          <div class="col-md-10">
            <div data-component="phone-catalog"></div>
            <div data-component="phone-viewer" hidden></div>
          </div>
        </div>`;
  }
}
