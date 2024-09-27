import { redirect } from 'react-router-dom';
export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token;
}

export const tokenLoader = () => {
    return getAuthToken();
}

// loader function that helps protect the routes access !
export const checkAuthTokenLoader = () => {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }
}