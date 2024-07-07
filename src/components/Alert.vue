<template>
  <div class="text-center">
    <v-snackbar :timeout="timeout" v-bind="$attrs" multi-line :color="color">
      {{ text }}
      <template v-slot:actions>
        <v-icon @click="$emit('close')" icon="mdi-close" />
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed, toRefs } from "@vue/runtime-core";

const emit = defineEmits(["update:value"]);

const props = defineProps({
  text: String,
  color: String,
  value: String,
  timeout: Number,
});

const { value } = toRefs(props);

const show = computed({
  get() {
    return value.value;
  },
  set(value) {
    emit("update:value", value);
  },
});
</script>