/**
 * Wrapper for post call.
 * @param url
 * @param data
 * @returns {Promise<object|string|Error>}
 */
export const put = (url, data) => {
    return fetch(url, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            // It looks like we can simplify this.
            // But it will not pass tests because fetch.mockResponse() doesn't return contentType
            if (!res.ok) {
                const contentType = res.headers.get('content-type');
                if (
                    contentType &&
                    contentType.toLowerCase().includes('application/json')
                ) {
                    return res.json();
                }

                return Promise.reject(res.statusText);
            }

            return res.json();
        })
        .then(res => {
            switch (res.status) {
                case 'success':
                    return Promise.resolve(res.data);
                case 'fail':
                    return Promise.reject(res.data);
                case 'error':
                    return Promise.reject(res.message);
                default:
                    return Promise.reject(
                        new Error('Unsupported response type')
                    );
            }
        });
};

/**
 * Wrapper for post call.
 * @param url
 * @param data
 * @returns {Promise<object|string|Error>}
 */
export const post = (url, data) => {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            // It looks like we can simplify this.
            // But it will not pass tests because fetch.mockResponse() doesn't return contentType
            if (!res.ok) {
                const contentType = res.headers.get('content-type');
                if (
                    contentType &&
                    contentType.toLowerCase().includes('application/json')
                ) {
                    return res.json();
                }

                return Promise.reject(res.statusText);
            }

            return res.json();
        })
        .then(res => {
            switch (res.status) {
                case 'success':
                    return Promise.resolve(res.data);
                case 'fail':
                    return Promise.reject(res.data);
                case 'error':
                    return Promise.reject(res.message);
                default:
                    return Promise.reject(
                        new Error('Unsupported response type')
                    );
            }
        });
};

/**
 * Wrapper for get call.
 * @param url
 * @param data
 * @returns {Promise<object|string|Error>}
 */
export const get = (url, data) => {
    let query = '';

    if (data) {
        query = `?${new URLSearchParams(data)}`;
    }

    return fetch(url + query, {
        method: 'GET',
        credentials: 'same-origin'
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }

            return res.json();
        })
        .then(res => (typeof res === 'string' ? JSON.parse(res) : res))
        .then(res => {
            switch (res.status) {
                case 'success':
                    return Promise.resolve(res.data);
                case 'fail':
                    return Promise.reject(res.data);
                case 'error':
                    return Promise.reject(res.message);
                default:
                    return Promise.reject(
                        new Error('Unsupported response type')
                    );
            }
        });
};
