<template>
  <div class="point" :style="pointStyle"></div>
</template>
<script>
export default {
  data() {
    return {
      pointStyle: {
        left: this.left + "px",
        backgroundColor: "white",
      }
    };
  },
  props: ["left", "initPoint"],
  created(){
    console.log("point created");
  },
  mounted() {
    console.log("point mounted");
    if (this.initPoint && typeof this.initPoint === "function"){
      this.initPoint();
    }
  },
  computed: {},
  methods: {
    setSelectPoint(isSelected){
      if (isSelected){
        this.pointStyle = {
          ...this.pointStyle,
          backgroundColor: "black",
        }
      }
      else{
        this.pointStyle = {
          ...this.pointStyle,
          backgroundColor: "white",
        }
      }
    },
  },
};
</script>
<style scoped>
.point {
  position: absolute;
  bottom: 0;
  border-color: black;
  width: 16px;
  height: 16px;
}
</style>
