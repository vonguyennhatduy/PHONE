
export class Products {
    constructor (name, price, screen, backCamera, frontCamera, img, desc, type){
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
        this.type = type;
    }

    mapBrand = () => {
        if(this.type == 'apple')
            return 'Iphone';
        else if(this.type == 'samsung'){
            return 'Samsung';
        }else return '';
    }

}