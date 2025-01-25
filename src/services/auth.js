const URL = 'https://link-management-backend.onrender.com';

export const signup = (data) => {
    return fetch(`${URL}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

export const login = (data) => {
    return fetch(`${URL}/api/user/login`, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    })
};

export const getUserDetails = (token) => {
    return fetch(`${URL}/api/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
} 