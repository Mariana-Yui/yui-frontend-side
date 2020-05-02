module.exports = {
    transpileDependencies: ['vuex-module-decorators'],
    lintOnSave: process.env.NODE_ENV !== 'production',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 16, // 换算的基数
                        selectorBlackList: [], // 忽略转换正则匹配项
                        propList: ['*']
                    })
                ]
            }
        }
    }
};
