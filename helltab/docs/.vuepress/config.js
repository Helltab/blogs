const themeConfig = require('./config/theme/')
const h_search = require('./search/')

module.exports = {
    base: '/helltab/',
    title: "Helltab",
    description: '表独立兮山之上, 云容容兮而在下',
    dest: 'public',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}]
    ],

    theme: 'reco',
    themeConfig,
    markdown: {
        lineNumbers: true
    },
    plugins: ['@vuepress/medium-zoom', 'flowchart', 'cursor-effects',
        ["@vuepress-reco/vuepress-plugin-kan-ban-niang",
            {
                theme: ['haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16', 'blackCat', 'whiteCat',]
            }
        ],
        [
            "ribbon",
            {
                size: 90,     // width of the ribbon, default: 90
                opacity: 0.4, // opacity of the ribbon, default: 0.3
                zIndex: -1    // z-index property of the background, default: -1
            }
        ], [
            "dynamic-title",
            {
                showIcon: "/favicon.ico",
                showText: "(/≧▽≦/)咦！你最好啦！",
                hideIcon: "/failure.ico",
                hideText: "(●—●)你是笨蛋么！",
                recoverTime: 2000
            }
        ],
    ],

}  