<template>
  <div :class="slideClass" :style="slideCardStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slideClass: "",
      slideCardStyle: {
        height: this.cardHeight + "px",
        width: this.cardWidth + "px",
        position: "absolute",
        transform: "translateX(" + this.left + "px)",
        transitionDuration: "0"
      },
      left: -this.cardWidth
    };
  },
  inject: {
    cardMargin: {
      type: Number,
      default: 0
    },
    cardWidth: {
      type: Number,
      default: 750
    },
    cardHeight: {
      type: Number,
      default: 200
    },
    onCardMounted: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
    // 告诉父容器，挂载上了
    if (this.onCardMounted) this.onCardMounted(this);
  },
  methods: {
    slide(offset) {
      // 根据偏移量移动，传入的是百分比去掉百分号
      this.left += offset;

      this.slideCardStyle = {
        ...this.slideCardStyle,
        transform: "translateX(" + this.left + "px)",
        transitionDuration: "0",
      };
    },
    setLeft(left) {
      this.left = left;
      this.slideCardStyle = {
        ...this.slideCardStyle,
        transform: "translateX(" + this.left + "px)",
        transitionDuration: "0",
      };
    },
    slideToCenter() {
      // 把卡片滑动到中间
      console.log("slideToCenter");
      this.left = 0;
      this.slideCardStyle = {
        ...this.slideCardStyle,
        transform: "translateX(" + this.left + "px)",
        transitionDuration: "0.5s",
      };
    },
    slideToSide(direction) {
      // 把卡片滑动到两边
      if (direction > 0) {
        console.log("slideToRight");
        this.left = this.cardWidth;
        this.slideCardStyle = {
          ...this.slideCardStyle,
          transform: "translateX(" + this.left + "px)",
          transitionDuration: "0.5s",
        };
      } else {
        console.log("slideToLeft");
        this.left = -this.cardWidth;
        this.slideCardStyle = {
          ...this.slideCardStyle,
          transform: "translateX(" + this.left + "px)",
          transitionDuration: "0.5s",
        };
      }
    }
  }
};
</script>
<style>
.slideCard {
  position: absolute;
}
.slideToCenter {
  animation: slideToCenter 1s;
  -webkit-animation: slideToCenter 1s;
  /* transform: translateX(0);
  transition-duration: .6s; */
  animation-fill-mode: forwards;
}
.slideToLeft {
  animation: slideToLeft 1s;
  -webkit-animation: slideToLeft 1s;
  /* transform: translateX(-100%);
  transition-duration: .6s; */
  animation-fill-mode: forwards;
}
.slideToRight {
  animation: slideToRight 1s;
  -webkit-animation: slideToRight 1s;
  /* transform: translateX(100%);
  transition-duration: .6s; */
  animation-fill-mode: forwards;
}
@keyframes slideToCenter {
  to {
    left: 0;
    animation-fill-mode: forwards;
  }
}
@keyframes slideToLeft {
  to {
    left: -100%;
    animation-fill-mode: forwards;
  }
}
@keyframes slideToRight {
  to {
    left: 100%;
    animation-fill-mode: forwards;
  }
}
</style>
