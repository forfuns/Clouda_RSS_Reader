/**
 * 获取第三方数据信息，由开发者自定义
 */
function runnable(){
    var iconv = require('iconv-lite');

    //{Object} config是所有三方publish配置的容器
    var config = {};

    config['feedContent'] = {
        //{String} uniqueColumn为三方数据唯一标识
        //uniqueColumn : "name",

        //method:GET/POST,暂不支持PUT和DELETE方法，默认请求方式为GET
        method:"POST",

        //{Function} fetchUrl的参数就是订阅时发起的参数，返回值为pubext所抓取的url地址
        fetchUrl : function(url){
            console.log(url);
            return url;//'http://segmentfault.com/feeds';
        },

        //{Function} resolve方法作用是将抓取回来的原始数据(originData)转化成为符合Model定义的数据(resolved)
        resolve : function(originData){
            console.log(originData);
            var resolved = {head:'2',body:originData};

            return resolved;
        },

        //{Number} fetchInterval为可选参数，用来指定抓取时间间隔，单位为ms
        //fetchInterval : 60 * 1000,

        //{Boolean} buffer为可选参数，值为true时表示获取原始Buffer，否则获取原始数据字符串
        buffer : false
    }

    //最后需要声明此模块为归属为'external'
    return {
        type : 'external',
        config : config
    }

}

module.exports = runnable;