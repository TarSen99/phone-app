export default class ShoppingCart {
    constructor({element}) {
        this._element = element;
        this._bucketItems = [];
        this._render();

        this._list = this._element.querySelector('[data-bucket-list]');

        this._element.addEventListener('click', (e) => {this._removeItem(e)});
    }

    _removeItem(e) {
        if(!e.target.closest('.shopping-card-remove')) {
            return;
        }

        let CurrentListItem = e.target.closest('.shopping-card-item');

        let requirePosToRemove = this._findPositionOfCurrentIdInArray(
            CurrentListItem.dataset.itemId
        );

        this._bucketItems.splice(requirePosToRemove, 1);
        this._render();
    }

    _findPositionOfCurrentIdInArray(id) {
        for(let i = 0; i < this._bucketItems.length; i++) {
            if(this._bucketItems[i].id === id) {
                return i;
            }
        }

        return null;
    }

    addNewItemToList(itemId, itemName) {
        let itemArrayPosition = this._checkIfItemExist(itemId);

        if(itemArrayPosition === null) {
            this._bucketItems.push({
                id: itemId,
                name: itemName,
                count: 1
            });
        } else {
            this._bucketItems[itemArrayPosition].count++;
        }

        this._render();
    }

    _checkIfItemExist(itemId) {
        let itemsList = this._bucketItems;

        for(let i = 0; i < itemsList.length; i++) {
            if(itemsList[i].id === itemId) {
                return i;
            }
        }

        return null;
    }

    _render() {
        this._element.innerHTML = `
             <p>Shopping Cart</p>
              <ul data-bucket-list>
                ${this._bucketItems.map(listItem => {
                    return `
                    <li data-item-id="${listItem.id}" class="shopping-card-item">
                        ${listItem.name} 
                        <span class="shopping-card-count">
                            ${listItem.count}
                        </span>
                        <span class="shopping-card-remove">X</span>
                    </li>
                    `
        }).join('')}
              </ul>
        `;
    }
}