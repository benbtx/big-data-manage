import axios from "axios";
import qs from "qs";
import auth from "./auth";
import { getBaseUrl } from "./utils";
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


let request = axios.create({ baseURL: apiURL_ksh });

let request_data = axios.create({ baseURL: apiURL_ksh });



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



let http_ksh;

// export default http_ksh


export default
http_ksh = {

    axios: axios,
    request: request,
    request_data: request_data,

     // 获取发布列表
    getReportList: data => request({
        method: "POST",
        url: '/api/zhjd/bi/manageReport/report/manageList', 
        data,
        showload: true
    }),
    
    //sys/user/list 系统用户-所有用户列表
    reportAuth: data => request({
        method: "POST",
        url: '/api/zhjd/bi/manageReport/report/auth',
        data,
    }),
    // manageReport/report/delete 删除报表
    reportDelete: data => request({
        method: "POST",
        url: '/api/zhjd/bi/manageReport/report/delete',
        data,
        showload: true
    }),
    // manageReport/report/enbale 启用报表
    reportEnable: data => request({
        method: "POST",
        url: '/api/zhjd/bi/manageReport/report/enbale',
        data,
        showload: true
    }),
    // manageReport/report/check 检查报表状态
    reportCheck: data => request({
        method: "POST",
        url: '/api/zhjd/bi/manageReport/report/check',
        data,
        showload: true
    }),
    // manageReport/report/viewList 报表查看-查询报表
    reportViewList: data => request({
        method: "POST",
        url: '/api/zhjd/bi/manageReport/report/viewList',
        data,
        showload: true
    }),

    

    // api/zhjd/bi/manageReport/report/preview 预览报表 记录 日志
    setPreviewLog: data => request({
        method: "POST",
        url: '/api/zhjd/bi/manageReport/report/preview',
        data,
    }),
    // 获取角色
    getRole: data => request({
        method: "GET",
        url: '/api/zhjd/bi/manageReport/report/listRole',
        data,
    }),
    //sys/role/save 系统角色-保存角色
    getUser: data => request({
        method: "GET",
        url: '/api/zhjd/bi/manageReport/report/listUser',
        data,
        // showload: true
    }),
    //获取报表地址/api/zhjd/bi/manageReport/report/getReportServerAddress
    getReportServerAddress: data => request({
        method: "GET",
        url: '/api/zhjd/bi/manageReport/report/getReportServerAddress',
        data,
        // showload: true
    }),

  






   





}