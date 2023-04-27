import { getMusicLyric } from '@/request/api/home'
import { createStore } from 'vuex'
import { getPhoneLogin } from '@/request/api/home'
export default createStore({
  state: {
    playList:[{//播放列表
      al: {
        id: 162623917,
        name: "私のSymphony 2022 Version",
        pic: 109951168518893310,
        picUrl: "http://p3.music.126.net/-yPeNpS1PveKXpGmELAcOA==/109951168518893306.jpg",
        pic_str: "109951168518893306"
      },
      id: 2034198168,
      name: "私のSymphony 2022 Version",
      ar:[{name: "Liella!"}]
    }],
    playListIndex:0,//默认下标为0,获取所点击歌曲的id
    isbtnShow:true,//暂停按钮的显示
    detailShow:false,//歌曲播放详情页的显示
    lyricList:{},//歌词
    currentTime:0,//当前音乐时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否要显示
    menuShow:false,//菜单显示
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow = value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updatePlayList:function(state,value){
      state.playList = value
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex = value
    },
    updateDetailShow:function(state){
      state.detailShow = !state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList = value
    },
    updateCurrentTime:function(state,value){
      //console.log(state.currentTime);
      state.currentTime = value
    },
    updateDuration:function(state,value){
      state.duration = value
    },
    updateMenuShow:function(state){
      state.menuShow =! state.menuShow
    },
    
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      console.log(res);
      context.commit("updateLyricList",res.data.lrc)
    },
    getLogin:async function(context,value){
      let res = await getPhoneLogin(value);
      console.log(res);
    }
  },
  modules: {
  }
})
