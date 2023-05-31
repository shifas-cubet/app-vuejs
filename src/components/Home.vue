<template>
    <div class="home">
        <h1>USERS</h1>
        <ul v-if="users.length > 0">
            <li v-for="user in users"
            :key="user.id"
            >
            <router-link :to="{name: 'User', params: {id: user.id}}">
                {{ user.name }}
            </router-link>
        </li>
        </ul>
        <div v-if="loading">Loading...</div>
        <div v-if="error">{{ error }}</div>
    </div>
</template>
  
<script>
import config from '@/config.js';
import { mapGetters } from 'vuex';

    export default {
        name: 'Home',
        data() {
            return {
                users: [],
                loading: false,
                error: null,
                // isAuthenticated: store.state.isAuthenticated
            }
        },
        created() {
            this.fetchUsers();
        },
        methods: {
            async fetchUsers() {
                this.loading = true;
                try {
                    const response = await this.$axios.get(`${config.regressAPIBaseURL}/api/users`);
                    const users = response.data.data.map((user) => {
                        const name = `${user.first_name} ${user.last_name}`;
                        return { ...user, name }; 
                    });
                    this.users = users;
                    this.loading = false;
                } catch (err) {
                    this.error = error.message;
                    this.loading = false;
                    console.error(err)
                }
            }
        }, 
        computed: {
            ...mapGetters({
                isAuthenticated: 'auth/isAuthenticated',
            }),
        }
    }
</script>
  
<style>
.home {
    max-width: 800px;
    margin: 0 auto;
}
</style>
  