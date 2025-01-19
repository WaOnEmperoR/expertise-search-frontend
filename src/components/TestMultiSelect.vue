<!-- Vue component -->
<template>
  <div>
    <label class="typo__label">Single select / dropdown</label>
    <div>
      <multiselect
        v-model="value"
        placeholder="city name?"
        label="city"
        track-by="city_ascii"
        :options="options"
        :multiple="true"
        :taggable="true"
      ></multiselect>
    </div>

    <pre class="language-json"><code>{{ value  }}</code></pre>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      options: [
        {
          city: "San Martin",
          city_ascii: "San Martin",
          lat: -33.06998533,
          lng: -68.49001612,
          pop: 99974,
          country: "Argentina",
          iso2: "AR",
          iso3: "ARG",
          province: "Mendoza",
          timezone: "America/Argentina/Mendoza",
        },
        {
          city: "San Nicolas",
          city_ascii: "San Nicolas",
          lat: -33.33002114,
          lng: -60.24000289,
          pop: 117123.5,
          country: "Argentina",
          iso2: "AR",
          iso3: "ARG",
          province: "Ciudad de Buenos Aires",
          timezone: "America/Argentina/Buenos_Aires",
        },
        {
          city: "San Francisco",
          city_ascii: "San Francisco",
          lat: -31.43003375,
          lng: -62.08996749,
          pop: 43231,
          country: "Argentina",
          iso2: "AR",
          iso3: "ARG",
          province: "Córdoba",
          timezone: "America/Argentina/Cordoba",
        },
      ],
    };
  },
};
</script>

<style src="../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>