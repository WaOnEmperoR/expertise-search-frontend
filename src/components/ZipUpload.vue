<template>
  <div class="px-6 py-8">
    <div class="flex justify-between container mx-auto">
      <div class="w-full lg:w-8/12">
        <fwb-file-input
          v-model="file"
          label="Upload file"
          @change="selectedFile"
        />
        <p v-if="file === null">Belum ada berkas yang dipilih</p>
        <fwb-button gradient="lime" size="md" @click="sumbitFile">{{
          submitOrCancel
        }}</fwb-button>
        <div v-if="isLoading === true">
          <fwb-spinner size="10" color="purple" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script setup>
import { ref } from "vue";
import {
  FwbFileInput,
  FwbButton,
  FwbToggle,
  FwbSpinner,
  FwbProgress,
} from "flowbite-vue";
import axios from "axios";
import { useDark, useToggle } from "@vueuse/core";
</script>

<script>
const file = ref(null);
let controller;

export default {
  data() {
    return {
      isLoading: false,
      submitOrCancel: "Submit",
      gradientColor: "green-blue",
    };
  },
  methods: {
    selectedFile() {
      if (file) {
        console.log("selected a file");
        console.log(file);
      } else {
        console.log("no file selected");
      }
    },
    sumbitFile() {
      controller = new AbortController();

      // Сondition to cancel the request at loading time. On the first pass or after canceling the download, the condition will not be satisfied
      if (this.isLoading) {
        controller.abort();

        // Toggle flag to stop fetching data
        this.isLoading = false;
        this.submitOrCancel = "Submit";
      }

      this.isLoading = true;
      this.submitOrCancel = "Cancel Request";

      const formData = new FormData();
      formData.append("file", file.value);
      formData.append("model", "aid");

      axios
        .post(
          "https://tf-api-321200458757.asia-southeast2.run.app/upload-zip-list/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            signal: controller.signal,
          }
        )
        .then((response) => {
          console.log(response.data); // Handle successful upload response
        })
        .catch((error) => {
          console.error(error); // Handle upload errors
        })
        .finally(() => {
          this.isLoading = false;
          this.submitOrCancel = "Submit";
        });
    },
  },
};
</script>