
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

    checkRange = (value,ErrorID,limit,message) => {
        if(value > limit){
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


}