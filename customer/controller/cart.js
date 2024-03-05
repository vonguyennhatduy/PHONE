

import { Services2 } from "../services/Services2.js";
import { Products2 } from "../model/Products2.js";

const services = new Services2();
const products = new Products2();

let basket = JSON.parse(localStorage.getItem("data")) || [];

const getElement = (id) => document.getElementById(id);

window.calculation = () => {
    let cartIcon = basket.map((x) => x.item).reduce((x,y) => x + y,0);
    getElement('cartAmount').innerHTML = cartIcon;
};

calculation();

const generateCartItems = (result) => {
    if(basket.length !== 0){
        return (getElement('shopping-cart').innerHTML = basket.map((x) => {
            let {id,item} = x;
            let search = result.find((y) => y.id * 1 === id) || [];
            return `
                <div class="cartBill">
                    <img class="imgCartItems" src="${search.img}">
                    <div class="detailsInfo">
                        <div class="name-price-x">
                            <div class="nameProduct">${search.name}</div>
                            <div class="priceProduct">$${search.price}</div>
                            <i class="fa-solid fa-x" onclick="removeItem(${search.id})"></i>
                        </div>
                        <div class="buttonsCart">
                            <i class="fa-solid fa-minus" onclick="decrement(${id})"></i>
                            <div class="amount px-2 fs-2" id="${id}">
                                ${item}
                            </div>
                            <i class="fa-solid fa-plus" onclick="increment(${id})"></i>
                        </div>
                        <h3 class="totalOfOnePro"><span style="color:yellow;">$</span>${item * search.price}</h3>
                    </div>
                </div>
            `
        })
        .join(""));
    }else {
        
        getElement('shopping-cart').innerHTML = '';
        getElement('label').innerHTML = `
            <h4 class="mt-5">Cart is Empty</h4>

            <a href="customer.html">
                <button class="btnHome mt-3">Back to Customer Page</button>
            </a>
        `
    }
}

window.getCartItems = () => {
    const promise = services.getListCart();

    promise 
        .then((result) => {
            generateCartItems(result.data);
        })

        .catch((error) => {
            console.log('error: ',error);
        })
}

getCartItems();

window.increment = (id) => {
    let selectedProduct = id;
    let search = basket.find((x)=> x.id === selectedProduct);

    if(search === undefined){
        basket.push({
            id: selectedProduct,
            item: 1,
        });
    }
    else search.item += 1;

    // console.log(basket);
    getCartItems();
    totalBill();
    updateAmountItem(selectedProduct);
    localStorage.setItem("data",JSON.stringify(basket));
};

window.decrement = (id) => {
    let selectedProduct = id;
    let search = basket.find((x)=> x.id === selectedProduct);

    if(search === undefined) return ;
    else if(search.item === 0) return;
    else search.item -= 1;

    // console.log(basket);
    updateAmountItem(selectedProduct);
    basket = basket.filter((x) => x.item !== 0);
    getCartItems();
    totalBill();
    localStorage.setItem("data",JSON.stringify(basket));
};

window.updateAmountItem = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    getElement(id).innerHTML = search.item;
    calculation();
};

window.removeItem = (id) => {
    let index = id * 1;
    basket = basket.filter((x) => x.id !== index);
    
    getCartItems();
    calculation();
    totalBill();
    localStorage.setItem("data",JSON.stringify(basket));
}

window.totalBill = () => {
    if(basket.length !== 0){
        const promise = services.getListCart();

        promise 
            .then((result) => {
                let amount = basket.map((x) => {
                    let search = result.data.find((y) => y.id * 1 === x.id);
                    return (x.item * search.price);
                }).reduce((x,y) => x + y,0);

                getElement('label').innerHTML = `
                    <h2 class="mt-5">Total Bill: ${amount}</h2>
                    
                    <button class="btn btn-info" onclick="payment()">Buy Now</button>
                    
                    <button class="btn btn-success" onclick="clearCart()">Clear Cart</button>
                `;
            })
            .catch((error) => {
                console.log('error: ',error);
            })
    }else return;
}

totalBill();

window.clearCart = () => {
    basket = [];
    getCartItems();
    calculation();
    totalBill();
    localStorage.setItem("data",JSON.stringify(basket));
}


window.payment = () => {
    getElement('shopping-cart').innerHTML = '';
    getElement('label').innerHTML = '';
    
    const promise = services.getListCart();

        promise 
            .then((result) => {
                let amount = basket.map((x) => {
                    let search = result.data.find((y) => y.id * 1 === x.id);
                    return (x.item * search.price);
                }).reduce((x,y) => x + y,0);

                getElement('Payment').innerHTML = `
                    <h3>Total amount to be paid: <span style="color: yellow">$</span>${amount}</h3>
                    <button class="btn btn-danger" onclick="order()">OKAY</button>
                `
                calculation();
            })
            .catch((error) => {
                console.log('error: ',error);
            })
}

window.order = () => {
    getElement('shopping-cart').innerHTML = '';
    getElement('label').innerHTML = '';
    getElement('Payment').innerHTML = '';
    basket = [];
    localStorage.setItem("data",JSON.stringify(basket));
    calculation();
    getElement('successPayment').innerHTML = `
        <h3>Thanks for shopping with us</h3>
        <a href="customer.html">
            <button class="btn btn-info">continue</button>
        </a>
    `
}




