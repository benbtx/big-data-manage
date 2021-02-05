import axios from "axios";
import qs from "qs";
import auth from "./auth";
import { getBaseUrl } from "../common/utils";
import { MessageBox } from "element-ui";
import interceptor from './interceptor';

// // axios 配置
// axios.defaults.timeout = 5000;
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


const  request = axios.create({ baseURL: apiURL_sfk, headers: {'Content-Type': 'application/json'} });

const  request_data = axios.create({ baseURL: apiURL_sfk , headers: {'Content-Type': 'multipart/form-data'}});



// axios 配置
request.defaults.timeout = 5000;
// request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//request.defaults.baseURL = 'http://localhost:8008';
// request.defaults.baseURL = 'http://192.168.7.233:8081/';
// request.defaults.headers.post['Content-Type'] = 'application/json';
// multipart/form-data
// request_data.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// request.defaults.headers.post['Content-Type'] = 'application/json';

// axios.defaults.baseURL = getBaseUrl(window.location.href);
request.defaults.headers.common['authUid'] = auth.getUid();
request.defaults.headers.common['authSid'] = auth.getSid();

interceptor(request);
interceptor(request_data);




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



let http_sfk;

// export default http_sfk


export default
http_sfk = {

    axios: axios,
    request_data: request_data,


    //工作流  查询
    //workLine/getWorkLineByPage 分页查询工作流列表
    getWorkLineByPage: data => request({
        method: "GET",
        // url: '/elasticSearch/selectIkWords?value=' + data.value + '&id=' + data.id,
        url: '/workLine/getWorkLineByPage',
        params: data,
    }),

    //workLine/getWorkLineInfoById 根据id查询工作流模型
    getWorkLineInfoById: data => request({
        method: "GET",
        url: '/workLine/getWorkLineInfoById',
        params: data,
        showload: true
    }),


    
    //workLine/addWorkLineInfo 添加模型工作流

    addWorkLineInfo: data => request({
        url: '/workLine/addWorkLineInfo',
        method: 'post',
        data,
        showload: true
    }),
 

    //workLine/updateWorkLineInfo 更新工作流模型

    updateWorkLineInfo: data => request({
        url: '/workLine/updateWorkLineInfo',
        method: 'put',
        data,
        showload: true
    }),




    //operator/getCategoryOperator 按照分类获取算子信息
    getCategoryOperator: data => request({
        method: "GET",
        url: '/operator/getCategoryOperator',
        params: data,
        showload: true
    }),


    //operator/getOperatorKRParamListById 根据算子id查询算子参数列表信息
    getOperatorKRParamListById: data => request({
        method: "GET",
        url: '/operator/getOperatorKRParamListById',
        params: data,
    }),


    //workLine/uploadDataFile 使用获取文件数据算子先调用上传文件到HDFS文件系统
    uploadDataFile: data => request_data({
        url: '/workLine/uploadDataFile',
        method: 'post',
        data,
        // showload: true
    }),


    // /workLine/runWorkLine 训练模型接口

    runWorkLine: data => request({
        url: '/workLine/runWorkLine',
        method: 'post',
        params: data,
        // showload: true
    }),


    ///workLine/deleteWorkLineById  删除工作流列表

    deleteWorkLineById: data => request({
        url: '/workLine/deleteWorkLineById',
        method: 'DELETE',
        params: data,
        showload: true
    }),


    //workLine/getTrainingModelStatusById 训练模型状态及进度
    getTrainingModelStatusById: data => request({
        method: "GET",
        url: '/workLine/getTrainingModelStatusById',
        params: data,
        // showload: true
    }),


    
    //workLine/publishWorkLineById 发布工作流列表
    publishWorkLineById: data => request({
        url: '/workLine/publishWorkLineById',
        method: 'PUT',
        params: {id:data.id},
        data: data.publishParam,
        showload: true
    }),
    
    //workLine/getEvaluateResult 获取模型评估结果
    getEvaluateResult: data => request({
        method: "GET",
        url: '/workLine/getEvaluateResult',
        params: data,
        // showload: true
    }),

    //workLine/getOperatorPreviewData 预览算子数据
    getOperatorPreviewData: data => request({
        method: "GET",
        url: '/workLine/getOperatorPreviewData',
        params: data,
        // showload: true
    }),


    //workLine/getTrainResult 获取训练结果
    getTrainResult: data => request({
        method: "GET",
        url: '/workLine/getTrainResult',
        params: data,
        showload: true
    }),

    //workLine/exeWorkflow/{id} 发布应用工作流    url: '/ds/info/delete/' + data.id,
    exeWorkflow: (data) => request({
        method: "post",
        url: '/workLine/exeWorkflow/'+ data.id,
        // url: '/workLine/exeWorkflow/',
        // data:{sourceData:data.sourceData},
        data:data.sourceData,
        showload: true
    }),

    // exeWorkflow: data => request({
    //     url: '/workLine/exeWorkflow',
    //     method: 'post',
    //     data,
    //     showload: true
    // }),

    //modelService/getModelServiceListByPage  分页获取服务列表
    getModelServiceListByPage: data => request({
        method: "GET",
        url: '/modelService/getModelServiceListByPage',
        params: data,
    }),

























  






}