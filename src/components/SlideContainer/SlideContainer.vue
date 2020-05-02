<template>
  <div
    class="cardContainer"
    :style="cardContainerStyle"
    :onCardMounted="onCardMounted"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <slot></slot>
    <indicator-list v-if="isIndicator"
      :width="width"
      :numOfIndicators="numOfCards"
      ref="indicator-list"
      :selectedIndex="selectedIndex"/>
  </div>
</template>
<script>
import IndicatorList from "../Indicator/IndicatorList";
export default {
  data() {
    return {
      cardContainerStyle: {
        width: this.width + "px",
        height: this.height + "px"
      },
      selectedIndex: 0, // 当前展示的卡片
      cardList: [],
      sumOffset: 0, // 总移动量 大于0代表往右边移动，小于0代表往左边移动
      autoInterval: null, // 轮播setInterval的返回结果，用于重置轮播
      lastPosition: 0 // 上一个点的position，用两个点相减拿到本次的滑动
    };
  },
  props: {
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 200
    },
    cardWidth: {
      type: Number,
      default: 750
    },
    cardHeight: {
      type: Number,
      default: 200
    },
    cardMargin: {
      type: Number,
      default: 0
    },
    auto: {
      type: Number,
      default: 0 // 0代表不自动播放
    },
    isVertical: {
      type: Boolean,
      default: false // 默认横向滚动
    },
    isIndicator: {
      type: Boolean,
      default: false
    },
    onIndexChange: {
      type: Function,
      default: function(){}
    }
  },
  components: {
    IndicatorList
  },
  provide() {
    return {
      cardMargin: this.cardMargin,
      cardWidth: this.cardWidth,
      cardHeight: this.cardHeight,
      onCardMounted: this.onCardMounted
    };
  },
  mounted() {
    if (this.auto){
      this.autoInterval = setInterval(this.autoPlay, this.auto);
    }
  },
  computed: {
    numOfCards() {
      return this.cardList.length > 0 ? this.cardList.length : -1;
    }
  },
  methods: {
    autoPlay(){
      if (this.cardList && this.cardList[this.selectedIndex + 1]){
        this.cardList[this.selectedIndex].slideToSide(-1);
        this.cardList[this.selectedIndex + 1].slideToCenter();
        ++this.selectedIndex;

        if (this.onIndexChange)
          this.onIndexChange(this.selectedIndex);
      }
    },
    onCardMounted(card) {
      this.cardList.push(card);
      this.selectedIndex = 0;

      if (this.cardList.length === 1) this.cardList[0].setLeft(0);
      else this.cardList[this.cardList.length - 1].setLeft(-this.width);
    },
    onTouchStart(e) {
      clearInterval(this.autoInterval);

      console.log(this.selectedIndex);
      this.lastPosition = e.touches[0].clientX;
      this.sumOffset = 0;

      if (this.cardList[this.selectedIndex + 1]) {
        this.cardList[this.selectedIndex + 1].setLeft(this.width);
      }

      if (this.cardList[this.selectedIndex - 1]) {
        this.cardList[this.selectedIndex - 1].setLeft(-this.width);
      }
    },
    onTouchMove(e) {
      if (!e.touches) return;

      let offset = e.touches[0].clientX - this.lastPosition;

      this.sumOffset += offset;
      this.cardList[this.selectedIndex].slide(offset);

      if (this.cardList[this.selectedIndex - 1])
        this.cardList[this.selectedIndex - 1].slide(offset);

      if (this.cardList[this.selectedIndex + 1])
        this.cardList[this.selectedIndex + 1].slide(offset);

      this.lastPosition = e.touches[0].clientX;
    },
    onTouchEnd(e) {
      console.log("onTouchEnd offset: " + this.sumOffset);
      let that = this;
      if (this.sumOffset < -100 && this.cardList[this.selectedIndex + 1]) {
        // 往右边划到下一个
        //this.cardList[this.selectedIndex].slideToRight();

        that.cardList[that.selectedIndex].slideToSide(-1);
        that.cardList[that.selectedIndex + 1].slideToCenter();
        ++this.selectedIndex;

        if (this.onIndexChange){
          this.onIndexChange(this.selectedIndex);
        }
      } else if (
        this.sumOffset > 100 &&
        this.cardList[this.selectedIndex - 1]
      ) {
        console.log("往左滑到下一个");
        // 往左边滑到下一个
        //this.cardList[this.selectedIndex].slideToLeft();
        that.cardList[that.selectedIndex].slideToSide(1);
        that.cardList[that.selectedIndex - 1].slideToCenter();
        --this.selectedIndex;

        if (this.onIndexChange){  
          this.onIndexChange(this.selectedIndex);
        }
      } else {
        console.log("惯性回位");
        // 惯性回位
        if (this.cardList[this.selectedIndex - 1]) {
          //this.cardList[this.selectedIndex - 1].slideToLeft();
          that.cardList[that.selectedIndex - 1].slideToSide(-1);
        }

        if (this.cardList[this.selectedIndex + 1]) {
          //this.cardList[this.selectedIndex + 1].slideToRight();
          that.cardList[that.selectedIndex + 1].slideToSide(1);
        }

        this.cardList[this.selectedIndex].slideToCenter();
      }

      this.sumOffset = 0;
      this.lastPosition = 0;

      if (this.auto){
        this.autoInterval = setInterval(this.autoPlay, this.auto);
      }
    },
    slide(direction) {
      // 根据方向滑动selectedIndex和旁边的卡片
    }
  }
};
</script>
<style scoped>
.cardContainer {
  overflow-x: hidden;
  position: relative;
}
</style>
