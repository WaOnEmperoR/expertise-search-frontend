<template>
  <div v-for="post in posts_selected" :key="post.id">
    <!-- <h2>{{ post.id }} {{ post.title }}</h2>
    <p>{{ post.body }}</p> -->
    <fwb-card>
      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ post.id }} {{ post.title }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {{ post.body }}
        </p>
      </div>
    </fwb-card>
  </div>

  <fwb-pagination v-model="currentPage" :total-items=elemTotal :show-labels="false">
    <template #prev-icon>⬅️</template>
    <template #next-icon>➡️</template>
    <template v-slot:page-button="{ page, setPage }">
      <button
        @click="
          setPage(page);
          performAction(currentPage);
        "
        class="flex items-center justify-center first:rounded-l-lg last:rounded-r-lg px-3 h-8 ml-0 leading-tight text-gray-500 bg-purple-200 border border-purple-300 hover:bg-purple-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        {{ page }}
      </button>
    </template>
  </fwb-pagination>
  Current page: {{ currentPage }}
</template>

<script setup>
import { FwbCard } from "flowbite-vue";
import { FwbPagination } from "flowbite-vue";
import { ref } from "vue";

const currentPage = ref(1);
</script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      posts_selected: [],
      pageNow: 1,
      elemTotal: 0,
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => {
        this.posts = response.data;
        this.posts_selected = this.posts.slice(
          (this.pageNow - 1) * 10,
          (this.pageNow - 1) * 10 + 10
        );

        this.elemTotal = this.posts.length;

      });

  },
  methods: {
    performAction(currentPage) {
      this.pageNow = currentPage;

      this.posts_selected = this.posts.slice(
        (this.pageNow - 1) * 10,
        (this.pageNow - 1) * 10 + 10
      );
    },
  },
};
</script>