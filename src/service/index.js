/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/*
 *  接口请求封装
 * @Author: nowThen
 * @Date: 2019-08-14 12:00:02
 */
import axios from 'axios'; // 引入axios
import Qs from 'qs'; // 引入qs模块，用来序列化post类型的数据
import { message } from 'antd'; // 提示框
import { autoMatch, checkStatus } from '../utils/index'; // 附近处理函数

let inError = false;
axios.defaults.withCredentials=true;
// 创建axios实例
const instance = axios.create({
  // baseURL: process.env.BASE_URL,
  timeout: 15000, // 请求超时时间
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  transformRequest: [
    function(data) {
      // 对 data 进行任意转换处理
      return data;
    },
  ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function(data) {
      // console.log(data);
      // 对 data 进行任意转换处理
      return JSON.parse(data);
    },
  ],
  headers: {
    'Cache-Control': 'no-cache',
  },
});

// 实例添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做处理...
    config.headers = Object.assign(
      config.method === 'get'
        ? {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'Cookie': 'bid=YtxbG2GmONQ; douban-fav-remind=1; __gads=ID=e351c563a3447cf5:T=1592205581:S=ALNI_MZ7cZOVKpTOz-Ap080o5x2YpUA3HA; ll="108296"; __utma=30149280.335101779.1579251221.1592205582.1594778798.3; __utmc=30149280; __utmz=30149280.1594778798.3.3.utmcsr=cn.bing.com|utmccn=(referral)|utmcmd=referral|utmcct=/; _ga=GA1.3.335101779.1579251221; _gid=GA1.3.986322080.1594778848; _pk_ref.100001.a7dd=%5B%22%22%2C%22%22%2C1594791685%2C%22https%3A%2F%2Fwww.douban.com%2F%22%5D; _pk_ses.100001.a7dd=*; _gat=1; _pk_id.100001.a7dd=280ae29ea4c830ee.1594778849.3.1594792122.1594782336.'
          }
        : {
            'Content-Type': 'application/json; charset=UTF-8' ,//'application/x-www-form-urlencoded; charset=UTF-8',
          },
      config.headers,
    );
    // config.headers.token = sessionStorage.getItem(`${projectPrefix}_token_`);

    if (config.method === 'post') {
      const contentType = config.headers['Content-Type'];
      // 根据Content-Type转换data格式
      if (contentType) {
        if (contentType.includes('multipart')) {
          // 类型 'multipart/form-data;'
          // config.data = data;
        } else if (contentType.includes('json')) {
          // 类型 'application/json;'
          // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
          config.data = JSON.stringify(config.data);
        } else {
          // 类型 'application/x-www-form-urlencoded;'
          // 服务器收到的raw body(原始数据) name=nowThen&age=18
          config.data = Qs.stringify(config.data);
        }
      }
    }
    return Promise.resolve(config);
  },
  function(error) {
    // 对请求错误做处理...
    return Promise.reject(error);
  },
);

// 实例添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做处理，以下根据实际数据结构改动！！...
    const { code } = response.data || {};
    if (code === 109 || code === 108) {
      // 请求超时，跳转登录页
      if (!inError) {
        message.warning('登录超时，即将跳转到登录页面...');
        inError = true;
        setTimeout(() => {
          message.destroy();
          window.location.href = '/login';
          inError = false;
        }, 2000);
      }

      return Promise.resolve({});
    } else if (response) {
      return Promise.resolve(checkStatus(response));
    }
  },
  function(error) {
    // 对响应错误做处理...
    // console.log(error);
    if (error.response) {
      return Promise.reject(checkStatus(error.response));
    } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      return Promise.reject({ msg: '请求超时' });
    } else {
      return Promise.reject({});
    }
  },
);

const request = async function(opt) {
  const options = {
    method: 'get',
    ifHandleError: true, // 是否统一处理接口失败(提示)

    ...opt,
  };
  // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
  options.baseURL = autoMatch(options.prefix);
  try {
    const res = await instance(options);
    // console.log(res,options);
    if (!res && options.ifHandleError) {
      // 自定义参数，是否允许全局提示错误信息
      console.log(".......")
      message.error(res.message || '请求处理失败！');
    }
    return res;
  } catch (err) {
    if (options.ifHandleError) {
      // 自定义参数，是否允许全局提示错误信息
      message.error(err.message || err.msg || '请求处理失败！');
    }
    return err;
  }
};

export default request;