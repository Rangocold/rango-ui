// 引入组件
import SlideContainerComponent from './SlideContainer.vue'
import SlideCardComponent from "./SlideCard"
// 定义 Loading 对象
const SlideContainer={
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install:function(Vue){
        Vue.component('SlideContainer',SlideContainerComponent);
    }
}

const SlideCard={
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install:function(Vue){
        Vue.component('SlideCard',SlideCardComponent);
    }
}
// 导出
export default{
    SlideCard,
    SlideContainer,
}