<template>
  <p v-if="$fetchState.pending">
    Fetching authors...
  </p>
  <p v-else-if="$fetchState.error">
    An error occurred :(
  </p>
  <div v-else>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ul id="example-1">
          <li v-for="a in authors" :key="a.key">
            <router-link :to="a.key">
              {{ a.name }}
            </router-link>
          </li>
        </ul>
        <button v-on:click="nextPage">Load More</button>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import Logo from "~/components/Logo.vue";
// import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  // components: {
  //   Logo,
  //   VuetifyLogo
  // },
  data() {
    return { authors: [], offset: 0 };
  },
  methods: {
    async nextPage() {
      this.offset += 10;
      const authors = await fetch(
        `http://openlibrary.org/query.json?type=/type/author&*=&offset=${this.offset}&limit=10`
      ).then(res => res.json());
      const authorFetches = authors
        .filter(a => a.key)
        .map(a => {
          return fetch(`http://openlibrary.org${a.key}.json`).then(res =>
            res.json()
          );
        });
      const newAuthors = await Promise.all(authorFetches);
      this.authors = [...this.authors, ...newAuthors];
    }
  },
  async fetch() {
    const authors = await fetch(
      `http://openlibrary.org/query.json?type=/type/author&*=&offset=${this.offset}&limit=10`
    ).then(res => res.json());
    const authorFetches = authors
      .filter(a => a.key)
      .map(a => {
        return fetch(`http://openlibrary.org${a.key}.json`).then(res =>
          res.json()
        );
      });
    const newAuthors = await Promise.all(authorFetches);
    this.authors = [...this.authors, ...newAuthors];
  }
};
</script>
