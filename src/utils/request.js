import axios from 'axios'

const VUE_APP_BASE_API = import.meta.env.VITE_BASE_URL

// create an axios instance
const service = axios.create({
    baseURL: VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 50000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        // if (store.getters.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        //   config.params = {
        //     token: getToken()
        //   }
        // }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        if (response.headers['content-type'] === 'application/octet-stream;charset=utf-8') {
            return response.data
        }
        // if the custom code is not 200, it is judged as an error.
        if (response.status === 200) {
            if (res && res.status === 1) {
                return res.data
            } else {
                return res
            }
        } else if (res.status !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 10000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 10000
        })
        return Promise.reject(error)
    }
)

export default service