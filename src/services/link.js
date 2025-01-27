const URL = 'https://link-management-backend.onrender.com';
// const URL = 'http://localhost:8000';

export const shorten = (data, token) => {
    return fetch(`${URL}/api/links/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data),
    });
};

export const getDashboardLinkDetails = (token) => {
    return fetch(`${URL}/api/links/dashboard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
};

export const getLinks = (sortConfig, page, token) => {

    return fetch(`${URL}/api/links/linksPage?sortBy=${sortConfig.sortBy}&order=${sortConfig.order}&page=${page}&limit=10`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
}

export const updateLinks = (id, data, token) => {
    return fetch(`${URL}/api/links/edit/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data),
    })
}

export const getLinkDetails = (id, token) => {
    return fetch(`${URL}/api/links/getLinkDetails/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
}