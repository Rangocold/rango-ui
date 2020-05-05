<template>
  <div id="app">
    <slide-container :auto="1000" v-if="isFirstSwipe" :isIndicator="true" :onIndexChange="onIndexChange">
      <slide-card>
        <div style="width: 600px;height: 100%;background-color: red" />
      </slide-card>

      <slide-card>
        <div style="width: 600px;height: 100%;background-color: blue" />
      </slide-card>

      <slide-card>
        <div style="width: 600px;height: 100%;background-color: purple" />
      </slide-card>
    </slide-container>

    <indicator-list :width="750" :numOfIndicators="3" :selectedIndex="indicatorIndex"/>

<!--     <slide-container :auto="1000" v-if="!isFirstSwipe">
      <slide-card>
        <div style="width: 600px;height: 100%;background-color: pink" />
      </slide-card>

      <slide-card>
        <div style="width: 600px;height: 100%;background-color: yellow" />
      </slide-card>

      <slide-card>
        <div style="width: 600px;height: 100%;background-color: black" />
      </slide-card>
    </slide-container> -->

    <div style="height: 0.1rem;width: 0.1rem;background-color: green" @click="switchSwipe">switchSwipe</div>
  </div>
</template>

<script>
/* import SlideContainer from "./components/SlideContainer/SlideContainer";
import SlideCard from "./components/SlideContainer/SlideCard";
import IndicatorList from "./components/Indicator/IndicatorList"; */

export default {
  name: "App",
  data() {
    return {
      isFirstSwipe: true,
      indicatorIndex: 0,
    };
  },
  methods: {
    switchSwipe() {
      this.isFirstSwipe = !this.isFirstSwipe;
    },
    onIndexChange(index){
      this.indicatorIndex = index;
    },
  },
  components: {
    /* SlideContainer,
    SlideCard,
    IndicatorList, */
  }
};
</script>

<style>
#app {
  /*   font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
body {
  margin: 0;
}
</style>
