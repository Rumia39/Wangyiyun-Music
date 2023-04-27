//组件
import { Swipe, SwipeItem, Popup,ActionSheet,Icon,} from 'vant';
//放入数组中
let plugins=[
   Swipe,SwipeItem,Popup,ActionSheet,Icon,
]
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}