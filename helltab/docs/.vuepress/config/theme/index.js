const themeReco = require('./themeReco.js')
const nav = require('../nav/')
const sidebarObj = require('../sidebar/')

module.exports = Object.assign({}, themeReco, {
    nav,
    sidebarObj,
    // logo: '/head.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: 'auto',
    mode: 'light', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    modePicker: false, // 默认 true，false 不显示模式调节按钮，true 则显示
    codeTheme: 'solarizedlight',
})