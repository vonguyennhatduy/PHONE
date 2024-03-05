
console.log('test');

import { Products } from '../model/Products.js';
import { Services } from '../service/Services.js';
import { Validation } from '../service/Validation.js';


const getElement = (id) => document.getElementById(id);


const services = new Services();
const validation = new Validation();

const renderTable = (phoneList) => {
    
    let htmlContent = '';
    for(let i = 0; i < phoneList.length; i++){
        htmlContent += `
            <tr>
                <td class="text-white">${i + 1}</td>
                <td class="text-white">${phoneList[i].name}</td>
                <td class="text-white">${phoneList[i].price}</td>
                <td>
                    <img style="width: 100px; height: 100px; object-fit: cover" class="img-fluid" src= '${phoneList[i].img}' alt="this is a picture"/>
                </td>
                <td class="text-white">${phoneList[i].desc}</td>
                <td class="text-white">${phoneList[i].type}</td>
                <td>
                    <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="editPhoneElement(${phoneList[i].id})">EDIT</button>
                    <button class="btn btn-danger" onclick="deletePhoneElement(${phoneList[i].id})">DELETE</button>
                </td>
            </tr>
        `
    }
    // getElement('tblDanhSachSP').innerHTML = htmlContent;
    document.getElementById('tblDanhSachSP').innerHTML = htmlContent;
}

const layThongTinSanPham = () => {

    let isValid = true;
    const elements = document.querySelectorAll(
        '#modal-content input, #modal-content select, #modal-content textarea'
    )

    let data = {};
    elements.forEach((element) => {
        const {name, value} = element;

        data[name] = value;
    })

    isValid &= validation.checkEmpty(data.name,'validateName','Vui lòng không để trống')
    && validation.checkPhoneName(data.name,'validateName','Sản phẩm phải là Samsung hoặc Iphone');

    isValid &= validation.checkEmpty(data.price,'validatePrice','Vui lòng không để trống') 
    && validation.checkPattern(data.price,'validatePrice',/^\d+$/,'Giá sản phẩm phải là số');

    isValid &= validation.checkEmpty(data.screen,'validateScreen','Vui lòng không để trống');

    isValid &= validation.checkEmpty(data.backCamera,'validateBackCamera','Vui lòng không để trống');

    isValid &= validation.checkEmpty(data.frontCamera,'validateFrontCamera','Vui lòng không để trống');

    isValid &= validation.checkEmpty(data.img,'validateImg','Vui lòng không để trống')

    isValid &= validation.checkEmpty(data.type,'validateBrand','Vui lòng không để trống')
    && validation.checkType(data.type,'validateBrand','Sản phẩm phải là Samsung hoặc Iphone')
    && validation.checkPhoneType(data.name,data.type,'validateBrand','Brand không khớp với tên sản phẩm');

    isValid &= validation.checkEmpty(data.desc,'validateDesc','Vui lòng không để trống');


    if(!isValid){
        return null;
    }


    console.log(
        data.name,data.price,data.screen,data.backCamera,data.frontCamera,data.img,data.desc,data.type
    );

    const products = new Products(data.name,data.price,data.screen,data.backCamera,data.frontCamera,data.img,data.desc,data.type);

    return products;
}


getElement('btnThemSP').onclick = () => {
    console.log('thêm sản phẩm');
    getElement('modal-footer').innerHTML = `
        <button class="btn btn-success" onclick="addPhone()">
            ADD
        </button>
    `
}

// lấy danh sách phone

const getPhoneList = () => {
    const promise = services.getList();

    promise 
        .then( (result) => {
            // console.log('result: ', result);
            // console.log(result.data);
            renderTable(result.data);

        })
        .catch( (error) => {
            console.log('error: ', error);
        })
}

getPhoneList();

// thêm sản phẩm 

window.addPhone = () => {
    const products = layThongTinSanPham();

    if(products){

        const promise = services.addPhoneList({
            ...products,
            type: products.mapBrand()
        });

        promise
            .then((result) => {
                // console.log(result);
                getPhoneList();
            })
            .catch((error) => {
                console.log('error: ', error);
            })
    }
}

// xóa sản phẩm 

window.deletePhoneElement = (phoneID) => {

    console.log(phoneID);

    const promise = services.deletePhone(phoneID);

    promise 
        .then((result) => {
            getPhoneList();
        })
        .catch((error) => {
            console.log('error: ', error);
        })
}

// cập nhật sản phẩm 

// hiển thị lại thông tin sản phẩm cần edit lên lại form
window.editPhoneElement = (phoneID) => {
    console.log(phoneID);

    getElement('btnUpdate').setAttribute('data-id',phoneID);
    
    const promise = services.getPhoneDetailByID(phoneID);

    promise 

        .then((result) => {
            console.log(result);

            const { data }  = result;
            getElement('phoneName').value = data.name;
            getElement('price').value = data.price;
            getElement('screen').value = data.screen;
            getElement('backCamera').value = data.backCamera;
            getElement('frontCamera').value = data.frontCamera;
            getElement('image').value = data.img;
            getElement('moTaSP').value = data.desc;
            getElement('brand').value = data.type === 'Samsung' ? 'samsung' : 'apple';
            
        })

        .catch((error) => {
            console.log('error: ', error);
        })
}

// cập nhật sản phẩm 

getElement('btnUpdate').onclick = () =>  {
    const products = layThongTinSanPham();

    console.log(products);
    const phoneID = getElement('btnUpdate').getAttribute('data-id');

    const promise = services.updatePhone(phoneID,{
        ...products,
        type: products.mapBrand()
    })

    promise
        .then((result) => {
            getPhoneList();
        })

        .catch((error) => {
            console.log('error: ',error);
        })
}

// tìm kiếm sản phẩm theo tên 

getElement('searchName').onkeyup = () => {
    
    let searchName = getElement('searchName').value;
    searchName = searchName.toLowerCase();
    const promise = services.getList();

    promise 

        .then((result) => {
            let newData = [];
            console.log(result);
            for(let i = 0; i < result.data.length; i++){
                let phoneDetails = result.data[i];
                let phoneName = phoneDetails.name;
                phoneName = phoneName.toLowerCase();
                if(phoneName.indexOf(searchName) !== -1){
                    newData.push(phoneDetails);
                }
            }
            renderTable(newData);
        })
        .catch((error) => {
            console.log('error: ',error);
        })
}

// sắp xếp từ nhỏ đến lớn và ngược lại theo giá tiền 
getElement('btnSort').onclick = () => {
    const condition = getElement('sortList').value;
    console.log(condition);

    const promise = services.getList();

    promise 
        .then((result) => {
           if(condition === 'inc'){
                result.data.sort((a,b) => a.price - b.price);

                renderTable(result.data);
           }else if(condition === 'dec'){
                result.data.sort((a,b) => b.price - a.price);

                renderTable(result.data);
           }else renderTable(result.data);

        })

        .catch((error) => {
            console.log('error: ',error);
        })
}












