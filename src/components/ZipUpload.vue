<template>
  <div class="px-6 py-8">
    <div class="flex justify-between container mx-auto">
      <div class="flex flex-col w-full">
        <div class="flex w-full">
          <!-- Your existing flex div content -->
          <div
            style="
              width: 90%;
              /* background-color: #f3f4f6; */
              padding: 0.5rem;
              margin-right: 0.15rem;
            "
          >
            <fwb-file-input
              v-model="file"
              label="Upload Zip file"
              @change="selectedFile"
            />
            <p v-if="file === null">Belum ada berkas yang dipilih</p>
          </div>
          <div
            style="
              width: 10%;
              /* background-color: #f3f4f6; */
              padding: 0.5rem;
              margin-left: 0.15rem;
              margin-top: 2rem;
            "
          >
            <fwb-button
              gradient="lime"
              size="md"
              @click="submitFile"
              class="w-full block flex-grow"
              >{{ submitOrCancel }}</fwb-button
            >
          </div>
        </div>
        <div>
          <p>Pilih Model</p>
          <div class="flex flex-col">
            <fwb-radio v-model="picked" name="radio" label="AID" value="aid" />
            <fwb-radio
              v-model="picked"
              name="radio"
              label="UC-Merced"
              value="ucm"
            />
          </div>

          <div class="flex items-center justify-center h-24 bg-gray-100">
            <div v-if="isLoading === true" class="bg-blue-500 p-4 text-white">
              <fwb-spinner size="10" color="purple" />
            </div>
          </div>
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
  FwbRadio,
} from "flowbite-vue";
import axios from "axios";
import { useDark, useToggle } from "@vueuse/core";
</script>

<script>
const file = ref(null);
const picked = ref("aid");
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
        console.log(picked.value);
      } else {
        console.log("no file selected");
      }
    },
    submitFile() {
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
      formData.append("model", picked.value);

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