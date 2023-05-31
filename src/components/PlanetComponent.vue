<template>
    <div v-if="loading">
        Loading...
    </div>
    <div v-if="Object.keys(planet).length !== 0">
      <h2>{{ planet.name }}</h2>
      <p>Climate: {{ planet.climate }}</p>
      <p>Terrain: {{ planet.terrain }}</p>
      <p>Population: {{ planet.population }}</p>
    </div>
    <div v-if="error">
        {{ error }}
    </div>
  </template>
  
  <script>
  import config from '@/config.js';
  export default {
    name: 'PlanetComponent',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        planet: {},
        loading: true,
        error: null
      }
    },
    created() {
        this.fetchPlanet();
    },
    methods: {
        async fetchPlanet() {
            try {
                const response = await this.$axios.get(`${config.apiBaseURL}/planets/${this.id}`);
                this.planet = response.data;
                this.loading = false;
            } catch (err) {
                this.error = err.message;
                console.error(err);
                this.loading = false;
            }
        }
    }
  }
  </script>
  