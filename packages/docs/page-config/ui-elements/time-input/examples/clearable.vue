<template>
  <div class="flex gap-5 flex-wrap">
    <va-time-input
      v-model="value"
      clearable
      label="Clearable"
      class="mr-3"
    />
    <va-time-input
      v-model="value"
      left-icon
      clearable
      label="With leftIcon"
      class="mr-3"
    />
    <va-time-input
      v-model="value"
      clearable
      clearable-icon="cancel"
      color="textPrimary"
      label="With custom icon and color"
      class="mr-3"
    />
    <va-time-input
      v-model="value"
      clearable
      readonly
      label="Readonly"
      class="mr-3"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { value: new Date() };
  },
};
</script>
