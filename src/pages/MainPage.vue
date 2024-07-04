<template>
  <v-toolbar :title="$t('title')"></v-toolbar>

  <v-container>
    <search></search>
    
  </v-container>
</template>
<script setup >
import { Search } from "@/components";
</script>