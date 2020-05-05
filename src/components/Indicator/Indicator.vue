<template>
  <div class="indicator" :style="indicatorStyle"></div>
</template>
<script>
import indicatorEmpty from "../../assets/indicatorEmpty.png";
import indicatorSelected from "../../assets/indicatorSelected.png";
export default {
  name: "indicator",
  data() {
    return {
      indicatorStyle: {
        left: this.left + "px",
        backgroundImage: "url(" + indicatorEmpty + ")",
        backgroundSize: "100% 100%",
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
          backgroundImage: "url(" + indicatorSelected + ")",
        }
      }
      else{
        this.indicatorStyle = {
          ...this.indicatorStyle,
          backgroundImage: "url(" + indicatorEmpty + ")",
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
