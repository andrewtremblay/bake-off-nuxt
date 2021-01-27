<template>
  <div>
    <img v-bind:src="mainPhoto" alt="photo" class="mb-5" />
    <p>{{ JSON.stringify(author) }}</p>
    <p class="blockquote">
      {{ author.name }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: {}
    };
  },
  async asyncData({ params }) {
    const authorKey = params.key;
    const author = await fetch(
      `https://openlibrary.org/authors/${params.key}.json`
    ).then(res => res.json());
    let mainPhoto = "https://placeimg.com/300/300/people";
    if (author.photos && author.photos.length) {
      mainPhoto = `http://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`;
    }
    return { author, authorKey, mainPhoto };
  }
};
</script>
