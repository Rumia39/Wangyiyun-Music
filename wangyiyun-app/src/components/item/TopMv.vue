<template>
    <TopNav/>
    <div class="box">
        <div class="top">
            <div class="topSelect">
                <p>推荐</p>
            </div>
            <div class="TopSelect">
                <p>MV</p>
            </div>
        </div>
        <div class="content">
            <div class="mvContent" v-for="item in state.mvList" :key="item">
                <div class="mvTop">
                    <van-icon name="play-circle-o" class="Play"/>
                    <img :src="item.cover" alt=""/>                  
                    <span>{{ item.name }}</span>
                </div>
                <div class="mvBottom">
                    <div class="left">
                        <van-icon name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png" />
                        <span>{{ item.artistName }}</span>
                    </div>
                    <div class="right">
                        <van-icon name="good-job-o" />
                        <span>{{ changeCount(item.playCount) }}</span>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import { reactive,onMounted } from 'vue';
import TopNav from '@/components/home/TopNav.vue';
export default{
    setup(){
        const state = reactive({
            mvList: [     
            ],
        });
        function changeCount(num){//处理播放次数
            if(num>=100000000){
                return(num/10000000).toFixed(1) +"亿";
            }else if(num>10000){
                return(num/10000).toFixed(1) +"万";
            }
        }
        onMounted(async ()=> {
      
      axios.get('http://localhost:3000/mv/first?limit=10').then((res)=>{
        console.log(res);
        state.mvList = res.data.data
        console.log(state.mvList);
      })

    })
    return { state,changeCount };
    },
    components: {
        TopNav
    },
}
</script>

<style lang="less" scoped>
.box{
    width: 100%;
    
    
    .top{
        width: 100%;
        height: 50px;
        background-color: #fff;
        align-items: center;
        display: flex;
        .topSelect{
            width: 60px;
            height: 70%;
            color: #999;
            border-radius: 30px;
            background-color: #fff;
            align-items: center;
            display: flex;
            margin-left: 10px;
            p{
                margin-left: 15px;
            }
            
        }
        .TopSelect{
            width: 60px;
            height: 70%;
            color: #fff;
            border-radius: 30px;
            background-color: #77e69d;
            align-items: center;
            display: flex;
            margin-left: 10px;
            p{
                margin-left: 18px;
                font-weight: 700;
            }
            
        }
    }
    .content{
        width: 95%;
        
        background-color: #fff;
        margin-left: 9px;
        display: flex;
	    justify-content: space-between;
        align-content:flex-start;
	    flex-wrap: wrap;/* 只要把这个属性去掉,就不会自动换行了*/
        
        .mvContent{
            width: 175px;
            
            background-color: #e0dddd;
            border-radius: 10px;
            margin-top: 7px;
            .mvTop{
                position: relative;
                img{
                    width: 100%;
                    height: 120px;
                    border-top-right-radius: 10px;
                    border-top-left-radius: 10px;
                }
                span{
                    color: black;
                    font-weight: 500;
                    font-size: large;
                    margin-left: 15px;
                }
                .Play{
                    position: absolute;
                    color: #fff;
                    font-size: 22px;
                    margin-top: 8px;
                    margin-left: 146px;
                }
            }
            .mvBottom{
                width: 100%;
                display: flex;
                justify-content: space-between;
                .left{
                    
                    display: flex;
                    margin-left: 10px;
                    align-items: center;
                    span{
                        font-size: 2px;
                        margin-bottom: 2px;
                    }
                }
                .right{                  
                    display: flex;
                    align-items: center;
                    color: #8c8888;
                    margin-right: 10px;
                }
            }
            
        }
    }
}
</style>