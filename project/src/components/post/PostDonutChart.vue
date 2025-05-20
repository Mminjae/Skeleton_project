<script setup>
import { computed, ref, onMounted } from 'vue'
import { useFinancialSummaryStore } from '@/stores/useFinancialSummaryStore'
import { iconColors } from '../base/iconColors'
import ExpenseIcons from '../base/ExpenseIcons.vue'
const logCategory = (segment) => {
  console.log(
    '[도넛 차트] 렌더링되는 카테고리:',
    segment.category,
    ' 해당 카테고리 퍼센트 : ',
    segment.percentage,
    ' 금액 : ',
    segment.totalAmount.toLocaleString(),
  )
  return true
}

const remToPx = (rem) => rem * 16

const sizeX = remToPx(33.75)
const sizeY = remToPx(28.125)
const circleSize = remToPx(20.36125)

const store = useFinancialSummaryStore()
const categorizedData = computed(() => {
  // 0 이하인 퍼센트 항목은 필터링하여 빈 공간 생기는 문제 방지
  return store.categorizedData.filter((item) => item.percentage > 0)
})

onMounted(() => {
  store.fetchData(1)
})

// 원의 중심 촤표
const centerX = computed(() => sizeX / 2)
const centerY = computed(() => sizeY / 2)

// 반지름
const radius = computed(() => Math.max(sizeX, sizeY) / 2 - circleSize / 2) // stroke(선 굵기)를 사용해 도넛 모양 그래프를 만들기 위해서 수정.

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

  const sortedSegments = [...categorizedData.value].sort((a, b) => b.percentage - a.percentage)

  return sortedSegments.map((segment) => {
    logCategory(segment)

    // 아이콘
    const iconKey = segment.category
    // const icons = ExpenseIcons[icon == iconKey]

    // 원 색
    const colorKey = segment.category // ✅ 수정1: category 키를 통해 색상 가져오기
    const color = iconColors[colorKey]

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

    // ✅ 1. 바깥 위치 계산 (툴팁용 좌표)
    const labelOutsideX = centerX.value + (radius.value + 115) * Math.cos(radians)
    const labelOutsideY = centerY.value + (radius.value + 90) * Math.sin(radians)

    cumulativePercent += segment.percentage // 다음 segment가 그릴 시작 위치를 알기 위해 누적 퍼센트 업데이트

    return {
      ...segment,
      color,
      iconKey,
      dashArray,
      dashOffset: startOffset,
      rotation: -90,
      textX,
      textY,
      labelOutsideX, // ✅ 3. return에 추가
      labelOutsideY, // ✅ 3. return에 추가
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
    <svg :width="sizeX" :height="sizeY" :viewBox="`0 0 ${sizeX} ${sizeY}`">
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
        :stroke-width="circleSize / 3"
        :stroke-dasharray="segment.dashArray"
        :stroke-dashoffset="segment.dashOffset"
        :transform="`rotate(${segment.rotation}, ${centerX}, ${centerY})`"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
        :style="{
          transition: 'all 0.3s ease',
          strokeWidth: hoverIndex === index ? `${circleSize / 2.65}` : `${circleSize / 3}`, // 커지는거 조절하는 곳
        }"
      />

      <!-- 글자 -->
      <text
        v-for="(segment, index) in segmentsWithOffset"
        :key="`text-${index}`"
        :x="segment.textX"
        :y="segment.textY"
        fill="#FFF"
        font-size="12"
        text-anchor="middle"
        dominant-baseline="middle"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
        style="cursor: default"
      >
        <!-- {{ segment.label }} -->
        <tspan v-if="segment.percentage >= 5" :x="segment.textX" dy="-0.4em">
          {{ segment.category }}
        </tspan>
        <!-- ----------------------------- 도넛 안에 데이터 -->
        <!-- 두 번째 줄은 아래로 조금 더 내림 -->
        <tspan v-if="segment.percentage >= 5" :x="segment.textX" dy="1.2em">
          {{ segment.percentage }}%
        </tspan>
        <!-- ----------------------------- 도넛 안에 데이터 -->
      </text>

      <!-- 호버된 상태에서만 보여줄 추가 텍스트 -->
      <!-- 툴팁 (SVG 내부 말풍선 스타일) -->
      <g v-if="hoverIndex !== null">
        <!-- 배경 사각형 -->
        <rect
          :x="segmentsWithOffset[hoverIndex].labelOutsideX - 50"
          :y="segmentsWithOffset[hoverIndex].labelOutsideY - 18"
          width="100"
          height="36"
          rx="6"
          ry="6"
          fill="#fff"
          stroke="#333"
          stroke-width="1"
        />

        <!-- 텍스트 두 줄 -->
        <text
          :x="segmentsWithOffset[hoverIndex].labelOutsideX"
          :y="segmentsWithOffset[hoverIndex].labelOutsideY - 6"
          fill="#333"
          font-size="12"
          font-weight="normal"
          text-anchor="middle"
          dominant-baseline="middle"
          pointer-events="none"
        >
          <tspan :x="segmentsWithOffset[hoverIndex].labelOutsideX" dy="0">
            {{
              segmentsWithOffset[hoverIndex].percentage > 5
                ? '- - - - - - - - -'
                : segmentsWithOffset[hoverIndex].category
            }}
            {{
              segmentsWithOffset[hoverIndex].percentage <= 5
                ? segmentsWithOffset[hoverIndex].percentage + '%'
                : ''
            }}
            <!-- ----------------------------- 툴팁 안에 데이터 -->
          </tspan>
          <tspan :x="segmentsWithOffset[hoverIndex].labelOutsideX" dy="1.2em">
            총 {{ segmentsWithOffset[hoverIndex].totalAmount.toLocaleString() }}원
            <!-- ----------------------------- 툴팁 안에 데이터 -->
          </tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped></style>
