<template>
  <div class="flex gap-8 flex-wrap">
    <va-switch
      v-model="value"
      color="success"
    />
    <va-switch
      v-model="value"
      color="info"
    />
    <va-switch
      v-model="value"
      color="danger"
    />
    <va-switch
      v-model="value"
      color="warning"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
