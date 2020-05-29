<template>
  <h1>Viewing Episode: {{ series }}/{{ episode }}</h1>
</template>

<script lang="ts">
export default {
  validate({ params }: { params: any }) {
    console.log(params);
    return true;
  },
  data() {
    return {
      series: this.$route.params.series,
      episode: this.$route.params.episode
    };
  }
};
</script>

<style></style>
