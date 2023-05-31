<template>
    <div v-if="loading">
        Loading...
    </div>
    <div v-if="Object.keys(user).length !== 0">
      <h2>{{ user.first_name }}</h2>
      <p>{{ user.avatar }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-if="error">
        {{ error }}
    </div>
  </template>
  
  <script>
  import config from '@/config.js';
  export default {
    name: 'UserComponent',
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        user: {},
        loading: true,
        error: null
      }
    },
    created() {
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            try {
                const response = await this.$axios.get(`${config.regressAPIBaseURL}/api/users/${this.id}`);
                this.user = response.data.data;
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
  