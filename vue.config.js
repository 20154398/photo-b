const path = require('path');
const utils = {
    assetsPath: function (_path) {
        const assetsSubDirectory = process.env.NODE_ENV === 'production'
            // 生产环境下的 static 路径
            ? 'static'
            // 开发环境下的 static 路径
            : 'src';
        return path.posix.join(assetsSubDirectory, _path);
    },
    resolve: function (dir) {
        return path.resolve(__dirname, dir)
    }
};

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

console.log(process.env.VUE_APP_URL);

module.exports = {
    outputDir: path.resolve(__dirname, '../web'),
    assetsDir: '',
    //基本路径
    publicPath: '',
    //生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    //存储时不需要eslint
    lintOnSave: false,
    //打包后文件是否添加hash
    filenameHashing: false,
    //css
    css: {
        sourceMap: false,
        extract: true,
        loaderOptions: {
            sass: {
                // 全局sass变量
                //sass-loader 新版本
                additionalData: `@import "~@/assets/sass/variables.scss";`
            }
        }
    },
    //webpack配置
    configureWebpack: {
        plugins: [],
        resolve: {
            // 设置别名
            alias: {
                '@': utils.resolve('src'), // 这样配置后 @ 可以指向 src 目录
                '@assets': utils.resolve('src/assets'), // 这样配置后 @assets 可以指向 assets 目录
                '@components': utils.resolve('src/components'), // 这样配置后 @components 可以指向 components 目录
                '@config': utils.resolve('src/config'), // 这样配置后 @config 可以指向 config 目录
                '@filter': utils.resolve('src/filter'), // 这样配置后 @filter 可以指向 filter 目录
                '@mixins': utils.resolve('src/mixins'), // 这样配置后 @mixins 可以指向 mixins 目录
                '@router': utils.resolve('src/router'), // 这样配置后 @router 可以指向 router 目录
                '@store': utils.resolve('src/store'), // 这样配置后 @store 可以指向 store 目录
                '@tools': utils.resolve('src/tools'), // 这样配置后 @tools 可以指向 tools 目录
                '@views': utils.resolve('src/views'), // 这样配置后 @views 可以指向 views 目录
                '@directive': utils.resolve('src/directive'), // 这样配置后 @directive 可以指向 directive 目录
            }
        },
        optimization: {
            minimizer: []
        },
        //不加入打包的插件
        externals: {
        },
        devServer: {
            // Paths
            contentBase: path.resolve(__dirname, '../web'), // /web/
            proxy: {
                '/api': {
                    target: process.env.VUE_APP_URL,
                    pathRewrite:{
                        "^/api":"/"
                    },
                    ws: false,
                    changeOrigin: true,
                    logLevel: "debug"
                }
            },
            // Various Dev Server settings
            host: '0.0.0.0', // can be overwritten by process.env.HOST
            port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        },
    }
}
