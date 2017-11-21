import axios from 'axios';

// current implementation is 'Implicit'
// 'Implicit authentication is disabled' will be enabled
// https://www.instagram.com/developer/authentication/
class InstagramApiClient
{
    constructor()
    {
        let clientId = '8e27855f9bac4b31b4bca71fde14bfe9';
        this.baseUrl = 'http://localhost:9999/';
        this.tokenUrl = 'https://api.instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + this.baseUrl + '&response_type=token';
    }

    getBaseUrl()
    {
        return this.baseUrl;
    }

    getTokenUrl()
    {
        return this.tokenUrl;
    }

    getToken()
    {
        let _this = this;
        _this.requestGet('get', _this.tokenUrl).then(
            function (response) {
                console.log(response.data);
                _this.token = response.data;
            }
        );
        return _this.token;
    }

    requestGet(method, url) {
        method = method.toLowerCase();
        let queryUrl = url;
        return axios[method](queryUrl, {});
    }

    // request(method, url, body, queryParameters, form, config) {
    //     method = method.toLowerCase();
    //     let keys = Object.keys(queryParameters);
    //     let queryUrl = url;
    //     if (keys.length > 0) {
    //         queryUrl = url + '?' + qs.stringify(queryParameters);
    //     }
    //     // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
    //     if (body) {
    //         return axios[method](queryUrl, body, config);
    //     } else if (method === 'get') {
    //         return axios[method](queryUrl, {
    //             params: form
    //         }, config);
    //     } else {
    //         return axios[method](queryUrl, qs.stringify(form), config);
    //     }
    // }
}

export default InstagramApiClient;