<template>
  <b-img :src="appLogoImage" :alt="appName" width="200" />
</template>

<script>
import { BLink, BImg } from "bootstrap-vue";
import { $themeConfig } from "@themeConfig";

export default {
  components: {
    BLink,
    BImg,
  },
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app;
    return {
      appName,
      appLogoImage,
    };
  },
};
</script>

<style></style>
