<template>
  <div>
    <indicator v-for="(left, index) in indicatorsLeft" :key="left" :ref="'indicator' + index" :left="left" />
  </div>
</template>
<script>
import Indicator from "./Indicator";
export default {
  data() {
    return {
      indicatorsLeft: [],
    };
  },
  props: {
    width: {
      type: Number,
      default: 750,
    },
    numOfIndicators: {
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
    Indicator,
  },
  created() {
    console.log("indicator list created");
  },
  mounted() {
    console.log("indicator list mounted");
    if (this.$refs["indicator" + this.selectedIndex]){
      this.$refs["indicator" + this.selectedIndex][0].setSelectIndicator(true);
    }

    this.initIndicator();
  },
  computed: {},
  methods: {
    initIndicator(){
      if (this.$refs["indicator" + this.selectedIndex]){
        this.$refs["indicator" + this.selectedIndex][0].setSelectIndicator(true);
      }

      this.indicatorsLeft = [];
      let start = (this.width - (this.numOfIndicators * 2 - 1) * 16) / 2;
      for (let i = 0; i < this.numOfIndicators; ++i){
        this.indicatorsLeft.push(start + i * 32);
      }
    },
  },
  watch: {
    numOfIndicators(newVal) {
      this.indicatorsLeft = [];
      let start = (this.width - (newVal * 2 - 1) * 16) / 2;
      for (let i = 0; i < newVal; ++i){
        this.indicatorsLeft.push(start + i * 32);
      }
    },
    selectedIndex(newVal) {
      for (let i = 0; i < this.indicatorsLeft.length; ++i){
        if (i === newVal && this.$refs["indicator" + i]){
          this.$refs["indicator" + i][0].setSelectIndicator(true);
        }
        else if (i !== newVal && this.$refs["indicator" + i]){
          this.$refs["indicator" + i][0].setSelectIndicator(false);
        }
      }
    },
  }
};
</script>
<style scoped>
</style>
