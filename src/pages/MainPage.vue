<template>
  <v-toolbar color="primary" :title="'map view'"></v-toolbar>
  <v-container>
    <search
      :zipCode="state.zipCode"
      searchLabel="Zip code"
      @update:zipCode="submit"
      class="search-class"
    />
    <div ref="mapContainer" class="map-container" />
    <v-overlay
      v-model="state.loading"
      contained
      class="align-center justify-center"
    >
      <div class="d-flex justify-center">
        <v-progress-circular size="x-large" color="primary" indeterminate />
      </div>
      <h2 v-text="'Reading in progress...'" />
    </v-overlay>
    <alert
      v-if="state.showErrorAlert"
      v-model="state.showErrorAlert"
      :text="state.message"
      :color="'error'"
      :timeout="3000"
      @close="state.showErrorAlert = false"
    />
  </v-container>
</template>
<script setup>
import { Search, Alert } from "@/components";
import { onMounted, reactive, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { initializeMap, addGeoJSONLayer } from "@/mapbox";
import { getBoundaryByZipcode, getWeatherByZipcode } from "@/core/api";
import { storeInLocalStorage, getFromLocalStorage } from "@/core/storage";
import { validateZipCode } from "@/utils";
const route = useRoute();
const router = useRouter();
const mapContainer = ref(null);
const state = reactive({
  map: null,
  zipCode: "",
  loading: false,
  showErrorAlert: false,
  message: "",
});

state.zipCode = route.query.zipCode || "";
onMounted(async () => {
  await nextTick();
  state.map = initializeMap(mapContainer.value);
  if (state.zipCode && !validateZipCode(state.zipCode)) {
    state.message = "Please enter a valid zip code within the United States.";
    state.showErrorAlert = true;
  } else if (state.zipCode) {
    searchZipCode(state.zipCode);
  }
});

const getBoundary = async (zipCode) => {
  const cachedData = getFromLocalStorage(`geojson-${zipCode}`);
  if (cachedData) {
    return cachedData;
  }
  try {
    state.loading = true;
    const response = await getBoundaryByZipcode(zipCode);
    storeInLocalStorage(`geojson-${zipCode}`, response);
    return response;
  } catch (error) {
    console.error(error);
    state.message = error.response.data.error.message;
    state.showErrorAlert = true;
    throw error;
  } finally {
    state.loading = false;
  }
};

const getWeather = async (zipCode) => {
  const cachedData = getFromLocalStorage(`weather-${zipCode}`);
  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await getWeatherByZipcode(zipCode);
    storeInLocalStorage(`weather-${zipCode}`, response);
    return response;
  } catch (error) {
    console.error(error);
    state.message = ` Weather Error: ${error.response.data.error.message}`;
    state.showErrorAlert = true;
  }
};

const submit = (zip) => {
  if (!validateZipCode(zip)) {
    state.message = "Please enter a valid zip code within the United States.";
    state.showErrorAlert = true;
  } else {
    router.push({ path: "/", query: { zipCode: zip } });
    searchZipCode(zip);
  }
};

const searchZipCode = async (zip) => {
  try {
    const boundaryGeoJSON = await getBoundary(zip);
    const weatherData = await getWeather(zip);
    addGeoJSONLayer(state.map, boundaryGeoJSON, weatherData);
  } catch (error) {
    console.error(error);
    state.message = error.response.data.error.message;
    state.showErrorAlert = true;
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 800px;
}
.search-class {
  width: 300px;
}
</style>