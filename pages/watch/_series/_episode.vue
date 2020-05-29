<template>
  <div>
    <h1>Viewing an Episode</h1>
    <pre>
    {{ videoData }}
    </pre>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      videoData: ''
    };
  },
  async fetch() {
    const videoData = await this.$database.exec(
      'SELECT * FROM video WHERE id = ?',
      [this.$route.params.episode]
    );
    console.log(videoData);
    this.videoData = videoData;
  }
};
</script>

<style></style>
