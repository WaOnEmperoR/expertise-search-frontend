<template>
  <fwb-progress :progress="progVal" />

  <fwb-button gradient="green-blue" size="md" @click="increaseProgress"
    >Increase Progress</fwb-button
  >

  <fwb-button gradient="green-blue" size="md" @click="submitPostDynamic"
    >Submit Post Dynamic</fwb-button
  >
</template>

<script setup>
import { ref, toHandlers } from "vue";
import axios from "axios";
import { FwbProgress, FwbButton } from "flowbite-vue";
</script>

<script>
export default {
  data() {
    return {
      progVal: 0,
      reqList: [
        { title: "Alice", body: "HHH", userId: 1 },
        { title: "Bob", body: "III", userId: 2 },
        { title: "Charles", body: "JJJ", userId: 3 },
      ],
    };
  },
  methods: {
    increaseProgress() {
      this.progVal += 10;
    },
    submitPostDynamic() {
      const requests = [
        axios.post("https://jsonplaceholder.typicode.com/posts", {
          title: "Alice",
          body: "HHH",
          userId: 1,
        }),
        axios.post("https://jsonplaceholder.typicode.com/posts", {
          title: "Bob",
          body: "III",
          userId: 2,
        }),
        axios.post("https://jsonplaceholder.typicode.com/posts", {
          title: "Charles",
          body: "JJJ",
          userId: 3,
        }),
        axios.post("https://jsonplaceholder.typicode.com/posts", {
          title: "Donna",
          body: "KKK",
          userId: 4,
        }),
      ];

      axios
        .all(requests)
        .then(
          axios.spread((...responses) => {
            responses.forEach((response, index) => {
              console.log(`Data from request ${index + 1}:`, response.data);
              this.progVal += 25;
            });
          })
        )
        .catch((errors) => {
          console.error("Error fetching data:", errors);
        });
    },
  },
};
</script>