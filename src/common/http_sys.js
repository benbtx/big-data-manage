import axios from "axios";
import qs from "qs";
import auth from "./auth";
import { getBaseUrl } from "../common/utils";
import { MessageBox } from "element-ui";
import interceptor from './interceptor';

// // axios 配置
// axios.defaults.timeout = 5000;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// //axios.defaults.baseURL = 'http://localhost:8008';
// axios.defaults.baseURL = 'http://192.168.7.182:8089/';

// // axios.defaults.baseURL = getBaseUrl(window.location.href);
// axios.defaults.headers.common['authUid'] = auth.getUid();
// axios.defaults.headers.common['authSid'] = auth.getSid();

// let request = axios.create({ baseURL: 'http://192.168.7.182:8089/' });
// console.log(Vue.prototype.ApiUrl);
// let request = axios.create({ baseURL: 'http://192.168.7.239:8089/' });

// let request_data = axios.create({ baseURL: 'http://192.168.7.239:8089/' });


let request = axios.create({ baseURL: apiURL_sys });

let request_data = axios.create({ baseURL: apiURL_sys });



// axios 配置
request.defaults.timeout = 5000;
// request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//request.defaults.baseURL = 'http://localhost:8008';
// request.defaults.baseURL = 'http://192.168.7.233:8081/';
request.defaults.headers.post['Content-Type'] = 'application/json';
// multipart/form-data
request_data.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// 在实例已创建后修改默认值
// request.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("token");
// axios.defaults.baseURL = getBaseUrl(window.location.href);
request.defaults.headers.common['authUid'] = auth.getUid();
request.defaults.headers.common['Authorization'] = auth.getSid();

interceptor(request);




// //POST传参序列化
// request.interceptors.request.use((config) => {
//     if (config.method === 'post') {
//         // config.data = qs.stringify(config.data);
//     }
//     // if(config.showload)  设置全局加载 loading 
//     //   {
//     //     showFullScreenLoading();
//     //   }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// //返回状态判断
// request.interceptors.response.use(
//     response => {
//         if (response.data && response.data.code) {
//             if (response.data.code === '2001') {
//                 auth.logout()
//             }
//         }
//         return response;
//     },
//     error => {
//         if (error.response) {
//             //全局ajax错误信息提示
//             //MessageBox({type:"error",message:error.response.data,title:"温馨提示",});
//         }
//         //return Promise.reject(error);
//     });



let http_sys;

// export default http_sys


export default
http_sys = {

    axios: axios,
    request: request,
    request_data: request_data,

    ///sys/login 登录相关-登录
    Login: data => request({
        method: "POST",
        url: '/sys/login', 
        data,
        showload: true
    }),
    
    //sys/user/list 系统用户-所有用户列表
    getUserList: data => request({
        method: "POST",
        url: '/sys/user/list',
        data,
    }),
    //sys/user/info/{userId} 系统用户-用户信息
    getUserInfo: data => request({
        method: "GET",
        url: '/sys/user/info/'+data,
        // data,
    }),
    //sys/user/save 系统用户-保存用户
    addUser: data => request({
        method: "POST",
        url: '/sys/user/save',
        data,
        showload: true
    }),
    //sys/user/update 系统用户-修改用户
    updateUser: data => request({
        method: "POST",
        url: '/sys/user/update',
        data,
        showload: true
    }),
    //sys/user/delete 系统用户-删除用户
    deleteUser: data => request({
        method: "POST",
        url: '/sys/user/delete',
        data,
        showload: true
    }),

    

    //sys/role/list 系统角色-所有角色列表
    getRoleList: data => request({
        method: "POST",
        url: '/sys/role/list',
        data,
    }),
    //sys/role/info/{userId} 系统角色-角色信息
    getRoleInfo: data => request({
        method: "GET",
        url: '/sys/role/info/'+data,
        // data,
    }),
    //sys/role/save 系统角色-保存角色
    addRole: data => request({
        method: "POST",
        url: '/sys/role/save',
        data,
        showload: true
    }),
    //sys/role/update 系统角色-修改角色
    updateRole: data => request({
        method: "POST",
        url: '/sys/role/update',
        data,
        showload: true
    }),
    //sys/role/delete 系统角色-删除角色
    deleteRole: data => request({
        method: "POST",
        url: '/sys/role/delete',
        data,
        showload: true
    }),


    //sys/menu/getUserMenuList 系统菜单-用户获取授权的菜单列表
    getUserMenuList: data => request({
        method: "GET",
        url: '/sys/menu/getUserMenuList',
        data,
    }),

    //sys/menu/list 系统菜单-所有菜单列表
    getMenuList: data => request({
        method: "GET",
        url: '/sys/menu/list',
        data,
    }),
   






   





}