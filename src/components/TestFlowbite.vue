<template>
  <div class="px-6 py-8">
    <div class="flex justify-between container mx-auto">
      <div class="w-full lg:w-8/12">
        <fwb-card
          img-alt="Desk"
          img-src="https://flowbite.com/docs/images/blog/image-1.jpg"
          variant="image"
        >
          <div class="p-5">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Noteworthy technology acquisitions 2021
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </fwb-card>
      </div>
    </div>

    <!-- <fwb-footer>
      <fwb-footer-copyright
        by="Flowbite™"
        href="https://flowbite.com/"
        copyright-message="All Rights Reserved."
      />
    </fwb-footer> -->
  </div>
</template>

<script setup>
import { FwbCard, FwbFooter, FwbFooterCopyright } from "flowbite-vue";
</script>