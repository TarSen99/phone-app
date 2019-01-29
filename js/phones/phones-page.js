'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import SideBar from './components/sidebar.js';


export default class PhonesPage {
    constructor( {element}) {
        this._element = element;

        this.onAddToBucketButtonClicked = (phoneId, phoneName) => {
            this._sideBar.addItemToShoppingCart(phoneId, phoneName);
        };

        this._render();

        this._sideBar = new SideBar({
            element: document.querySelector('[data-component="sidebar"]')}
            );

        this._catalog = new PhoneCatalog({
            element: document.querySelector('[data-component="phone-catalog"]'),
            phones : PhoneService.getAll(),

            onPhoneSelected: (phoneId) => {
                const phoneDetails = PhoneService.getById(phoneId);

                this._catalog.hide();
                this._viewer.show(phoneDetails);
            },

            onAddButtonClicked: this.onAddToBucketButtonClicked

        });

        this._viewer = new PhoneViewer({
            element: document.querySelector('[data-component="phone-viewer"]'),

            onViewerHide: () => {
                this._catalog.show();
            },

            onAddButtonClicked: this.onAddToBucketButtonClicked
        });
    }

    _render() {
        this._element.innerHTML = `
        <div class="row">

      <!--Sidebar-->
      <div class="col-md-2">
          <div data-component="sidebar"></div>
      </div>
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" hidden></div>
      </div>
    </div>`;
    };
}