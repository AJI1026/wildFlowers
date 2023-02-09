import Vue from 'vue'
import App from './App.vue'
// 引进路由
import router from './router'
// 引入全局样式
import './styles/index.scss'
import './styles/all.css'
// 基于断点的隐藏类
import 'element-ui/lib/theme-chalk/display.css';
// 装载vuex
import store from './store'
// 按需引入组件
import { Menu, MenuItem, Submenu, Input, Container, Header, Aside, Main, Footer, Image, Card, Button, Tooltip, Slider,
        Row, Col, Form, FormItem, Icon, Message, Collapse, Pagination, Table, TableColumn, Carousel, CarouselItem, PageHeader,
        CollapseItem, Checkbox, Drawer, Popconfirm, Dialog, Skeleton, SkeletonItem, InputNumber, Empty, Steps, Step, MessageBox,
        Radio, RadioButton, RadioGroup, CheckboxGroup, Switch, TimePicker, DatePicker, Option, OptionGroup, Select, Tag, Descriptions,
        DescriptionsItem, Divider, Cascader, Notification, Popover, Tabs, TabPane, Avatar, MenuItemGroup, ColorPicker, Alert,
        Upload, Breadcrumb, BreadcrumbItem, Badge} from 'element-ui'
// 引入echarts
import echarts from 'echarts';
// 引入markdown样式
import 'github-markdown-css/github-markdown.css'
// 引入socket
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
    debug: true, // debug调试
    // connection: "http://wildflowers.ltd:3000",
    connection: "http://localhost:3000",
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: {
        autoConnect: false, // 关闭自动连接
    }
}))
// 引入粒子特效
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
// 图片预览组件
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
    zIndexInline: 9999, //预览弹窗的层级
    //下面的参数不写，默认都为true
    Options: {
        'inline': true, //启用inline模式
        'button': true, //显示右上角关闭按钮
        'navbar': true, //显示缩略图导航
        'title': true, //显示当前图片的标题
        'toolbar': true, //显示工具栏
        'tooltip': true, //显示缩放百分比
        'movable': true, //图片是否可移动
        'zoomable': true, //图片是否可缩放
        'rotatable': true, //图片是否可旋转
        'scalable': true, //图片是否可翻转
        'transition': true, //使用css3过渡
        'fullscreen': true, //播放时是否全屏
        'keyboard': true, //是否支持键盘
        'url': 'data-source' //设置大图片的url
    }
})
// 视频播放器
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

Vue.config.productionTip = false

// 使用组件
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Image)
Vue.use(Card)
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(Slider)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Icon)
Vue.use(Collapse)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(PageHeader)
Vue.use(CollapseItem)
Vue.use(Checkbox)
Vue.use(Drawer)
Vue.use(Popconfirm)
Vue.use(Dialog)
Vue.use(Skeleton)
Vue.use(SkeletonItem)
Vue.use(InputNumber)
Vue.use(Empty)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Select)
Vue.use(Tag)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Divider)
Vue.use(Cascader)
Vue.use(Popover)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Avatar)
Vue.use(MenuItemGroup)
Vue.use(ColorPicker)
Vue.use(Alert)
Vue.use(Upload)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Badge)

// 这里直接怎么用造成页面一加载就弹出一个空白提示
// Vue.use(Message)
Vue.prototype.$message = Message
// 全局注入echarts
Vue.prototype.$echarts = echarts
// 把消息提示框挂载到全局使用
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
// 统一转换时间格式
Vue.prototype.getCurrentDataStr = dateStr => {
    let date = new Date(dateStr);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate()
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d
}
// event Bus 用于无关系组件间的通信。
Vue.prototype.$bus = new Vue()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
