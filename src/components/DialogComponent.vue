<template>
  <q-dialog v-model="alert" id="dialogComponent">
    <q-card>
      <q-card-section>
        <div class="text-h5">
          <q-icon
            v-if="type == `success`"
            class="text-green q-gutter-md"
            style="font-size: 2em; padding-left: 1%; padding-top: 2%"
            name="check_circle"
          />
          <q-icon
            v-if="type == `error`"
            class="text-red q-gutter-md"
            style="font-size: 2em; padding-left: 1%; padding-top: 2%"
            name="error"
          />
          {{ title }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none"> {{ message }} </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="OK"
          color="primary"
          v-close-popup
          @click="okButtonClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DialogComponent",

  props: { title: String, message: String, alert: Boolean, type: String },
  data() {
    return {};
  },
  methods: {
    okButtonClick() {
      this.$emit("ok-click");
    },
  },
});
</script>
