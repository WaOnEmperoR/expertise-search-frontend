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
          <download-csv :data="json_data">
            <img src="../assets/images/download_icon.png" width="50" height="50">
          </download-csv>
        </div>
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

          <div class="flex items-center justify-center h-24 bg-gray-100">
            <div v-if="isLoading === true" class="bg-blue-500 p-4 text-white">
              <fwb-spinner size="10" color="purple" />
            </div>
            <div v-if="resTable !== null">
              <fwb-table>
                <fwb-table-head>
                  <fwb-table-head-cell>No</fwb-table-head-cell>
                  <fwb-table-head-cell>Filename</fwb-table-head-cell>
                  <fwb-table-head-cell>Class</fwb-table-head-cell>
                  <fwb-table-head-cell>Score</fwb-table-head-cell>
                </fwb-table-head>
                <fwb-table-body>
                  <fwb-table-row
                    v-for="(element, index) in resTable"
                    :key="element.filename"
                  >
                    <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
                    <fwb-table-cell>{{ element.filename }}</fwb-table-cell>
                    <fwb-table-cell>{{ element.class }}</fwb-table-cell>
                    <fwb-table-cell>{{ element.score }}</fwb-table-cell>
                  </fwb-table-row>
                </fwb-table-body>
              </fwb-table>
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
import jsonData from "../assets/classes.json";

import {
  FwbFileInput,
  FwbButton,
  FwbToggle,
  FwbSpinner,
  FwbProgress,
  FwbRadio,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
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
      aidClasses: jsonData["aid"],
      ucmClasses: jsonData["uc_merced"],
      isDisabled: false,
      resTable: null,
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010",
          },
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244",
          },
        },
      ],
    };
  },
  methods: {
    selectedFile() {
      if (file) {
        console.log("selected a file");
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

      this.resTable = null;
      this.isLoading = true;
      this.isDisabled = true;
      this.submitOrCancel = "Cancel Request";

      var classPreds = [];

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
          console.log(response.data.results); // Handle successful upload response

          var results = response.data.results;

          for (let i = 0; i < results.length; i++) {
            var filename = results[i].filename;
            var preds = results[i].prediction[0];

            var maxi = 0.0;
            var idxMaxi = 0;
            for (let j = 0; j < preds.length; j++) {
              if (preds[j] > maxi) {
                maxi = preds[j];
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

            classPreds.push({
              filename: filename,
              score: maxi,
              class: assignedClass,
            });
          }

          console.log(classPreds);

          this.resTable = classPreds;
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