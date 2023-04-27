<!-- 歌单详情页播放列表 -->
<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="itemLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofanganniu"></use>
                </svg>
                <span>播放全部<span>(共{{itemList.length}}首)</span></span>
            </div>
            <div class="itemRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        
        <div class="itemList">
            <div class="item" v-for="(item, i) in itemList" :key="i">
                <div class="listLeft" @click="playMusic(i)">
                    <span class="leftSpan">{{ i + 1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <span v-for="(item1, index) in item.ar" :key="index">{{item1.name}}</span>
                    </div>
                </div>
                <div class="listRight">
                    <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { ref, onMounted } from 'vue';
export default{
    
    setup(props){
        console.log(props);
        const loading = ref(true);
        //ref特性就是为元素或子组件赋予一个ID引用,通过this.$refs.refName来访问元素或子组件的实例
        onMounted(() => {
        loading.value = false;
        
        });

        return {
        loading,
        };
    },
    props:['itemList','subscribedCount'],
    methods:{
        playMusic:function(i){
            this.updatePlayList(this.itemList)
            this.updatePlayListIndex(i)
        },
        ...mapMutations(['updatePlayList','updatePlayListIndex'])
    },
    
}
</script>

<style lang="less" scoped>
.itemMusicList{
    //border: #999 solid 1px;
    width: 100%;
    height: 500px;
    padding: 0 10px;
    
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    .itemListTop{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .itemLeft{
            width: 150px;
            height: 100%;
            display: flex;
            
            align-items: center;
            .icon {
                stroke: #333333;//表示描边颜色
                stroke-width: 20;//表示描边的粗细
            }
            span{
                font-weight: 700;
                span {
                    font-weight: 400;
                    font-size: 12px;
                    color: #999;
                }
            }
        }
        .itemRight{    
            display: flex;
            padding: 10px;
            align-items: center;
            background-color: red;
            border-radius: 30px;
            color: #fff;
            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: #fff;//颜色填充
                margin-right: 0.1rem;
                stroke: #fff;
                stroke-width: 50;
            }
        }
    }
    .itemList{
        width: 100%;
        .item{
            width: 100%;
            height: 70px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            //border: #333333 solid 1px;
            .listLeft{
                
                height: 100%;
                display: flex;
                align-items: center;
                .leftSpan{
                    width: 10px;
                    display: inline-block;
                    text-align: center;
                }
                div{
                        margin-left: 0.3rem;
                        p{
                            width: 227px;
                            height: 20px;
                            overflow: hidden;//用于隐藏超出元素框的内容
                            text-overflow: ellipsis;//用于在元素内容超出容器宽度时，以省略号（...）表示被截断的文本。
                            white-space: nowrap;//文本不会换行，而是在同一行上显示。
                            font-weight: 700;
                        }
                        span{
                            font-weight: 400;
                            font-size: 12px;
                            color: #999;
                        }
                    }
            }
            .listRight{
                width: 20%;
                height: 100%;
                display: flex;
                align-items: center;
                position: relative;
                .icon{
                    fill: #999;
                    
                }
                .bofang{
                    position: absolute;
                    left: 0;
                }
                .liebiao{
                    position: absolute;
                    right: 0;
                }
            }
        }
        
    }
}
</style>

