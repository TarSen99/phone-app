import ShoppingCart from "./sidebar/shopping-cart.js";

export default class SideBar {
    constructor({element}) {
        this._element = element;

        this._render();

        this._shoppingCart = new ShoppingCart({
           element: this._element.querySelector('[data-element="shopping-cart"]')
        });
    }

    addItemToShoppingCart(phoneId, phoneName) {
        this._shoppingCart.addNewItemToList(phoneId, phoneName);
    }

    _render() {
        this._element.innerHTML = `
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
        `;
    }

}