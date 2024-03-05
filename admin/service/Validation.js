
export class Validation {

    checkEmpty = (value,ErrorID,message) => {
        let newValue = value.replace(/\s+/g, ''); // bỏ tất cả khoảng trống trong user input
        if(newValue === ''){
            document.getElementById(ErrorID).innerHTML = message;
            return false;
        }

        document.getElementById(ErrorID).innerHTML = '';
        return true;
    }

    checkPhoneName = (value,ErrorID,message) => {
        let newValue = value.toLowerCase();
        if(/samsung/i.test(newValue) || /iphone/i.test(newValue)){
            document.getElementById(ErrorID).innerHTML = '';
            return true;
        }
        document.getElementById(ErrorID).innerHTML = message;
        return false;
    }

    checkType = (value,ErrorID,message) => {
        let lowerValue = value.toLowerCase();
        if(lowerValue !== 'apple' && lowerValue !== 'samsung'){
            document.getElementById(ErrorID).innerHTML = message;
            return false;
        }
        document.getElementById(ErrorID).innerHTML = '';
        return true;
    }

    checkPattern = (value,ErrorID,pattern,message) => {
        if(pattern.test(value)){
            document.getElementById(ErrorID).innerHTML = '';
            return true;
        }
        document.getElementById(ErrorID).innerHTML = message;
        return false;
    }

    checkPhoneType = (val1,val2,ErrorID,message) => {
        let Name = val1.toLowerCase();
        let Brand = val2;
        if((/samsung/i.test(Name) && Brand === 'samsung') || (/iphone/i.test(Name) && Brand === 'apple')){
            document.getElementById(ErrorID).innerHTML = '';
            return true;
        }
        document.getElementById(ErrorID).innerHTML = message;
        return false;
    }

}