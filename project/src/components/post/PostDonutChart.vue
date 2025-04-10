<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  sizeX: Number,

  sizeY: Number,

  circleSize: Number,

  segments: {
    type: Array,
    required: true,
  },
})

// 원의 중심 촤표
const centerX = computed(() => props.sizeX / 2)
const centerY = computed(() => props.sizeY / 2)

// 반지름
const radius = computed(() => Math.max(props.sizeX, props.sizeY) / 2 - props.circleSize / 2) // stroke(선 굵기)를 사용해 도넛 모양 그래프를 만들기 위해서 수정.

// 원의 둘레 =  2πr
const circumference = computed(() => 2 * Math.PI * radius.value)

// 호버
// 호버중인 segment 인덱스 저장
const hoverIndex = ref(null)

const handleMouseEnter = (index) => {
  hoverIndex.value = index
}

const handleMouseLeave = () => {
  hoverIndex.value = null
}

// segment의 각 원들의 비율 계산하기
const segmentsWithOffset = computed(() => {
  let cumulativePercent = 0 // 지금까지 그린 퍼센트의 누적 합계

  return props.segments.map((segment) => {
    // 원 비율 계산
    const startOffset = circumference.value * (1 - cumulativePercent / 100) //비워질 길이 (전체 - 누적 퍼센트) 이 segment의 시작점 계산 (이전까지 그려진것만큼 비워야 하니까)
    const segmentLength = circumference.value * (segment.percentage / 100) // segment가 차지하는 원 둘레의 길이
    const dashArray = `${segmentLength} ${circumference.value - segmentLength}` // 이 segment가 차지할 길이 & 전체 - 비워질 길이(우리는 전체를 다 채워야 하니까 남은건 비우기 라는 뜻) 설정

    // 글씨 넣기
    const startAngle = (cumulativePercent / 100) * 360 // 시작 각도
    const midPercent = cumulativePercent + segment.percentage / 2
    const midAngle = (midPercent / 100) * 360 // 중앙 각도 계산

    // 텍스트 위치 계산 (중심에서 반지름 거리 만큼 떨어진 지점)
    const radians = (midAngle - 90) * (Math.PI / 180) // -90은 시작 위치 맞추기
    const labelRadius = radius.value * 1 // 반지름의 75%

    const textX = centerX.value + labelRadius * Math.cos(radians) // 0.75는 중앙보다 조금 안쪽으로
    const textY = centerY.value + labelRadius * Math.sin(radians)

    cumulativePercent += segment.percentage // 다음 segment가 그릴 시작 위치를 알기 위해 누적 퍼센트 업데이트

    return {
      ...segment,
      dashArray,
      dashOffset: startOffset,
      rotation: -90,
      textX,
      textY,
      label: segment.label || `${segment.percentage}%`, // label이 있으면 표시, 없으면 %로 표시
    }
  })
})

// 퍼센트에 따라 보일 원의 길이 계산 -> 계산한만큼 둘레가 비워짐 (둘레 - %)
const dashOffset = computed(() => circumference.value * (1 - props.percentage / 100))
</script>

<template>
  <div style="position: relative">
    <!-- SVG 설정 | 540px -> 33.75rem / 450px -> 28.125rem -->
    <svg :width="props.sizeX" :height="props.sizeY" :viewBox="`0 0 ${props.sizeX} ${props.sizeY}`">
      <!-- 퍼센트원 -->
      <circle
        v-for="(segment, index) in segmentsWithOffset"
        :key="index"
        :cx="centerX"
        :cy="centerY"
        :r="radius"
        fill="none"
        :stroke="segment.color"
        stroke-linecap="butt"
        :stroke-width="props.circleSize / 3"
        :stroke-dasharray="segment.dashArray"
        :stroke-dashoffset="segment.dashOffset"
        :transform="`rotate(${segment.rotation}, ${centerX}, ${centerY})`"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
        :style="{
          transition: 'all 0.3s ease',
          strokeWidth:
            hoverIndex === index ? `${props.circleSize / 2.65}` : `${props.circleSize / 3}`, // 커지는거 조절하는 곳
        }"
      />

      <!-- 글자 -->
      <text
        v-for="(segment, index) in segmentsWithOffset"
        :key="`text-${index}`"
        :x="segment.textX"
        :y="segment.textY"
        fill="#333"
        font-size="12"
        text-anchor="middle"
        dominant-baseline="middle"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
        style="cursor: default"
      >
        <!-- {{ segment.label }} -->
        <tspan :x="segment.textX" dy="-0.4em">{{ segment.label }}</tspan>
        <!-- 두 번째 줄은 아래로 조금 더 내림 -->
        <tspan :x="segment.textX" dy="1.2em">{{ segment.percentage }}%</tspan>
      </text>
    </svg>
    <div
      v-if="hoverIndex !== null"
      class="tooltip"
      :style="{
        left: `${segmentsWithOffset[hoverIndex].textX}px`,
        top: `${segmentsWithOffset[hoverIndex].textY - 20}px`,
      }"
    >
      {{ segmentsWithOffset[hoverIndex].label }}
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  background: rgba(51, 51, 51, 0.9);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  pointer-events: none;
  transform: translate(-50%, -100%);
  white-space: nowrap;
  z-index: 10;
}
</style>
