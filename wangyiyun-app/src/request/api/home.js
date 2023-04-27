import service  from "..";
// 获取首页轮播图的数据
export function getBanner(){
    return service({
        method:"GET",
        url:"/banner?type=2",
    })
}
//获取发现好歌单
export function getMusicList(){
    return service({
        method:"GET",
        url:"/personlized?limit=10"
    })
}
//获取歌单详情页面
export function getMusicItemList(data){
    return service({
        method:"GET",
        url:`/playlist/detail?id=${data}`
    })
}
//获取歌单列表
export function getItemList(data){
    return service({
        method:"GET",
        url:`/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
    })
}
//获取歌词
export function getMusicLyric(data){
    return service({
        method:"GET",
        url:`/lyric?id=${data}`
    })
}
//搜索
export function getSearchMusic(data){
    return service({
        method:"GET",
        url:`/cloudsearch?keywords=${data}`
    })
}
//获取MV列表
export function getMv(){
    return service({
        method:"GET",
        url:`/mv/first?limit=10`
    })
}
//获取二维码key
export function getKey(){
    return service({
        method:"GET",
        url:`/login/qr/key`
    })
}