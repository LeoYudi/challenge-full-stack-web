<template>
  <div
    class="d-flex justify-center bg-grey-lighten-2 pa-2 mb-5"
    style="height: 44px"
  >
    {{ title }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>();
</script>
