<template>
  <div>
    <img v-bind:src="mainPhoto" alt="photo" class="mb-5" />
    <p>{{ JSON.stringify(author) }}</p>
    <p>{{ authorText }}</p>
    <p class="blockquote">
      {{ author.name }}
    </p>
  </div>
</template>

<script>
import { getAuthor } from "~/components/utils/author.js";

export default {
  data() {
    return {
      author: {},
      authorKey: "",
      mainPhoto: "",
      authorText: ""
    };
  },
  async asyncData({ params }) {
    return getAuthor(params.key);
  }
};
</script>
