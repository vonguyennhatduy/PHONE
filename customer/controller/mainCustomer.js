
// console.log('tesst');

import { Services2 } from "../services/Services2.js";
import { Products2 } from "../model/Products2.js";

const services = new Services2();
const products = new Products2();

const getElement = (id) => document.getElementById(id);
// 
let basket = JSON.parse(localStorage.getItem("data")) || [];

const renderTable = (result) => {
    return (getElement('shop').innerHTML = result.map((x) => {
        return `
            <div class="container">
                <div class="row">
                    <div class="col mx-3 mt-5" width="100%">
                        <div class="item">
                            <img class="img-fluid" src="${x.img}" alt="">
                            <div class="details text-white mt-2">
                                <h3 class="px-2 fs-3">${x.name}</h3>
                                <p class="px-2">${x.desc}</p>
                                <div class="price-quantity">
                                    <h6 class="mr-2 pt-2"><span style="color:yellow;">$</span>${x.price}</h6>
                                    <div class="buttons px-1">
                                        <i class="fa-solid fa-minus" onclick="decrement(${x.id})"></i>
                                        <div class="quantity px-2 fs-2" id="${x.id}">
                                            ${x.item === undefined ? 0 : x.item}
                                        </div>
                                        <i class="fa-solid fa-plus" onclick="increment(${x.id})"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    .join(""))
}

window.getProductsList = () => {
    const promise = services.getListCart();

    promise 
        .then((result) => {
            let stored = JSON.parse(localStorage.getItem("data"));
            if(stored){
                for(let i = 0; i < result.data.length; i++){
                        let checkID = result.data[i].id * 1;
                        // console.log('tren: ',checkID);
                        for(let j = 0; j < stored.length; j++){
                            console.log(stored[j].id);
                            if(stored[j].id === checkID){
                                result.data[i].item = stored[j].item;
                            }
                        }
                }
            }

           renderTable(result.data)
            
        })

        .catch((error) => {
            console.log('error: ',error);
        })
}

getProductsList();

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
    localStorage.setItem("data",JSON.stringify(basket));
};

window.updateAmountItem = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    getElement(id).innerHTML = search.item;
    calculation();
};

window.calculation = () => {
    let cartIcon = basket.map((x) => x.item).reduce((x,y) => x + y,0);
    getElement('cartAmount').innerHTML = cartIcon;
};

calculation();
