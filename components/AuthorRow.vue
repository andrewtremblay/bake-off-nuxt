<template>
  <li>
    <router-link :to="author.key">
      <div>{{ author.name }}</div>
      <img v-bind:src="mainPhoto" alt="photo" class="mb-5" />
      <div>{{ authorText }}</div>
    </router-link>
  </li>
</template>

<script>
import { getAuthor } from "~/components/utils/author.js";
export default {
  props: ["author", "authorKey"],
  data() {
    return { dataAuthor: {}, authorText: "", mainPhoto: "" };
  },
  async fetch() {
    if (this.authorKey) {
      const { author: dataAuthor, mainPhoto, authorText } = await getAuthor(
        this.authorKey
      );
      this.mainPhoto = mainPhoto;
      this.dataAuthor = dataAuthor;
      this.authorText = authorText;
    }
  }
};
</script>
