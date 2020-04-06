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
    <point-list
      :width="width"
      :numOfCards="numOfCards"
      ref="point-list"
      :selectedIndex="selectedIndex"
    />
  </div>
</template>
<script>
import PointList from "./PointList";
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
      interval: null, // 轮播setInterval的返回结果，用于重置轮播
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
    autoInterval: {
      type: Number,
      default: 0 // 0代表不自动播放
    },
    isVertical: {
      type: Boolean,
      default: false // 默认横向滚动
    }
  },
  components: {
    PointList
  },
  provide() {
    return {
      cardMargin: this.cardMargin,
      cardWidth: this.cardWidth,
      cardHeight: this.cardHeight,
      onCardMounted: this.onCardMounted,
    };
  },
  mounted() {},
  computed: {
    numOfCards() {
      return this.cardList.length > 0 ? this.cardList.length : -1;
    }
  },
  methods: {
    onCardMounted(card) {
      this.cardList.push(card);
      this.selectedIndex = 0;

      if (this.cardList.length === 1)
        this.cardList[0].setLeft(0);
      else
        this.cardList[this.cardList.length - 1].setLeft(-this.width);
    },
    onTouchStart(e) {
      /* console.log("滑动开始");
      console.log(e.touches.length);
      console.log(e.touches[0].clientX); */

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
      /* console.log("滑动中");
      console.log(e.touches.length);
      console.log(e.touches[0].clientX); */
      if (!e.touches)
        return;

      let offset = e.touches[0].clientX - this.lastPosition;
      //console.log("offset:" + offset + " slideDistance:" + (e.touches[0].clientX - this.lastPosition));

      this.sumOffset += offset;
      this.cardList[this.selectedIndex].slide(offset);

      if (this.cardList[this.selectedIndex - 1])
        this.cardList[this.selectedIndex - 1].slide(offset);

      if (this.cardList[this.selectedIndex + 1])
        this.cardList[this.selectedIndex + 1].slide(offset);

      /* if (this.sumOffset >= 0) {
        // 往右边划的
        if (this.cardList[this.selectedIndex + 1]) {
          this.cardList[this.selectedIndex + 1].setLeft(this.width);
        }

        if (this.cardList[this.selectedIndex - 1]) {
          this.cardList[this.selectedIndex - 1].slide(offset);
        }
      } else {
        // 往左边划
        if (this.cardList[this.selectedIndex + 1]) {
          this.cardList[this.selectedIndex + 1].slide(offset);
        }

        if (this.cardList[this.selectedIndex - 1]) {
          this.cardList[this.selectedIndex - 1].setLeft(-this.width);
        }
      } */

      this.lastPosition = e.touches[0].clientX;
    },
    onTouchEnd(e) {
      //console.log("滑动结束");
      /* console.log(e.touches.length);
      console.log(e.touches[0].clientX); */

      //let offset = e.touches[0].clientX - this.lastPosition;

      //this.sumOffset += offset;
      console.log("onTouchEnd offset: " + this.sumOffset);
      if (this.sumOffset < -100 && this.cardList[this.selectedIndex + 1]) {
        // 往右边划到下一个
        //this.cardList[this.selectedIndex].slideToRight();

        this.cardList[this.selectedIndex].slideToSide(-1);
        this.cardList[this.selectedIndex + 1].slideToCenter();

        ++this.selectedIndex;
      } else if (
        this.sumOffset > 100 &&
        this.cardList[this.selectedIndex - 1]
      ) {
        console.log("往左滑到下一个");
        // 往左边滑到下一个
        //this.cardList[this.selectedIndex].slideToLeft();
        this.cardList[this.selectedIndex].slideToSide(1);
        this.cardList[this.selectedIndex - 1].slideToCenter();

        --this.selectedIndex;
      } else {
        console.log("惯性回位");
        // 惯性回位
        if (this.cardList[this.selectedIndex - 1]) {
          //this.cardList[this.selectedIndex - 1].slideToLeft();
          this.cardList[this.selectedIndex - 1].slideToSide(-1);
        }

        if (this.cardList[this.selectedIndex + 1]) {
          //this.cardList[this.selectedIndex + 1].slideToRight();
          this.cardList[this.selectedIndex + 1].slideToSide(1);
        }

        this.cardList[this.selectedIndex].slideToCenter();
      }

      this.sumOffset = 0;
      this.lastPosition = 0;
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
