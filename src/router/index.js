import VueRouter from "vue-router";
import Vue from "vue";
import HomeView from '../views/home.vue'
import MentalTest from '../views/mentaltest.vue'
import Consultation from '../views/consultation.vue'
import Info from '../views/info.vue'
import Education from '../views/education.vue'
import TreeHole from '../views/treehole.vue'
import UserLogin from '../views/userlogin.vue'
import AdminLogin from '../views/adminlogin.vue'
import SCLtest from '../views/scltest.vue'
import NewsPage from '../views/newsPage.vue'
import EduPage from '../views/eduPage.vue'
import UserRegister from '../views/userRegister.vue'
import Ownpage from '../views/ownpage.vue'
import CommentPage from '../views/commentPage.vue'
import Backhome from '../views/backhome.vue'
import Onlinechat from '../components/onlinechat.vue'
import Stumanage from '../views/stumanage.vue'
import Teachermanage from '../views/teachermanage.vue'
import Classmanage from '../views/classmanage.vue'
import Sclmanage from '../views/sclmanage.vue'
import Othertabmanage from '../views/othertabmanage.vue'
import Postmanage from '../views/postmanage.vue'
import Commentmanage from '../views/commentmanage.vue'
import Resultmanage from '../views/resultmanage.vue'
import Newsmanage from '../views/newsmanage.vue'
import Edumanage from '../views/edumanage.vue'
import Owninformation from '../views/owninformation.vue'
import Ownpost from '../views/ownpost.vue'
import Ownreply from '../views/ownreply.vue'
import Ownresult from '../views/ownresult.vue'



Vue.use(VueRouter)

const router = new VueRouter({
    //指定hash属性与组件之间的关系
    routes:[
        {
            path: '/', // 这里设置默认打开的路径
            name: 'home',
            component: HomeView
        },
        {path: '/home',component: HomeView},
        {path: '/mentaltest',component: MentalTest},
        {
            path: '/consultation',
            component: Consultation,
            beforeEnter:(to, from, next) =>{
                if(window.localStorage.getItem("user") != ""){
                    next()
                }else{
                alert("还未登录，请先登录！")
                    next("/userlogin")
                }
            },
        },
        {path: '/info',component: Info},
        {path: '/education',component: Education},
        {path: '/treehole',component: TreeHole},
        {path: '/userlogin',component: UserLogin},
        {path: '/adminlogin',component: AdminLogin},
        {
            path: '/scltest',
            component: SCLtest,
            beforeEnter:(to, from, next) =>{
                if(window.localStorage.getItem("uid") != ""){
                    next()
                }else{
                alert("还未登录，请先登录！")
                    next("/userlogin")
                }
            }
        },
        {path: '/newsPage/:nno',component:NewsPage},
        {path: '/eduPage/:eno',component:EduPage},
        {path: '/userRegister',component: UserRegister},
        {
            path: '/ownpage',
            component: Ownpage,
            beforeEnter:(to,from,next) =>{
                if(window.localStorage.getItem("uid") != ""){
                    next()
                }else{
                alert("还未登录，请先登录！")
                    next("/userlogin")
                }
            },
            children:[
                {path: 'owninformation',component: Owninformation},
                {path: 'ownpost',component: Ownpost},
                {path: 'ownreply',component: Ownreply},
                {path: 'ownresult',component: Ownresult},
            ]
        },
        {path: '/commentPage/:trno',component:CommentPage},
        {
            path: '/backhome',
            component:Backhome,
            beforeEnter:(to, from, next) =>{
                if(window.localStorage.getItem("backname") != ""){
                    next()
                }else{
                alert("还未登录，请先登录！")
                    next("/adminlogin")
                }
            },
            children:[
                {path: 'onlinechat',component: Onlinechat},
                {path: 'stumanage',component: Stumanage},
                {path: 'teachermanage',component: Teachermanage},
                {path: 'classmanage',component: Classmanage},
                {path: 'sclmanage',component: Sclmanage},
                {path: 'othertabmanage',component: Othertabmanage},
                {path: 'postmanage',component: Postmanage},
                {path: 'commentmanage',component: Commentmanage},
                {path: 'resultmanage',component: Resultmanage},
                {path: 'newsmanage',component: Newsmanage},
                {path: 'edumanage',component: Edumanage},
            ],
        },
    ]
})

//导出
export default router