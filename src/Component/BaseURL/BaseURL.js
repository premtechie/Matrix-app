import axios from 'axios';


export default axios.create({
    baseURL:'https://calculator-5c4a0.firebaseio.com/'
})