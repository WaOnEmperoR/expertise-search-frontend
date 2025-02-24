<template>
  <fwb-button @click="showModal"> Open modal </fwb-button>

  <fwb-modal v-if="isShowModal" @close="closeModal" size="sm" not-escapable="true">

    <template #body>
      <div class="flex justify-between">
        <img src="../assets/images/ZZ5H.gif" />
      </div>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    </template>

  </fwb-modal>

  <div class="px-6 py-8">
    <div class="flex justify-between container mx-auto">
      <div class="w-full lg:w-8/12">
        <div class="mt-6" v-for="post in posts_selected" :key="post.id">
          <Article :data="post"></Article>
        </div>

        <div class="mt-8">
          <fwb-pagination
            v-model="currentPage"
            :total-items="elemTotal"
            :show-labels="false"
          >
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FwbCard, FwbModal, FwbPagination, FwbButton } from "flowbite-vue";
import { ref } from "vue";
import Article from "./Article.vue";
</script>

<script>
import axios from "axios";

const isShowModal = ref(false);

function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}

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
    showModal();

    axios
      .get("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => {
        this.posts = response.data;
        this.posts_selected = this.posts.slice(
          (this.pageNow - 1) * 10,
          (this.pageNow - 1) * 10 + 10
        );

        this.elemTotal = this.posts.length;
      })
      .catch((err) => {
        console.log(err);
        // isShowModal.value = false;
      })
      .finally(() => {
        closeModal();
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