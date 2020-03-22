<template>
  <div>
    <point v-for="(left, index) in pointsLeft" :key="left" :ref="'point' + index" :left="left" :initPoint="initPoint"/>
  </div>
</template>
<script>
import Point from "./Point";
export default {
  data() {
    return {
      pointsLeft: [],
    };
  },
  props: {
    width: {
      type: Number,
      default: 750,
    },
    numOfCards: {
      type: Number,
      default: -1,
    },
    selectedIndex: {
      type: Number,
      default: 0,
    }
  },
  inject: {
    width: {
      type: Number,
      default: 750,
    }
  },
  components: {
    Point,
  },
  created() {
    console.log("point list created");
  },
  mounted() {
    console.log("point list mounted");
    if (this.$refs["point" + this.selectedIndex]){
      this.$refs["point" + this.selectedIndex][0].setSelectPoint(true);
    }
  },
  computed: {},
  methods: {
    initPoint(){
      if (this.$refs["point" + this.selectedIndex]){
        this.$refs["point" + this.selectedIndex][0].setSelectPoint(true);
      }
    },
  },
  watch: {
    numOfCards(newVal) {
      this.pointsLeft = [];
      let start = (this.width - (newVal * 2 - 1) * 16) / 2;
      for (let i = 0; i < newVal; ++i){
        this.pointsLeft.push(start + i * 32);
      }
    },
    selectedIndex(newVal) {
      for (let i = 0; i < this.pointsLeft.length; ++i){
        if (i === newVal && this.$refs["point" + i]){
          this.$refs["point" + i][0].setSelectPoint(true);
        }
        else if (i !== newVal && this.$refs["point" + i]){
          this.$refs["point" + i][0].setSelectPoint(false);
        }
      }
    },
  }
};
</script>
<style scoped>
</style>
