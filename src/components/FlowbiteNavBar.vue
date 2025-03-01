<template>
  <fwb-navbar solid>
    <template >
      <fwb-navbar-collapse >
        <fwb-navbar-link is-active link="/">
          Home
        </fwb-navbar-link>
        <fwb-navbar-link link="/blog">
          Blog
        </fwb-navbar-link>
        <fwb-navbar-link link="/test-flowbite">
          Test Flowbite
        </fwb-navbar-link>
        <fwb-navbar-link link="/test-multiselect">
          Test Multiselect
        </fwb-navbar-link>
        <fwb-navbar-link link="/test-apicall">
          Test API Call
        </fwb-navbar-link>
        <fwb-navbar-link link="/test-fileupload">
          Test File Upload
        </fwb-navbar-link>
        <fwb-navbar-link link="about">
          About
        </fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>

<script>
export default {
  name: "FlowbiteNavBar",
}

import {
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLink,
  FwbNavbarLogo,
} from 'flowbite-vue'


</script>