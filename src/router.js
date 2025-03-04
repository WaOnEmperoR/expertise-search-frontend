import { createRouter, createWebHistory } from 'vue-router';
import BlogPage from './components/BlogPage.vue';
import TestFlowbite from './components/TestFlowbite.vue';
import TestMultiselect from './components/TestMultiselect.vue';
import TestAPICall from './components/TestAPICall.vue';
import FileUpload from './components/FileUpload.vue'
import BulkCall from './components/BulkCall.vue';

// Define route components
const routes = [
  { path: '/blog', component: BlogPage },
  { path: '/test-flowbite', component: TestFlowbite },
  { path: '/test-multiselect', component: TestMultiselect },
  { path: '/test-apicall', component: TestAPICall },
  { path: '/test-fileupload', component: FileUpload },
  { path: '/test-bulkcall', component: BulkCall },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;