<!-- 推荐歌单 -->
<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">推荐歌单<van-icon name="arrow" /></div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
        <van-swipe 
        :loop="false" 
        :width="150" 
        class="my-swipe" 
        :show-indicators="false">
            <van-swipe-item v-for="item in state.musicList" :key="item">
                <!-- router-link :to 相当于a标签中的”herf”属性，后面跟跳转链接所用，此处用于跳转至歌单详情列表页面 -->
                <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                <van-icon name="play-circle-o" style="position: absolute; color: #fff; font-size: 35px; margin-top: 110px; margin-left: 100px;"/>
                <img :src="item.picUrl" alt=""/>
                <div class="playCount">
                    <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gl-play-copy"></use>
                    </svg>
                    {{ changeCount(item.playCount) }}
                </span>
                </div>
                <span class="name">{{ item.name }}</span>
                </router-link>
            </van-swipe-item>
        </van-swipe>
        </div>
    </div>
    
</template>

<script>
 import axios from 'axios'
 import { reactive,onMounted } from 'vue';
 export default {
     setup() {
     const state = reactive({
       musicList: [     
       ],
     });
     function changeCount(num){
        if(num>=100000000){
            return(num/10000000).toFixed(1) +"亿";
        }else if(num>10000){
            return(num/10000).toFixed(1) +"万";
        }
    }
    //async/await的作用就是使异步操作以同步的方式去执行
    //async作为一个关键字放在函数前面，表示该函数是一个异步函数，异步函数意味着该函数的执行不会阻塞后面代码的执行
    //使用async的函数将会始终返回一个 promise 对象
     onMounted(async ()=> {//箭头函数就是采用箭头=>来定义函数，省去关键字function。
         axios.get('http://localhost:3000/personalized?limit=10').then((res)=>{
           console.log(res);
           state.musicList = res.data.result
           console.log(state.musicList);
         })

     })
     return { state,changeCount };
   },

 };


</script>

<style lang="less" scoped>
    .musicList{
        width: 100%;
        height: 250px;
        padding: 10px;
        .musicTop{
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .title{
                font-size: 20px;
                font-weight: 900;
            }
            .more{
                border: 1px solid #ccc;
                text-align: center;
                line-height: 30px;
                padding: 0 10px;
                border-radius: 20px;
            }
        }
        .musicContent{
            width: 100%;
            height: 200px;
    
            .my-swipe{
                height: 100%;
                position: relative;
                img{
                    width: 100%;
                    height: 150px;
                    border-radius: 20px;
                }
                .van-swipe-item {
                   
                    padding-right: 10px;
                    position: relative;
                     height: 190px;
                     .playCount{
                    color: #ccc;
                    position: absolute;
                    top: -5px;
                    right: 20px;
                    .icon{
                        padding-top: 13px;
                        padding-left: 10px;                                            
                    }
                }
                }
            }
        }
    }
</style>
