<template>
  <fwb-progress :progress="progVal" />

  <fwb-button gradient="green-blue" size="md" @click="increaseProgress"
    >Increase Progress</fwb-button
  >
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { FwbProgress, FwbButton } from "flowbite-vue";
</script>

<script>
const pg = ref(50);

export default {
  data() {
    return {
      progVal: 50,
    };
  },
  methods: {
    increaseProgress() {
      this.progVal += 10;
    },
  },
};
</script>