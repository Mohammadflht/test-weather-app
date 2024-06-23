<template>
  <div class="box">
    <NavBar />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import eventBus from './services/eventBus';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
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
