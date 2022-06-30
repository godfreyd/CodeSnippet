export type AnyObject = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: any;
};

export const customFetch = (url: string, _options: AnyObject = {}) => {
    const options = {
        ..._options,
        headers: {
            ..._options.headers,
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    };

    return fetch(url, options).then(resp => {
        if (resp.status === 200) {
            return resp.json();
        }
        return resp;
    });
};
