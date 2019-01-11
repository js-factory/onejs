import request from './fetch';

// const middleware = (req, res, getState) => {
//     if (!url) {
//         return res;
//     }
//     const { actionConfig: { type, url }, payload } = req;
//     const { _csrf = '' } = getState();
//     const finalReqUrl = typeof url === 'function' ? url(payload) : url;
//     return request({
//         type: requestType,
//         url: finalReqUrl,
//         options: {
//             _csrf,
//             ...payload
//         }
//     })
//         .then(json => json);
// };

// export default middleware;

export default function middleware() {
    return getState => (req, next) => (data = {}) => {
        const { actionConfig: { type = 'get', url } } = req;
        console.log('req', data);
        if (!url) {
            return next(data);
        }

        const { _csrf = '' } = getState();
        const finalReqUrl = typeof url === 'function' ? url(data) : url;
        return request({
            type,
            url: finalReqUrl,
            options: {
                _csrf,
                ...data
            }
        })
            .then(json => next(json));
    }
}
