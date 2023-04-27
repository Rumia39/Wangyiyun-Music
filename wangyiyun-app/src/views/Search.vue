<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="伊波杏树" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
        <span class="searchSpan">历史:</span>
        <span v-for="item in keyWorldList" :key = "item" class="spanKey" @click="searchHistory(item)">
            {{ item }}
        </span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="itemList">
            <div class="item" v-for="(item, i) in searchList" :key="i">
                <div class="listLeft" @click="updateIndex(item)" >
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
</template>
<script>
import {getSearchMusic} from "@/request/api/home.js"
export default{
    data(){
        return{
            keyWorldList:[],//储存历史记录的数组
            searchKey:"",//接受搜索字
            searchList:[],
        }
    },
    mounted(){
        this.keyWorldList = JSON.parse(localStorage.getItem('keyWorldList')) || []
    },
    methods:{
        enterKey:async function(){
            if(this.searchKey !== ""){
                this.keyWorldList.unshift (this.searchKey);//赋值
                this.keyWorldList=[...new Set(this.keyWorldList)]//数组Set去重
                if(this.keyWorldList.length>6){//固定长度（历史记录个数固定）
                    this.keyWorldList.splice(this.keyWorldList.pop())
                }
                localStorage.setItem("keyWorldList",JSON.stringify(this.keyWorldList))
                let res = await getSearchMusic(this.searchKey)
                console.log(res);
                this.searchList = res.data.result.songs
                this.searchKey = "";
            }           
        },
        delHistory:function(){
            localStorage.removeItem("keyWorldList")
            this.keyWorldList = []
        },
        searchHistory:async function(item){
            let res = await getSearchMusic(item)
                console.log(res);
                this.searchList = res.data.result.songs
        },
        updateIndex:function(item){
            this.$store.commit("pushPlayList",item)
            this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
        },
    }
}
</script>

<style lang="less" scoped>
.searchTop{
    width: 100%;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    input{
        margin-left: 10px;
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: 5px;
    }
}
.searchHistory{
    width: 100%;
    height: 65px;
    position: relative;
    .searchSpan{
        margin-left: 20px;
        font-weight: 600;
    }
    .spanKey{
        padding: 5px 10px;
        background-color: rgb(185, 169, 169);
        border-radius: 20px;
        margin: 5px 10px;
        display: inline-block;
    }
    .icon{
        width: 15px;
        height: 15px;
        position: absolute;
        right: 10px;
    }
}
.itemList{
        width: 100%;
        padding: 10px;
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
</style>