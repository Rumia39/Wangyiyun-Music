<template>
    <div class="iconList">
        <div class="iconItem">
            <van-icon name="calendar-o" size="50px"/>
        <span>每日推荐</span>
        </div>

        <div class="iconItem">
            <van-icon name="cashier-o" size="50px"/>
        <span>私人FM</span>
        </div>

        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
        </svg>
        <span>歌单</span>
        </div>

        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
        </svg>
        <span>排行榜</span>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
    .iconList{
        width: 100%;
        height: 100px;
        margin-top: 10px;
        display: flex;
        justify-content: space-around;//用于设置弹性盒子元素在主轴上的对齐方式，它会在弹性盒子元素之间均匀分配剩余空间，并在元素两侧留有相等的空间。
        align-items: center;
        .iconItem{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;//意思是将 flex 元素沿着垂直方向排列
            align-items: center;
            .icon{
                width: 50px;
                height: 50px;

            }
        }
    }
</style>