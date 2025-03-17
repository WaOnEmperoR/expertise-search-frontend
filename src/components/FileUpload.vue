<template>
  <div class="px-6 py-8">
    <div class="flex justify-between container mx-auto">
      <div class="w-full lg:w-8/12">
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
              label="Upload Image file"
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
        <fwb-toggle v-model="isDark" label="Toggle Dark/Light Mode" />
        <div>
          <p>Pilih Model</p>
          <div class="flex flex-col">
            <fwb-radio
              v-model="picked"
              name="radio"
              label="AID"
              value="aid"
              :disabled="isDisabled"
            />
            <fwb-radio
              v-model="picked"
              name="radio"
              label="UC-Merced"
              value="ucm"
              :disabled="isDisabled"
            />
          </div>
        </div>
        <!-- <fwb-file-input
          v-model="file"
          label="Upload file"
          @change="selectedFile"
        />
        <p v-if="file === null">Belum ada berkas yang dipilih</p>
        <fwb-button gradient="green-blue" size="md" @click="sumbitFile"
          >Submit File</fwb-button
        > -->
        <div>
          <fwb-input
            v-model="classAssigned"
            class="bg-green-200"
            block-classes="border-2 border-green-500 p-2 rounded-lg"
            disabled
            label="Klasifikasi Citra"
            placeholder="kelas citra masukan"
          />
        </div>
        <div v-if="isLoading === true" class="bg-blue-500 p-4 text-white">
          <div class="flex items-center justify-center h-24">
            <fwb-spinner size="10" color="purple" />
          </div>
        </div>
        <div class="flex items-center justify-center h-24 bg-gray-100">
          <div class="border p-2 mt-3">
            <p>Pratinjau Citra:</p>
            <template v-if="preview">
              <img :src="preview" class="img-fluid" />
              <!-- <p class="mb-0">file name: {{ image.name }}</p>
            <p class="mb-0">size: {{ image.size / 1024 }}KB</p> -->
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dark {
  background: #23232e;
  color: #fff;
}
</style>

<script setup>
import { ref } from "vue";
import {
  FwbFileInput,
  FwbInput,
  FwbButton,
  FwbToggle,
  FwbSpinner,
  FwbProgress,
  FwbRadio,
} from "flowbite-vue";
import axios from "axios";
import { useDark, useToggle } from "@vueuse/core";
import jsonData from "../assets/classes.json";

// const toggle = ref(false);
const isDark = useDark();

const toggleDark = useToggle(isDark);
</script>

<script>
const file = ref(null);
const picked = ref("aid");
let controller;

export default {
  data() {
    return {
      preview: null,
      isLoading: false,
      isDisabled: false,
      aidClasses: jsonData["aid"],
      ucmClasses: jsonData["uc_merced"],
      submitOrCancel: "Submit",
      classAssigned: "Neon",
    };
  },
  methods: {
    selectedFile() {
      if (file) {
        console.log("selected a file");
        console.log(file);

        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(file.value);
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
        this.isDisabled = false;
        this.submitOrCancel = "Submit";
      }

      this.isLoading = true;
      this.isDisabled = true;
      this.submitOrCancel = "Cancel Request";

      const formData = new FormData();
      formData.append("file", file.value);
      formData.append("model", picked.value);

      axios
        .post(
          "https://tf-api-321200458757.asia-southeast2.run.app/predict/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            signal: controller.signal,
          }
        )
        .then((response) => {
          // console.log(response.data); // Handle successful upload response

          var pred = response.data.prediction[0];

          // console.log(pred);

          var maxi = 0.0;
          var idxMaxi = 0;
          for (let j = 0; j < pred.length; j++) {
            if (pred[j] > maxi) {
              maxi = pred[j];
              idxMaxi = j;
            }
          }

          var assignedClass = "unclassified";

          switch (picked.value) {
            case "aid":
              assignedClass = this.aidClasses[idxMaxi];
              break;
            case "ucm":
              assignedClass = this.ucmClasses[idxMaxi];
              break;
            default:
              break;
          }

          // console.log(assignedClass);
          this.classAssigned = assignedClass;
        })
        .catch((error) => {
          console.error(error); // Handle upload errors
        })
        .finally(() => {
          this.isLoading = false;
          this.isDisabled = false;
          this.submitOrCancel = "Submit";
        });
    },
  },
};
</script>