<template>
    <div class="mt-4 lg:row-span-3 lg:mt-0">
        <h2 class="sr-only">Product information</h2>
        <div class="bg-white sm:py-2">
            <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8">
                <ul role="list" class="grid gap-x-8 gap-y-12 sm:gap-y-16">
                    <li>
                        <div class="flex items-center gap-x-6">
                            <img class="h-16 w-16 rounded-full"
                                :src="user.avatar"
                                alt="">
                            <div>
                                <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">{{ user.first_name }} {{ user.last_name }}
                                </h3>
                                <p class="text-sm font-semibold leading-6 text-indigo-600">{{ user.email }}</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-center py-2">
                            <button 
                            v-if="!user.is_added"
                            @click="addUser(user.id)"
                            class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">Add User</button>


                            <button 
                            v-if="user.is_added"
                            @click="removeUser(user.id)"
                            class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">Remove User</button>


                        </div>
                    </li>

                    <!-- More people... -->
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'User',
    props: {
        user: Object
    },
    methods: {
        addUser(userId) {
            this.$emit('userAddEvent', {userId});
        },
        removeUser(userId) {
            this.$emit('userRemoveEvent', {userId});
        }
    }
}
</script>