import { redirect } from 'react-router-dom';

// working out duration since login 
export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    
    return duration;
}
export const getAuthToken = () => {
    const token = localStorage.getItem('token');


    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED'
    }

    return token;
}

export const tokenLoader = () => {
    console.log(getAuthToken());
    return getAuthToken();
}

// loader function that helps protect the routes access !
export const checkAuthTokenLoader = () => {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }
    // loader functions do not work as intended when you return undefined as result so therefor you must return null as final result when you want nothing to happen after as result. 
    return null
}