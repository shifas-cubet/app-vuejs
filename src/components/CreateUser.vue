<template>
    <div class="bg-white">
        <div class="p-6">
            <form @submit.prevent="onHandleSubmit">
                <div class="space-y-12">

                    <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.
                        </p>

                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <label for="first-name"
                                    class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div class="mt-2">
                                    <input type="text" v-model="form.name" name="first-name" id="first-name"
                                        autocomplete="given-name"
                                        required
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Job</label>
                                <div class="mt-2">
                                    <input type="text" v-model="form.job" name="last-name" id="last-name"
                                        autocomplete="family-name"
                                        required
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" v-on:click="resetForm"
                        class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ btnName }}</button>
                </div>

                <div class="mt-2 p-2 text-red-600" v-if="errorObj.hasError">
                    {{ errorObj.message }}
                </div>

                <div class="mt-2 p-2 text-green-500" v-if="showSuccessMessage">
                    Success
                </div>


            </form>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue';
import config from '@/config';
import { useRouter } from 'vue-router';
import { inject } from 'vue'
import { computed } from '@vue/reactivity';

export default {
    name: 'Create User',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {

        const isUpdate = reactive({
            value: false
        })

        const { id } = props;

        onMounted(async () => {
            if(isUpdating.value) {
                isUpdate.value = true;
                await getUser();
            }
        })

        const router = useRouter();

        const form = reactive({
            name: '',
            job: ''
        });

        const errorObj = reactive({
            message: '',
            hasError: false,
        });

        const showSuccessMessage = ref(false); 

        const $axios = inject('axios');

        const handleSubmit = async () => {
            try {
                await $axios.post(`${config.regressAPIBaseURL}/api/users`, {
                    name: form.name,
                    job: form.job
                });
                errorObj.message = null;
                errorObj.hasError = false; 
                showSuccessMessage.value = true;

                setTimeout(() => {
                    router.push('/');
                }, 1000)

            } catch(error) {
                console.log(error);
                errorObj.message = 'Something went wrong';
                errorObj.hasError = true; 
                showSuccessMessage.value = false;
            }
            
        }

        const handleUpdate = async () => {
            try {
                await $axios.put(`${config.regressAPIBaseURL}/api/users/${id}`, {
                    name: form.name,
                    job: form.job
                });
                errorObj.message = null;
                errorObj.hasError = false; 
                showSuccessMessage.value = true;

                setTimeout(() => {
                    router.push('/');
                }, 1000)

            } catch(err) {
                console.log(error);
                errorObj.message = 'Something went wrong';
                errorObj.hasError = true; 
                showSuccessMessage.value = false;
            }
        }

        const resetForm = () => {
            form.name = '';
            form.job = '';
        }

        const getUser = async () => {
            try {
                const response = await $axios.get(`${config.regressAPIBaseURL}/api/users/${id}`);
                const data = response.data.data;
                form.name = data.first_name;
                form.job = data.last_name;
            } catch (error) {

            }
        }

        const isUpdating = computed(() => {
            return id ? true: false;
        });

        const onHandleSubmit = () => {
            if(isUpdate.value) {
                handleUpdate()
            } else {
                handleSubmit()
            }
        }

        const btnName = computed(() => {
            if(isUpdate.value) {
                return 'Update'
            } else {
                return 'Save'
            }
        });

        return {
            form,
            errorObj,
            handleSubmit,
            handleUpdate,
            resetForm,
            showSuccessMessage,
            isUpdate,
            isUpdating,
            onHandleSubmit,
            btnName
        }


    }
}
</script>
