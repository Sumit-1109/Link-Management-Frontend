const URL = 'https://link-management-backend.onrender.com';

export const shorten = (data, token) => {
    return fetch(`${URL}/api/links/shorten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data),
    });
};