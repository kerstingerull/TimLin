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

    getToken(route)
    {
        let replaceString = '#access_token=';
        let hash = route.hash;
        let token = '';
        if (hash !== '') {
            let index = hash.search(replaceString);
            if (index === 0) {
                token = hash.replace(replaceString, '');
            }
        }
        return token;
    }

    getTimeLine(token, callback)
    {
        let postsUrl =  'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token;
        this.requestGet('get', postsUrl).then(callback);
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