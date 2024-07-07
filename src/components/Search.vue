<template>
  <div class="d-flex">
    <v-text-field
      v-model="localZipCode"
      autofocus
      variant="outlined"
      density="compact"
      :label="searchLabel"
      prepend-inner-icon="mdi-magnify"
    />
    <v-btn
      class="mt-1 ml-1"
      size="small"
      color="primary"
      :disabled="localZipCode == ''"
      @click="handleSubmit"
    >
      SEARCH
    </v-btn>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  zipCode: String,
  searchLabel: String,
});

const emits = defineEmits(["update:zipCode"]);

const route = useRoute();
const localZipCode = ref(props.zipCode || "");

watch(
  () => route.query.zipCode,
  (newZipCode) => {
    localZipCode.value = newZipCode || "";
  }
);

const handleSubmit = () => {
  emits("update:zipCode", localZipCode.value);
};
</script>