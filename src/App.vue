<template>
  <div id="app">
    <slide-container >

      <slide-card>
        <div style="width: 750px;height: 100%;background-color: red"/>
      </slide-card>

      <slide-card>
        <div style="width: 750px;height: 100%;background-color: blue"/>
      </slide-card>

      <slide-card>
        <div style="width: 750px;height: 100%;background-color: purple"/>
      </slide-card>

    </slide-container>
  </div>
</template>

<script>
import SlideContainer from "./components/SlideContainer";
import SlideCard from "./components/SlideCard";

export default {
  name: 'App',
  components: {
    SlideContainer,
    SlideCard,
  }
}
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
body{
  margin: 0;
}
</style>
