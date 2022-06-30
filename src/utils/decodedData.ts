export const decodedData = (str: string) =>
    decodeURIComponent(
        atob(str)
            .split('')
            .map(function (c) {
                return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
            })
            .join(''),
    );
