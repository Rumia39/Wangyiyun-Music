<!-- 左侧菜单栏 -->
<template>
    <div class="box">
        <div class="top">
            <div class="topLeft">
                <div class="user"></div>
                <p @click="$router.push('/infoUser')">用户名 <van-icon name="arrow" /></p>
                
            </div>
            <div class="topRight">
                <van-icon name="scan" size="30px"/>
                <van-icon name="exchange" size="30px" @click="updateMenuShow" color="black"/>
            </div>
        </div>
        <div class="vip">
            <div class="vipTop">
                <div class="left">
                    <p>续费黑胶VIP</p>
                </div>
                <div class="right">
                    <p class="vc">会员中心</p>
                </div>
            </div>
            <div class="vipBottom">
                <hr style="width: 80%; margin-left: 20px; border-top:1px dotted #185598;">
                <p>专项优惠！黑胶VIP仅¥0.1/天！</p>
                
            </div>
        </div>
        <div class="content">
            <div class="service">
                <div class="sleft">
                    <van-icon name="envelop-o" size="20px"/>
                    <p>消息</p>
                </div>
                <div class="sright">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="service">
                <div class="sleft">
                    <van-icon name="point-gift-o" size="20px"/>
                    <p>礼品</p>
                </div>
                <div class="sright">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="service">
                <div class="sleft">
                    <van-icon name="star-o" size="20px"/>
                    <p>收藏</p>
                </div>
                <div class="sright">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="service">
                <div class="sleft">
                    <van-icon name="medal-o" size="20px"/>
                    <p>成就</p>
                </div>
                <div class="sright">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="service">
                <div class="sleft">
                    <van-icon name="shop-o" size="20px"/>
                    <p>商城</p>
                </div>
                <div class="sright">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="service">
                <div class="sleft">
                    <van-icon name="diamond-o" size="20px"/>
                    <p>精选</p>
                </div>
                <div class="sright">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="service">
                <div class="sleft">
                    <van-icon name="user-o" size="20px"/>
                    <p>个性</p>
                </div>
                <div class="sright">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="service">
                <div class="sleft">
                    <van-icon name="setting-o" size="20px"/>
                    <p>设置</p>
                </div>
                <div class="sright">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="service" style="border-bottom: none;">
                <div class="sleft">
                    <van-icon name="info-o" size="20px"/>
                    <p>关于</p>
                </div>
                <div class="sright">
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>
        <div class="exit">
            <p>退出登录/关闭</p>
        </div>
    </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
export default{
    computed:{
        ...mapState(["menuShow"]),
    },
    methods:{
        ...mapMutations(['updateMenuShow']),
    },
    
}
</script>

<style lang="less" scoped>
  .box{
    width: 100%;
    height: 100%;
    background-image: url('@/images/11.png');
    
    .top{
        width: 100%;
        height: 80px;
        align-items: center;
        display: flex;
        justify-content: space-between;
        color: #fff;
        .topLeft{
            width: 50%;
            height: 100%;
            justify-content: space-between;
            align-items: center;
            display: flex;
            margin-left: 15px;
            .user{
                width: 50px;
                height: 50px;
                background-color:rgba(167, 158, 158, 0.5);
                border-radius: 50%;
                
                
            }
        }
        .topRight{
            width: 30%;
            height: 100%;
            justify-content: space-between;
            align-items: center;
            display: flex;
        }
    }
    .vip{
        width: 90%;
        height: 100px;
        background-color:rgba(29, 6, 6, 0.5);
        margin-left: 13px;
        border-radius: 10px;
        
        .vipTop{
            width: 100%;
            height: 60%;
            display: flex;
            position: relative;
            .left{
                width: 60%;
                height: 100%;
                color: #fff;
                margin-top: 15px;
                margin-left: 15px;
                font-weight: 700;
            }
            .right{
                width: 30%;
                height: 30px;
                color: #9e9c9c;
                margin-top: 10px;
                font-weight: 100;
                font-size: small;
                border: #9e9c9c solid 1px;
                border-radius: 20px;              
                .vc{
                    margin-top: 5px;
                    margin-left: 8px;
                }
                
            }
        }
        .vipBottom{
            width: 100%;
            height: 40%;
            color: #999;            
            font-size: smaller;
            p{
                margin-left: 15px;
                margin-top: 10px;
            }
            
        }
    }
    .content{
        width: 90%;
        height: 360px;
        border-radius: 10px;
        margin-left: 13px;
        margin-top: 15px;
        background-color:rgba(167, 158, 158, 0.5);
        .service{
        width: 100%;
        height: 40px;
        display: flex;   
        justify-content: space-between;
        color: #fff;
        border-bottom: rgba(167, 158, 158, 0.5) solid 1px;
        .sleft{
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-weight: 600;
            margin-left: -3px;
        }
        .sright{
            width: 10px;
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: 10px;
        }
        }
    }
    .exit{
        width: 90%;
        height: 60px;
        border-radius: 10px;
        margin-left: 13px;
        margin-top: 30px;
        background-color:rgba(167, 158, 158, 0.5);
        align-items: center;
        display: flex;
        p{
            color: #bae2a8;
            align-items: center;
            display: flex;
            font-weight: 800;
            font-size: larger;
            margin-left: 60px;
        }
    }
  }
</style>