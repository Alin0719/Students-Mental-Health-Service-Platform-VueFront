<template>
    <div>
        <div class="mynavbars">
            <ul class="mynavbar">
                <li>
                    <router-link to="/home" exact-active-class="active">首页</router-link>
                </li>
                <li>
                    <router-link to="/scltest">心理测评</router-link>
                </li>
                <li>
                    <router-link to="/consultation">在线咨询</router-link>
                </li>
                <li>
                    <router-link to="/info">心理资讯</router-link>
                </li>
                <li>
                    <router-link to="/education">宣传教育</router-link>
                </li>
                <li>
                    <router-link to="/treehole">情绪帖子</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style>
.mynavbars{
    position: relative;
    background-color: #0f7441;
    width: 100%;
    height: 45px;
}
.mynavbar{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1080px;
    height: 45px;
    padding: 0px;
    margin: 0px;
    border: 0px;
    text-align:center;
}
.mynavbar li{
    list-style:none;
    display:inline-block;
    width: 180px;
    height: 100%;
    text-align:center;
}
a{
    text-decoration: none;
    color: #ffffff;
    display: block;
    height: 45px;
    line-height: 45px;
}
a:hover{
    transform: scale(1.1);
}
.router-link-exact-active, .router-link-active {
    background-color: #0a6135;;
}

</style>