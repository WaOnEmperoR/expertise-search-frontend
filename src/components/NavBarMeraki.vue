<template>
  <nav class="bg-white px-6 py-4 shadow">
    <div
      class="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between"
    >
      <div class="flex justify-between items-center">
        <div>
          <a class="text-gray-800 text-xl font-bold md:text-2xl" href="#"
            >Meraki <span class="text-blue-500">UI</span></a
          >
        </div>
        <div>
          <button type="button">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:-mx-4 md:block">
        <a
          class="my-1 text-gray-800 hover:text-blue-500 cursor-pointer px-4"
          href="#"
          >Home</a
        >
        <a
          class="my-1 text-gray-800 hover:text-blue-500 cursor-pointer px-4"
          href="/blog"
          >Blog</a
        >
        <a
          class="my-1 text-gray-800 hover:text-blue-500 cursor-pointer px-4"
          href="/test-flowbite"
          >Test Flowbite</a
        >
        <a
          class="my-1 text-gray-800 hover:text-blue-500 cursor-pointer px-4"
          href="/test-apicall"
          >Test API Call</a
        >
        <a
          class="my-1 text-gray-800 hover:text-blue-500 cursor-pointer px-4"
          href="/test-fileupload"
          >Test File Upload</a
        >
        <a
          class="my-1 text-gray-800 hover:text-blue-500 cursor-pointer px-4"
          href="/test-multiselect"
          >MultiSelect</a
        >
        <a
          class="my-1 text-gray-800 hover:text-blue-500 cursor-pointer px-4"
          href="/test-zipupload"
          >Zip Upload</a
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBarMeraki",
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>