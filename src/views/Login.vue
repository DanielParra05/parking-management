<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 350px; height: 400px">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-sm text-center">
              Parking Management App
            </h4>
            <h4 class="text-h5 text-white q-my-md text-center">🚗🚧🛵</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-lg">
              <q-input
                ref="email"
                square
                clearable
                v-model="email"
                type="email"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                type="password"
                ref="password"
                square
                clearable
                v-model="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="secondary"
              class="full-width text-white"
              label="Log in"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
    };
  },
});
</script>
