<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>{{ message }}</h3>
    <button @click="incrementCount">+</button>
    <button @click="decrementCount">-</button>
    <p>Count : {{ getCount }}</p>
    <p v-if="isBoom">Boom</p>  

    <input type="number" v-model="newCount" />
    <button @click="submitCount">Submit</button>


    <div v-if="planets.length>0">
        <h2>Planets</h2>
        <ul>
          <li v-for="planet in planets" :key="planet.name">
         
              {{ planet.name }}
          </li>
        </ul>
        <button>
          PREV
        </button>
        <button>
          NEXT
        </button>
    </div>


  </div>
</template>

<script>

import { defineProps, ref, onMounted, onUpdated, computed } from 'vue';
import { mapState } from 'vuex';

import { store } from '../store'; // import Vuex store

export default {
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  
  setup(props) {
    const message = ref('Hello Vue!')
    const newCount = ref(0);
    const planets = ref([]);
    const API_BASE_URL = 'http://swapi.dev/api';

    onMounted(() => {
      console.log('Component mounted');
      fetch(`${API_BASE_URL}/planets`)
        .then(response => response.json())
        .then((data) => {
          console.log(data.results);
          planets.value = data.results;
        })
        .catch((err) => console.error(err));
    })

    onUpdated(() => {
      console.log('Component updated');
      console.log('count value:', store.state.count);
    })

    const incrementCount = () => {
      console.log('incrementing count');
      store.commit('increment');
    }

    const decrementCount = () => {
      console.log('decrementing count');
      store.commit('decrement')
    }

    const isBoom = computed(() => {
      return store.state.count !== 0 && store.state.count % 5 === 0;
    });

    const submitCount = () => {
      console.log('submitting count');
      store.commit('setCount', newCount.value);
    }

    const getCount = computed(() => {
      return store.state.count;
    });

    return {
      message,
      count: store.state.count,
      newCount,
      incrementCount,
      decrementCount,
      isBoom,
      getCount,
      submitCount,
      planets
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
