import service from "..";
export function getList(data,apiId){
    var serviceList={
        "getMusicItemList":{
            method:"GET",
            url:`/playlist/detail?id=${data}`
        },
        "getMusicList":{
            method:"GET",
            url:`/personlized?limit=${data}`
        },
        "getBanner":{
            method:"GET",
            url:`/banner?type=${data}`,
        }
    }
    return service(serviceList[apiId]);

}
//将接口放入数组中以便调用