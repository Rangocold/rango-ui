<template>
  <div class="indicator" :style="indicatorStyle"></div>
</template>
<script>
export default {
  data() {
    return {
      indicatorStyle: {
        left: this.left + "px",
        backgroundColor: "white",
      }
    };
  },
  props: ["left", "initIndicator"],
  created(){
    console.log("indicator created");
  },
  mounted() {
    console.log("indicator mounted");
    if (this.initIndicator && typeof this.initIndicator === "function"){
      this.initIndicator();
    }
  },
  computed: {},
  methods: {
    setSelectIndicator(isSelected){
      if (isSelected){
        this.indicatorStyle = {
          ...this.indicatorStyle,
          backgroundColor: "black",
        }
      }
      else{
        this.indicatorStyle = {
          ...this.indicatorStyle,
          backgroundColor: "white",
        }
      }
    },
  },
};
</script>
<style scoped>
.indicator {
  position: absolute;
  bottom: 0;
  border-color: black;
  width: 16px;
  height: 16px;
}
</style>
