

export class Services {

    baseUrl =  'https://65afb8db2f26c3f2139b9924.mockapi.io/phoneshoping';

    getList = () => {
        return axios ({
            url: this.baseUrl,
            method: 'GET',
        })
    }



}