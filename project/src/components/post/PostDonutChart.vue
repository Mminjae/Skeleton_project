<script setup>
import { computed } from 'vue'

// // Svg 좌표 내부에서는 px만 사용할 수 있기 때문에 Rem을 px로 계산하는 코드 (1rem = 16px 기준)
// const remToPx = (rem) => rem * 16

const props = defineProps({
  sizeX: Number,
  sizeY: Number,
  circleSize: Number,
  percentage: {
    type: Number,
    required: true,
  },
})

// 원의 중심 촤표
const centerX = computed(() => props.sizeX / 2)
const centerY = computed(() => props.sizeY / 2)

// 반지름
const radius = computed(() => props.circleSize / 2)

// 원의 둘레 =  2πr
const circumference = computed(() => 2 * Math.PI * radius.value)

// 퍼센트에 따라 보일 원의 길이 계산 -> 계산한만큼 둘레가 비워짐 (둘레 - %)
const dashOffset = computed(() => circumference.value * (1 - props.percentage / 100))
</script>

<template>
  <!-- SVG 설정 | 540px -> 33.75rem / 450px -> 28.125rem -->
  <svg :width="props.sizeX" :height="props.sizeY" :viewBox="`0 0 ${props.sizeX} ${props.sizeY}`">
    <!-- 퍼센트원 -->
    <circle
      :cx="centerX"
      :cy="centerY"
      :r="radius"
      fill="pink"
      stroke-linecap="round"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="dashOffset"
      transform="`rotate(-90, ${centerX}, ${centerY})`"
    />
  </svg>
</template>

<style scoped></style>
