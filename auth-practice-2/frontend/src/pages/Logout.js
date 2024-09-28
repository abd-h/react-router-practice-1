import { redirect } from 'react-router-dom';

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');

    return redirect('/')
}