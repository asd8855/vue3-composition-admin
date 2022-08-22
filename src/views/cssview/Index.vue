<template>
  <div class="container">
    <charge-demo />
    <candle-demo />
    <step-demo />
  </div>
</template>

<script lang="ts" setup>
import ChargeDemo from './components/ChargeDemo.vue'
import CandleDemo from './components/CandleDemo.vue'
import StepDemo from './components/StepDemo.vue'

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
