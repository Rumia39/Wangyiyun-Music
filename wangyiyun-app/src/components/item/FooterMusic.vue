<!-- 底部播放器 -->
<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow">
            
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofanganniu" ></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-weibiaoti--" ></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%',width:'100%' }">
            <MusicDetail :musicList = "playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"/>
        </van-popup>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MusicDetail from '@/components/item/MusicDetail.vue'
export default{
    data(){
        return{
            interVal:0
        }
    },
    computed:{
        //将vuex中的数据映射到组件的computed属性里
        ...mapState(['playList','playListIndex','isbtnShow','detailShow'])
    },
    mounted(){
        console.log(this.$refs);
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        this.updateTime()
    },
    updated(){
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        this.addDuration()
    },
    methods:{
        play:function(){//判断音乐播放
            if(this.$refs.audio.paused){//paused暂停  属性
                this.$refs.audio.play()
                this.updateIsbtnShow(false)
                this.updateTime()//音乐播放时则调用函数，进行传值
            }else{
                this.$refs.audio.pause()//pause()暂停  函数
                this.updateIsbtnShow(true)
                clearInterval(this.interVal)//暂停则清除定时器，停止调用函数
            }
        },
        addDuration:function(){
            this.updateDuration(this.$refs.audio.duration)
        },
        updateTime:function(){//定时器，当音乐播放时触发函数
            this.interVal = setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime);
            },1000);
        },
        //mapMutations用于在组件中眏射 mutations 内的方法 以便于在该组件中使用 mutations 里的方法
        ...mapMutations(['updateIsbtnShow','updateDetailShow','updateCurrentTime','updateDuration'])
    },
    watch:{
        playListIndex:function(){//监听如果下标发生改变则自动播放音乐
            this.$refs.audio.autoplay = true;
            if(this.$refs.audio.paused){
                this.updateIsbtnShow(false)
            }
        },
        playList:function(){
            if(this.isbtnShow){
                this.$refs.audio.autoplay = true;
                this.updateIsbtnShow(false)
            }
        }
    },
    components:{
        MusicDetail,
    }
}
</script>

<style lang="less" scoped>
.FooterMusic{
    width: 100%;
    height: 70px;
    padding: 10px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    position: fixed;//元素相对于浏览器窗口固定位置不动。
    bottom: 0;
    border-top: 1px solid #999;;
    .footerLeft{
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            
        }
        
        p{
            margin-left: 20px;
        }
    }
    .footerRight{
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            width: 30px;
            height: 30px;
        }
    }
}
</style>