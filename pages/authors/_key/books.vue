<template>
  <div>
    <div v-if="endpointFailed">
      <p>
        Could not fetch <a :href="fetchedUrl">{{ fetchedUrl }}</a>
      </p>
      <p>message from server:</p>
      <p>{{ rawText }}</p>
    </div>
    <div v-else>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <ul id="example-1">
            <BookRow v-for="b in books" :key="b.key" v-bind:book="b" />
          </ul>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
//

import BookRow from "~/components/BookRow.vue";
import { getAuthorBooks } from "~/components/utils/author.js";
export default {
  components: {
    BookRow
  },
  data() {
    return { books: [], rawText: "", fetchedUrl: "" };
  },
  async asyncData({ params }) {
    return getAuthorBooks(params.key);
  }
};
</script>
