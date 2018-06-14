import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-ff58b.firebaseio.com/'
});

export default instance;