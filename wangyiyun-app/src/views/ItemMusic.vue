<!-- 歌单详情页面 -->
<template>    
    <ItemMusicTop :playlist = "state.playlist"/>
    <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"/>
</template>

<script>
import { getMusicItemList,getItemList } from '@/request/api/home';
import { useRoute } from 'vue-router';
import { reactive,onMounted } from 'vue';
import ItemMusicTop from '@/components/item/ItemMusicTop.vue';
import ItemMusicList from '@/components/item/ItemMusicList.vue';

    export default{
        setup() {
            const state = reactive({
                playlist: {},//歌单详情页数据
                itemList:[]//歌单里面的歌曲数据
            });
            onMounted(async () => {
      let id = useRoute().query.id;
      console.log(id);
      //   获取歌单详情页
      let res = await getMusicItemList(id);
      console.log(res);
      state.playlist = res.data.playlist;
      //   获取歌单的歌曲
       let result = await getItemList({ id, limit: 10, offset: 0 });
       console.log(result);
       state.itemList = result.data.songs

      //   防止页面刷新，数据丢失，将数据保存到sessionStorage中
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });
        return { state }
        },
        components:{
            ItemMusicTop,
            ItemMusicList
        }
    };
</script>

<style>

</style>