<template>
  <div>
    <p v-if="authors.length === 0 && $fetchState.pending">
      Fetching...
    </p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <ul id="example-1">
            <AuthorRow
              v-for="a in authors"
              :key="a.key"
              v-bind:author="a"
              v-bind:authorKey="a.key"
            />
          </ul>
          <button @click="$fetch">Load More</button>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import AuthorRow from "~/components/AuthorRow.vue";
const itemsPerPage = 10;
export default {
  components: {
    AuthorRow
  },
  data() {
    return { authors: [], baseAuthorInfo: [], lastLoadedUrl: "", offset: 0 };
  },
  async fetch() {
    this.offset += itemsPerPage;
    this.lastLoadedUrl = `http://openlibrary.org/query.json?type=/type/author&*=&offset=${this.offset}&limit=${itemsPerPage}`;
    this.baseAuthorInfo = await fetch(this.lastLoadedUrl).then(res =>
      res.json()
    );
    this.authors = [...this.authors, ...this.baseAuthorInfo];
  }
};
</script>
