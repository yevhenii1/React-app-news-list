import * as axios from 'axios'
const token = localStorage.getItem('token')

const options = {

}

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    headers: {
        'content-type': 'application/json',
        'charset': 'utf-8',
        'x-access-token': token,
    },
})

export const newsAPI = {
    getNews(){
        return instance.get(`feeds`)
    },
    addNewsData(title, content, token) {
        return instance.post(`feeds`, {title, content, token})
    },
    deleteNewsById(id, token) {
        return instance.delete(`feeds/${id}`, token)
    },
    getNewsById(id) {
        return instance.get(`feeds/${id}`)
    },
    editNewsById(id, token,  data) {
        return axios({
            method: 'put',
            url: 'http://localhost:5000/api/v1/feeds/' + id,
            data: data,
            headers: {
                'content-type': 'application/json',
                'charset': 'utf-8',
                'x-access-token': token,
            }
        })
    }
}

export const authAPI = {
    authWithG(token){
        return instance.post(`auth/google`, {token: token})
    },

    signUp(data){
        return  axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/users',
            data: {
                "username": data.username,
                "password": data.password,
                "g-recaptcha-response": data.recaptcha,
            },
            headers: {
                'content-type': 'application/json',
                'charset': 'utf-8',
            },
        })
    },
    logIn(data) {
        return axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/auth',
            data: {
                "username": data.username,
                "password": data.password,
            },
        })
    },
    logInId(id, token) {
        return axios({
            method: 'get',
            url: 'http://localhost:5000/api/v1/users/' + id,
            headers: {
                'content-type': 'application/json',
                'charset': 'utf-8',
                'x-access-token': token,
            },
        })
    }
}