<template>
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon liebiao" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="leftMarquee">
                <!-- 走马灯文字效果 -->
                <Vue3Marquee style="color: #fff;">
                    {{ musicList.name }}
                </Vue3Marquee>
                
                <span v-for="item in musicList.ar" :key="item">
                    {{ item.name }}
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg>
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow">
        <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}"/>
        <img src="@/assets/cd.png" alt="" class="img_cd"/>
        <img :src="musicList.al.picUrl" alt="" class="img_ar" @click="isLyricShow=true" :class="{img_ar_active:!isbtnShow,img_ar_paused:isbtnShow}"/>
    </div>
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
        <p v-for="item in lyric" :key="item" :class="{active:(currentTime*1000>=item.time && currentTime*1000<item.pre)}">
            {{ item.lrc }}
        </p>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <van-icon name="tv-o" size="35px" color="white"/>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg>
        </div>       
        <div class="footerContent"> <!-- 音乐播放进度条 -->
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
        </div>
        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon bofang" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations,mapState } from 'vuex';
export default{
    data(){
        return{
            isLyricShow:false,
        }
    },
    computed:{
        ...mapState(["lyricList","currentTime","playList","playListIndex",'duration']),
        lyric:function(){
            let arr;
            if(this.lyricList.lyric){//只显示歌词，不显示其他时间点等数据
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{ //split先进行分割，数组调用map进入循环，返回新的数组给到arr
                    let min = item.slice(1, 3);
                    let sec = item.slice(4, 6);
                    let mill = item.slice(7, 10);
                    let lrc = item.slice(11, item.length);
                    let time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
                    if(isNaN(Number(mill))){
                        mill = item.slice(7,9);
                        lrc = item.slice(10,item.length);
                        time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
                    }

                    //console.log(min,sec,Number(mill),lrc);
                    return {min, sec, mill, lrc, time}
                })
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 100000;
                    } else {
                        item.pre = arr[i + 1].time;
                        }
                });
            }
            console.log(arr);
            return arr
        }
    },
    mounted(){
        //console.log(this.musicList);打印歌单列表
        //console.log(this.lyricList.lyric);打印歌词
        this.addDuration()
    },
    props:['musicList','isbtnShow','play','addDuration'],
    methods:{
        backHome:function(){//
            this.isLyricShow = false
            this.updateDetailShow()
        },
        goPlay:function(num){
            let index = this.playListIndex + num
            if(index < 0){
                index = this.playList.length - 1;
            }else if(index == this.playList.length)
            {
                index = 0;
            }
            this.updatePlayListIndex(index);
        },
        ...mapMutations(['updateDetailShow','updatePlayListIndex'])
    },
    watch:{//监听滑条随歌词滚动进行下滑
        currentTime:function(newValue){
            let p = document.querySelector("p.active")
            //console.log([p]);
            if(p){
                if(p && p.offsetTop>300){
                    this.$refs.musicLyric.scrollTop = p.offsetTop-300
                }
            }
            if(newValue===this.duration){
                
                if(this.playListIndex===this.playList.length-1){
                    this.updatePlayListIndex(0);
                    this.play()
                }else{
                    this.updatePlayListIndex(this.playListIndex+1);
                }
            }
        }
    },
    components:{
        Vue3Marquee,
    }
}

</script>

<style lang="less" scoped>
.bgimg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(150px);
}
.detailTop{
    width: 100%;
    height: 50px;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    fill: #fff;
    .detailTopLeft{
        //height: 100%;
        display: flex;
        align-items: center;
        
        .leftMarquee{
            width: 150px;
            height: 100%;
            margin-left: 80px;
            margin-top: 20px;
            span {
                color: #fff;
                margin-left: 45px;
            }
            .icon{
                width: 15px;
                height: 15px;
                fill: #999;
            }
        }
    }
}
.detailContent{
    width: 100%;
    height: 450px;
    display: flex;
    flex-direction: column;//指的是 flex 容器的主轴是垂直的。子元素将从上到下排列
    align-items: center;
    position: relative;
    .img_needle{
        width: 100px;
        height: 150px;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;//属性可以改变元素缩放、旋转、倾斜的基准点
        transform: rotate(-13deg);//旋转
        transition: all 2s;//为一个元素在不同样式之间变化添加补间动画,如果要所有属性都参与过渡，可以写all
    }
    .img_needle_active{
        width: 100px;
        height: 150px;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;//属性可以改变元素缩放、旋转、倾斜的基准点
        transform: rotate(0deg);//旋转
        transition: all 2s;//为一个元素在不同样式之间变化添加补间动画,如果要所有属性都参与过渡，可以写all
    }
    .img_cd{
        width: 250px;
        height: 250px;
        position: absolute;
        bottom: 115px;
        z-index: -1;
    }
    .img_ar{
        width: 160px;
        height: 160px;
        border-radius: 50%;
        position: absolute;
        bottom: 157px;
        animation: rotate_ar 15s linear infinite;
    }
    .img_ar_active{
        animation-play-state: running;//控制CD旋转的启动
    }
    .img_ar_paused{
        animation-play-state: paused;//控制CD旋转的暂停
    }
    @keyframes rotate_ar {
        0%{
            transform: rotateZ(0deg);
        }
        100%{
            transform: rotateZ(360deg);
        }
        
    }
}
.musicLyric{
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    overflow: scroll;//将隐藏所有溢出的内容并使滚动条出现在相关元素上。如果内容没有溢出，滚动条始终可见，但被禁用。
    p{
        color: rgb(190, 181, 181);
        margin-bottom: 17px;
    }
    .active{
        color: #fff;
        font-size: 20px;
    }
}
.detailFooter{
    width: 100%;
    height: 150px;
    position: absolute;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .footerTop{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
            width: 18px;
            height: 18px;
            fill: rgb(245, 234, 234);
        }
        .icon{
            width: 30px;
            height: 30px;
        }
    }
    .range{
        width: 100%;
        height: 3px;
    }
    .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 50px;
      height: 50px;
      color: #fff;
    }
  }
}
</style>