<template>
    <div>
        <firstbar></firstbar>
        <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#0f7441"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <el-menu-item index="1" class="myitem">
            <router-link to="/ownpage/owninformation" class="myroulink">
                个人信息
            </router-link>
        </el-menu-item>
        <el-menu-item index="2" class="myitem">
            <router-link to="/ownpage/ownpost" class="myroulink">
                我的帖子
            </router-link>
        </el-menu-item>
        <el-menu-item index="3" class="myitem">
            <router-link to="/ownpage/ownreply" class="myroulink">
                我的评论
            </router-link>
        </el-menu-item>
        <el-menu-item index="4" class="myitem">
            <router-link to="/ownpage/ownresult" class="myroulink">
                我的测评
            </router-link>
        </el-menu-item>
        <el-menu-item index="5" class="myitem">
            <router-link to="/home" class="myroulink">
                首页
            </router-link>
        </el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
import firstbar from '../components/firstbar.vue'
import axios from 'axios'
export default({
    components: {
        firstbar,
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
})
</script>

<style scoped>
a:hover{
    transform: scale(1);
}
.router-link-exact-active, .router-link-active {
    background-color: #0f7441;;
}
.myitem{
    width: 180px;
    padding: 0px;
    text-align: center;
}
a{
    text-decoration: none;
    color: #ffffff;
    display: block;
    height: 59px;
    line-height: 59px;
}
</style>
