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
        <p v-else-if="file != null">{{ file.name }}</p>
        <fwb-button gradient="green-blue" size="md" @click="sumbitFile"
          >Submit File</fwb-button
        >
        <div class="border p-2 mt-3">
          <p>Preview Here:</p>
          <template v-if="preview">
            <img :src="preview" class="img-fluid" />
            <!-- <p class="mb-0">file name: {{ image.name }}</p>
            <p class="mb-0">size: {{ image.size / 1024 }}KB</p> -->
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FwbFileInput, FwbButton } from "flowbite-vue";
import axios from "axios";
</script>

<script>
const file = ref(null);
// const preview = ref(null);

export default {
  data() {
    return {
      preview: null,
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
      }
      else
      {
        console.log("selected a file");
      }
    },
    sumbitFile() {
      const formData = new FormData();
      formData.append("file", file.value);

      axios
        .post(
          "https://tf-api-321200458757.asia-southeast2.run.app/predict/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data); // Handle successful upload response
        })
        .catch((error) => {
          console.error(error); // Handle upload errors
        });
    },
  },
};
</script>