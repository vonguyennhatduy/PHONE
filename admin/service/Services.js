
export class Services {

    baseUrl =  'https://65afb8db2f26c3f2139b9924.mockapi.io/phoneshoping';

    getList = () => {
        return axios ({
            url: this.baseUrl,
            method: 'GET',
        })
    }

    addPhoneList = (payload) => {
        return axios ({
            url: this.baseUrl,
            method: 'POST',
            data: payload,
        })
    }

    deletePhone = (phoneID) => {
        return axios ({
            url: `${this.baseUrl}/${phoneID}`,
            method: 'DELETE',
        })
    }

    getPhoneDetailByID = (phoneID) => {
        return axios ({
            url: `${this.baseUrl}/${phoneID}`,
            method: 'GET',
        })
    }

    updatePhone = (phoneID,payload) => {
        return axios ({
            url: `${this.baseUrl}/${phoneID}`,
            method: 'PUT',
            data: payload,
        })
    }

}