<template>
    <div class="bg-white">
        <div class="pt-6">

            <!-- Product info -->
            <div
                class="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
                <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Users</h1>
                </div>

                <!-- Options -->
                <User 
                v-if="user"
                @userAddEvent="handleUserAddEvent" 
                @userRemoveEvent="handleUserRemoveEvent"
                :user="user"/>

                <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    <div class="mt-10">
                        <div class="mt-4">
                            <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                                <li 
                                class="text-gray-400" v-for="user in users">
                                    <span 
                                    class="text-gray-600 cursor-pointer hover:text-blue-400" 
                                    @click="selectUser(user)"
                                    >{{ user.name }}</span>
                                    <span v-if="user?.is_added" class="text-sm text-gray-400">
                                        User is added
                                    </span>
                                    <button
                                    v-if="user?.is_added"
                                    @click="goToUser(user.id)"
                                    class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                                        Go to user
                                    </button>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from '@/components/User.vue';
import config from '@/config.js';
import { mapGetters } from 'vuex';

    export default {
        name: 'Home',
        components: {
            User
        },
        data() {
            return {
                users: [],
                loading: false,
                error: null,
                user: null
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
            },
            selectUser(user) {
                this.user = user;
            },
            handleUserAddEvent(user) {
                const userX = this.users.find(user_data => user_data.id === user.userId);
                if(userX) {
                    userX.is_added = true;
                }
            },
            handleUserRemoveEvent(user) {
                const userX = this.users.find(user_data => user_data.id === user.userId);
                if(userX) {
                    userX.is_added = false;
                }
            },
            goToUser(userId) {
                this.$router.push({ name: 'User', params: { id: userId } })
            }
        }, 
        computed: {
            ...mapGetters({
                isAuthenticated: 'auth/isAuthenticated',
            }),
        }
    }
</script>
  