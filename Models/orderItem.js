class OrderItem {
    constructor(itemData) {
        this.name = itemData.name;
        this.quantity = itemData.quantity;
        this.price = itemData.price;
    }

    static fromJSON(json) {
        const itemData = JSON.parse(json);
        return new OrderItem(itemData);
    }

    toJSON() {
        return JSON.stringify({
            name: this.name,
            quantity: this.quantity,
            price: this.price
        });
    }
}

module.exports = OrderItem;
