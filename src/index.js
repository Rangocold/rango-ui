// 引入组件
import SlideContainer from './components/SlideContainer'
import SlideCard from './components/SlideCard'
import IndicatorList from "./components/Indicator"

let components = {SlideContainer, SlideCard, IndicatorList};
const RangocoldUI = {
    install:function(Vue){
        /* for (let i = 0; i < components.length; ++i){
            console.log(components);
            components[i].install(Vue);
        } */
        for (let i in components){
            console.log(components);
            components[i].install(Vue);
        }
    },
    components: {
        ...components
    }
}

// 导出
export default RangocoldUI