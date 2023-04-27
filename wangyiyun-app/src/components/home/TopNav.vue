<template>
    <div class="topNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true" @click="updateMenuShow">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
        <div class="topContent">
            <span @click="$router.push('/infoUser')">我的</span>
            <span class="active" @click="$router.go(-1)">发现</span>
            <span>云村</span>
            <span @click="$router.push('/topMV')">视频</span>
        </div>
        <div class="topRight">
            <!-- 全局路由对象进行跳转 -->
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
        <van-popup v-model:show="menuShow" position="left" :style="{ width: '70%', height: '100%' }">
            <Menu/>
        </van-popup>
    </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
import Menu from '@/components/item/Menu.vue'
export default{
    computed:{
        ...mapState(["menuShow"]),
    },
    methods:{
        ...mapMutations(['updateMenuShow']),
    },
    components:{
        Menu,
    },
}
</script>

<style>
.topNav{
    width: 100%;
    height: 50px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;   
}
.topContent{
        width: 65%;
        height: 100%;
        padding-bottom: 8px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 18px;
    }
.active{
    font-weight: 900;
}    

</style>