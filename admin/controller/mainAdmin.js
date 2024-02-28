
console.log('test');

import { Products } from '../model/Products.js';
import { Services } from '../service/Services.js';


const getElement = (id) => document.getElementById(id);


const services = new Services();

const renderTable = (phoneList) => {
    
    let htmlContent = '';
    for(let i = 0; i < phoneList.length; i++){
        htmlContent += `
            <tr>
                <td>1000</td>
                <td>${phoneList[i].proName}</td>
                <td>${phoneList[i].proPrice}</td>
                <td>
                    <img style="width: 100px; height: 100px; object-fit: cover" class="img-fluid" src= ${phoneList[i].image} alt="this is a picture"/>
                </td>
                <td>${phoneList[i].description}</td>
                <td>${phoneList[i].proType}</td>
            </tr>
        `
    }
    getElement('tblDanhSachSP').innerHTML = htmlContent;
}

const layThongTinSanPham = () => {

    const proName = getElement('phoneName').value;
    const proPrice = getElement('price').value;
    const proScreen = getElement('screen').value;
    const backCamera = getElement('backCamera').value;
    const frontCamera = getElement('frontCamera').value;
    const image = getElement('image').value;
    const description = getElement('moTaSP').value;
    const proType = getElement('brand').value;


    const products = new Products(proName, proPrice, proScreen, backCamera, frontCamera, image, description, proType);

    return products;
}


getElement('btnThemSP').onclick = () => {
    console.log('thêm sản phẩm');

    getElement('modal-footer').innerHTML = `
        <button class="btn btn-success">ADD</button>
    `   
}

// lấy danh sách phone

const getPhoneList = () => {

    const promise = services.getList();

    promise 
        .then( (result) => {
            console.log('result: ', result);
            // console.log(result.data);
            renderTable(result.data);

        })
        .catch( (error) => {
            console.log('error: ', error);
        })
}

getPhoneList();



