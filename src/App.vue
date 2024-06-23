<template>
  <div class="box">
    <Weather />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import eventBus from './services/eventBus';
import Weather from './components/WeatherSection.vue';

export default {
  name: 'App',
  components: {
    Weather,
  },
  data() {
    return {

    }
  },
  methods: {
    deleteRecord: function (fruitId) {
      let fruitIndex = this.fruits.findIndex(fruit => fruit.id == fruitId);
      this.fruits.splice(fruitIndex, 1);

      // console.log(fruitIndex);
    },
    bananaToKale() {
      for (const fruit of this.fruits) {
        if (fruit.name == "Bananas") {
          fruit.name = "Kale";
        }
      }
    },
  },
  created: function () {
    eventBus.$on('changeBTK', () => {
      this.bananaToKale();
    });
  },
}
</script>

<style scoped>
</style>
