<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 1024 1024">
    <path
      d="M329.354 820.029c-6.006 6.002-9.38 14.144-9.38 22.635s3.374 16.633 9.38 22.635c12.508 12.483 32.761 12.483 45.269 0l341.333-340.821c6.003-5.994 9.376-14.13 9.376-22.613s-3.373-16.619-9.376-22.613l-341.333-341.888c-12.508-12.483-32.761-12.483-45.269 0-6.006 6.002-9.38 14.144-9.38 22.635s3.374 16.633 9.38 22.635l318.72 319.232-318.72 318.165z"
      :fill="props.fill"
      :fill-opacity="props.fillOpacity"
    ></path>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<
    Partial<{
      width: number
      height: number
      fill: string
      fillOpacity: number
    }>
  >(),
  {
    width: 17,
    height: 19,
    fill: '#000000',
    fillOpacity: 0.2
  }
)
</script>
