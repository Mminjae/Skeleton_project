<template>
  <svg
    v-if="icon === 'filter'"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
  
    <g :transform="`scale(${scale})`">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.75 5C13.75 4.65482 14.0298 4.375 14.375 4.375H17.5C17.8452 4.375 18.125 4.65482 18.125 5C18.125 5.34518 17.8452 5.625 17.5 5.625H14.375C14.0298 5.625 13.75 5.34518 13.75 5Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.875 5C1.875 4.65482 2.15482 4.375 2.5 4.375H11.875C12.2202 4.375 12.5 4.65482 12.5 5C12.5 5.34518 12.2202 5.625 11.875 5.625H2.5C2.15482 5.625 1.875 5.34518 1.875 5Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.75 15C13.75 14.6548 14.0298 14.375 14.375 14.375H17.5C17.8452 14.375 18.125 14.6548 18.125 15C18.125 15.3452 17.8452 15.625 17.5 15.625H14.375C14.0298 15.625 13.75 15.3452 13.75 15Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.875 15C1.875 14.6548 2.15482 14.375 2.5 14.375H11.875C12.2202 14.375 12.5 14.6548 12.5 15C12.5 15.3452 12.2202 15.625 11.875 15.625H2.5C2.15482 15.625 1.875 15.3452 1.875 15Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 10C7.5 9.65482 7.77982 9.375 8.125 9.375H17.5C17.8452 9.375 18.125 9.65482 18.125 10C18.125 10.3452 17.8452 10.625 17.5 10.625H8.125C7.77982 10.625 7.5 10.3452 7.5 10Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.875 10C1.875 9.65482 2.15482 9.375 2.5 9.375H5.625C5.97018 9.375 6.25 9.65482 6.25 10C6.25 10.3452 5.97018 10.625 5.625 10.625H2.5C2.15482 10.625 1.875 10.3452 1.875 10Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.125 4.375C12.7798 4.375 12.5 4.65482 12.5 5C12.5 5.34518 12.7798 5.625 13.125 5.625C13.4702 5.625 13.75 5.34518 13.75 5C13.75 4.65482 13.4702 4.375 13.125 4.375ZM11.25 5C11.25 3.96447 12.0895 3.125 13.125 3.125C14.1605 3.125 15 3.96447 15 5C15 6.03553 14.1605 6.875 13.125 6.875C12.0895 6.875 11.25 6.03553 11.25 5Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.875 9.375C6.52982 9.375 6.25 9.65482 6.25 10C6.25 10.3452 6.52982 10.625 6.875 10.625C7.22018 10.625 7.5 10.3452 7.5 10C7.5 9.65482 7.22018 9.375 6.875 9.375ZM5 10C5 8.96447 5.83947 8.125 6.875 8.125C7.91053 8.125 8.75 8.96447 8.75 10C8.75 11.0355 7.91053 11.875 6.875 11.875C5.83947 11.875 5 11.0355 5 10Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.125 14.375C12.7798 14.375 12.5 14.6548 12.5 15C12.5 15.3452 12.7798 15.625 13.125 15.625C13.4702 15.625 13.75 15.3452 13.75 15C13.75 14.6548 13.4702 14.375 13.125 14.375ZM11.25 15C11.25 13.9645 12.0895 13.125 13.125 13.125C14.1605 13.125 15 13.9645 15 15C15 16.0355 14.1605 16.875 13.125 16.875C12.0895 16.875 11.25 16.0355 11.25 15Z"
        fill="#959595"
      />
    </g>
  </svg>

  <svg
    v-else-if="icon === 'memo'"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
  
    <g :transform="`scale(${scale})`">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.625 2.5C4.93464 2.5 4.375 3.05964 4.375 3.75V16.25C4.375 16.9404 4.93464 17.5 5.625 17.5H14.375C15.0654 17.5 15.625 16.9404 15.625 16.25V3.75C15.625 3.05964 15.0654 2.5 14.375 2.5H5.625ZM3.125 3.75C3.125 2.36929 4.24429 1.25 5.625 1.25H14.375C15.7557 1.25 16.875 2.36929 16.875 3.75V16.25C16.875 17.6307 15.7557 18.75 14.375 18.75H5.625C4.24429 18.75 3.125 17.6307 3.125 16.25V3.75Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.25 5C6.25 4.65482 6.52982 4.375 6.875 4.375H13.125C13.4702 4.375 13.75 4.65482 13.75 5C13.75 5.34518 13.4702 5.625 13.125 5.625H6.875C6.52982 5.625 6.25 5.34518 6.25 5Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.25 8.125C6.25 7.77982 6.52982 7.5 6.875 7.5H13.125C13.4702 7.5 13.75 7.77982 13.75 8.125C13.75 8.47018 13.4702 8.75 13.125 8.75H6.875C6.52982 8.75 6.25 8.47018 6.25 8.125Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.25 11.25C6.25 10.9048 6.52982 10.625 6.875 10.625H10C10.3452 10.625 10.625 10.9048 10.625 11.25C10.625 11.5952 10.3452 11.875 10 11.875H6.875C6.52982 11.875 6.25 11.5952 6.25 11.25Z"
        fill="#959595"
      />
    </g>
  </svg>

  <svg
    v-else-if="icon === 'write'"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
  
    <g :transform="`scale(${scale})`">
      <path
        d="M2.5 17.5H10H17.5"
        stroke="#959595"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.1848 4.85699L14.3097 8.98175M10.1848 4.85699L12.5419 2.49997L16.6667 6.62476L14.3097 8.98175L10.1848 4.85699ZM10.1848 4.85699L5.51268 9.52917C5.35641 9.68542 5.26861 9.89742 5.26861 10.1184V13.898H9.04825C9.26925 13.898 9.48117 13.8103 9.6375 13.6539L14.3097 8.98175L10.1848 4.85699Z"
        stroke="#959595"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>

  <svg
    v-else-if="icon === 'plus'"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
  
    <g :transform="`scale(${scale})`">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 4.5C12.4142 4.5 12.75 4.83579 12.75 5.25V18.75C12.75 19.1642 12.4142 19.5 12 19.5C11.5858 19.5 11.25 19.1642 11.25 18.75V5.25C11.25 4.83579 11.5858 4.5 12 4.5Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.5 12C4.5 11.5858 4.83579 11.25 5.25 11.25H18.75C19.1642 11.25 19.5 11.5858 19.5 12C19.5 12.4142 19.1642 12.75 18.75 12.75H5.25C4.83579 12.75 4.5 12.4142 4.5 12Z"
        fill="#959595"
      />
    </g>
  </svg>

  <svg
    v-else-if="icon === 'exit'"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
  
    <g :transform="`scale(${scale})`">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.21967 6.21967C6.51256 5.92678 6.98744 5.92678 7.28033 6.21967L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4874 18.0732 17.0126 18.0732 16.7197 17.7803L6.21967 7.28033C5.92678 6.98744 5.92678 6.51256 6.21967 6.21967Z"
        fill="#959595"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.7803 6.21967C18.0732 6.51256 18.0732 6.98744 17.7803 7.28033L7.28033 17.7803C6.98744 18.0732 6.51256 18.0732 6.21967 17.7803C5.92678 17.4874 5.92678 17.0126 6.21967 16.7197L11.4697 11.4697L16.7197 6.21967C17.0126 5.92678 17.4874 5.92678 17.7803 6.21967Z"
        fill="#959595"
      />
    </g>
  </svg>

  <svg
    v-else-if="icon === 'calendar'"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
  
    <g :transform="`scale(${scale})`">
      <path
        d="M16.5 4.58333H5.5C4.48748 4.58333 3.66666 5.40414 3.66666 6.41666V17.4167C3.66666 18.4292 4.48748 19.25 5.5 19.25H16.5C17.5125 19.25 18.3333 18.4292 18.3333 17.4167V6.41666C18.3333 5.40414 17.5125 4.58333 16.5 4.58333Z"
        stroke="#959595"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.6667 2.75V6.41667"
        stroke="#959595"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.33334 2.75V6.41667"
        stroke="#959595"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.66666 10.0833H18.3333"
        stroke="#959595"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.0833 13.75H11"
        stroke="#959595"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 13.75V16.5"
        stroke="#959595"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_96_473">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
    validator: (value) => ['filter', 'memo', 'write', 'plus', 'exit', 'calendar'].includes(value),
  },

  scale: {
    type: String,
    default: '1',
  },
})
</script>

<style scoped>
svg {
  overflow: visible;
}
</style>
