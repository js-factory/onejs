/**
 * **************************************
 * ************* fetch.js **************
 * **************************************
 *
 * A light weight async library based on fetch API.
 */

// Defining Constants
const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded; charset=UTF-8';
const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_HTML = 'text/html';
const HTTP_METHOD_POST = 'POST';
const HTTP_HEADER_CONTENT_TYPE = 'Content-Type';

const httpHeaderMap = {
    CONTENT_TYPE_FORM,
    CONTENT_TYPE_JSON,
    CONTENT_TYPE_HTML
};

const euri = encodeURIComponent;

/**
 * @description joins strings key & value by '=' i.e. key=value
 * <br /> Mostly used to create query params e.g. http://www.example.com/test?key=value
 *
 * @param  {String} key query param key
 * @param  {String} val query param value
 * @return {String} {key=value} output string
 */
function getQueryParam(key, val) {
    const queryParam = `${euri(key)}=${euri(val)}`;
    return queryParam;
}

/**
 * @description Add additional parameter to differential ajax request from
 * <br /> typical web url based request
 *
 * @param {string} url
 * @returns {string} newUrl
 */
const cacheBust = (url) => {
    const cacheBuster = 'js_fch=1';
    const connector = url.indexOf('?') === -1 ? '?' : '&';
    const newUrl = `${url}${connector}${cacheBuster}`;

    return newUrl;
}
/**
 * @description converts an object to query params
 *
 * @param {object} payload an object to be converted into query param
 * @param {string} key key name above converted params to be assigned to
 * @returns
 */
function serializeObj(payload, key) {
    const params = [];
    Object.keys(payload).forEach((prop) => {
        const k = key ? `${key}[${prop}]` : prop;
        const v = payload[prop];
        if (typeof v === 'object') {
            params.push(serializeObj(v, k));
        } else {
            params.push(getQueryParam(k, v));
        }
    });
    return params.join('&');
}

/**
 * @description serialize payload
 * @param  {Object} payload data to be serialized into query string
 * @return {String} params  serialize object
 */
function serialize(payload) {
    if (typeof payload === 'string') {
        return payload;
    }
    return serializeObj(payload);
}

/**
 * @description provide a simple mapping of request and response headers
 * @param {string} type
 * @returns {string}
 */
function getContentHeader(type = 'JSON') {
    const typeConstant = type.toUpperCase();
    const contentType = `CONTENT_TYPE_${typeConstant}`;

    return httpHeaderMap[contentType];
}


/**
 * @description get json from server
 *
 * @param {string} url request url to be sent to server
 * @returns {object} an promise
 */
function getJson(url) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'x-jabong-response': 'json'
    });
    const reqUrl = cacheBust(url);
    const request = new Request(
        reqUrl,
        {
            headers,
            credentials: 'include'
        }
    );
    return fetch(request).then(response => response.json());
}

/**
 * @description post data to the server
 * @param {string} url url
 * @param {object} options request options
 * @returns {json} response json format response
 */
function post(url, options) {
    const httpHeader = getContentHeader('form');
    const reqOptions = {
        credentials: 'include',
        method: HTTP_METHOD_POST,
        headers: {
            [HTTP_HEADER_CONTENT_TYPE]: httpHeader
        },
        body: serialize(options)
    };
    if (typeof options.body === 'object') {
        reqOptions.body = serialize(options.body);
    }
    return fetch(url, reqOptions).then(response => response.json());
}

export default function request({
    type = 'get',
    url,
    options
}) {
    if (type === 'post') {
        return post(url, options);
    }
    return getJson(url);
};
