<template>
    <v-text-field
      autofocus
      variant="solo"
      :label="$t('zipLable')"
      append-inner-icon="mdi-magnify"
      @click:append-inner="$emit('search')"
    />
</template>

<script setup>
</script>