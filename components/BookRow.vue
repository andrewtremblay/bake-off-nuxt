<template>
  <li>
    <div>{{ book.title }}</div>
    <img v-bind:src="mainPhoto" alt="photo" class="mb-5" />
  </li>
</template>

<script>
export default {
  props: ["book"],
  data() {
    return { mainPhoto: "" };
  },
  async fetch() {
    let mainPhoto = "https://placeimg.com/300/300/animals";
    if (this.book.covers && this.book.covers.length) {
      mainPhoto = `http://covers.openlibrary.org/b/id/${this.book.covers[0]}-L.jpg`;
    }
    this.mainPhoto = mainPhoto;
  }
};
</script>
