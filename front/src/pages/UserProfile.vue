<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { $api } from 'boot/axios';
import displayNotification from '@/utils/display-notification'

const authStore = useAuthStore();

const user = reactive({
  id: authStore.user.id,
  photo: authStore.user.photo,
  username: authStore.user.username,
  email: authStore.user.email,
  firstName: authStore.user.firstName,
  lastName: authStore.user.lastName,
  address: authStore.user.address,
  city: authStore.user.city,
  state: authStore.user.state,
  about: authStore.user.about,
});
console.log('User: ', user);

const file = ref(null)
const password_dict = ref({});
const passwordDialog = ref(false);

const changePassword = async () => {
  try {
    const response = await $api.get('/users/me');
    displayNotification('Password updated successfully', true);
  } catch (error) {
    displayNotification(`Failed to change password: ${error}`, false);
  }
};

const updateUserInfo = async () => {
  try {
    const data = {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      state: user.state,
      about: user.about,
    };
    const response = await $api.put(`/users/${user.id}`, data);
    authStore.$patch({ user: response.data });
    displayNotification('Info updated successfully', true);
  } catch (error) {
    displayNotification(`Failed to update info: ${error}`, false);
  }
};

const createFormData = (file) => {
  const formData = new FormData();

  formData.append('files', file);
  formData.append('ref', 'user');
  formData.append('refId', user.id);
  formData.append('source', 'users-permissions')
  formData.append('field', 'photo');

  return formData;
};

const onSubmit = async (file) => {
  const formData = createFormData(file);

  try {
    const response = await $api.post('/upload', formData);
    authStore.$patch(state => {
      state.user.photo = response.data[0]
    })
    user.photo = response.data[0]
    displayNotification('Photo added successfully', true);
  } catch (error) {
    displayNotification(`Failed to upload photo: ${error}`, false);
  }
};
</script>

<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card">
          <q-card-section class="text-h6">
            <div class="text-h6">Edit Profile</div>
            <div class="text-subtitle2">Complete your profile</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <!-- Profile picture -->
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <q-img
                      v-if="user.photo"
                      :src="user.photo.url"
                    />
                    <q-img
                      v-else
                      src="https://cdn.quasar.dev/img/boy-avatar.png"
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section side>
                  <q-file
                    v-model="file"
                    label="Select photo"
                    style="max-width: 120px"
                    dense
                  >
                    <template v-slot:prepend>
                      <q-icon name="image_search" />
                    </template>
                  </q-file>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    v-if="file"
                    label="Add Photo"
                    class="text-capitalize"
                    rounded
                    color="info"
                    style="max-width: 120px"
                    @click="onSubmit(file)"
                  />
                </q-item-section>
              </q-item>
              <!-- username -->
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="user.username"
                    label="User Name"
                  />
                </q-item-section>
              </q-item>
              <!-- email -->
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="user.email"
                    label="Email Address"
                  />
                </q-item-section>
              </q-item>
              <!-- First name -->
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="user.firstName"
                    label="First Name"
                  />
                </q-item-section>
              </q-item>
              <!-- Last name -->
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="user.lastName"
                    label="Last Name"
                  />
                </q-item-section>
              </q-item>
              <!-- Address -->
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    autogrow
                    dense
                    v-model="user.address"
                    label="Address"
                  />
                </q-item-section>
              </q-item>
              <!-- City -->
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="user.city"
                    label="City"
                  />
                </q-item-section>
              </q-item>
              <!-- State -->
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    v-model="user.state"
                    label="State"
                  />
                </q-item-section>
              </q-item>
              <!-- About -->
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    type="textarea"
                    dense
                    v-model="user.about"
                    label="About"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              @click="passwordDialog = true"
              class="text-capitalize bg-info"
            >Change Password</q-btn>
            <q-btn
              @click="updateUserInfo"
              class="text-capitalize bg-info"
            >Update User Info</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
