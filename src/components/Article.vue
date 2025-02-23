<template>
  <div class="max-w-6xl px-6 py-4 bg-white rounded-lg shadow-md">
      <div class="flex justify-between items-center">
          <a class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">{{ data.id }}</a>
      </div>
      <div class="mt-2">
          <a class="text-2xl text-gray-700 font-bold hover:underline" href="#">{{ data.title }}</a>
          <p class="mt-2 text-gray-600">{{ data.body }}</p>
      </div>
  </div>
</template>

<script>
  export default {
      name: 'Article',
      props: ['data']
  }
</script>