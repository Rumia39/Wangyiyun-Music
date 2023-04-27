<!-- 懒加载轮播图 -->
<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>

import { getList } from "@/request/api/item.js";
import { reactive, onMounted } from "vue";
export default {
  setup() {
    const state = reactive({
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
    });
    //async/await的作用就是使异步操作以同步的方式去执行
    //await必须写在async函数中, 但async函数中可以没有await
    //await等待的是promise对象执行完毕，并返回结果
    onMounted(async () => {
      //  不封装axios
      //  axios.get('http://localhost:3000/banner?type=2').then((res)=>{
      //   console.log(res);
      //   state.images=res.data.banners
      //   console.log(state.images);
      // })
      let res = await getList(2,"getBanner");
      state.images=res.data.banners
      console.log(res);
    });
    return { state };
  },
};
</script>
<style lang="less">
#swiperTop {
  
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>