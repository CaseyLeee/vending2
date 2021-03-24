import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { login_validate, commodifyAdd_validate, commodifyList_validate, deviceAdd_validate, deviceUpdate_validate, refundAdd_validate, deviceOpen_validate } from '@/utils/check'
import { Loading } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
var loadinginstace

// request interceptor
service.interceptors.request.use(

  config => {
    // do something before request is sent
    // element ui Loading方法
    try {//unuse
      var jscheck = {
        "/user/login": login_validate,
        "/backGround/commodify/add": commodifyAdd_validate,
        "/backGround/commodify/update": commodifyAdd_validate,
        "/backGround/commodify/list": commodifyList_validate,
        "/foreground/device/add": deviceAdd_validate,
        "/backGround/device/update": deviceUpdate_validate,
        "/backGround/refund/add": refundAdd_validate,
        "/foreground/device/comand": deviceOpen_validate,
      }

      let configca = config
      if (configca.data) {
        configca.url.replace('api', '').replace('vending', '')
      
        var objData = {};

        configca.data.forEach((value, key) => objData[key] = value);

        let strcfg = JSON.stringify(objData);
        let rs = jscheck[configca.url](strcfg);

      
        if (rs.code ==3) {
          
          Message({
            message: rs.date.fieldVal + rs.date.fieldMsg || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(rs.date.fieldMsg)
        }

      }
    } catch (error) {

    }


    loadinginstace = Loading.service({

      fullscreen: true
    })

    // console.log("loadinginstace", loadinginstace)
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['msToken'] = getToken()
    }
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
    loadinginstace.close()

    // if the custom code is not 20000, it is judged as an error.
    if (res.code != 1 && res.code != 20000) {

      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {

      return res
    }
  },
  error => {
    loadinginstace.close()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    if (error.message.indexOf("401") > 0) {

      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    }
    return Promise.reject(error)
  }
)

export default service
