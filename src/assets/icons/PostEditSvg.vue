<script setup>
import { ref } from 'vue';

const dropDown = ref(false);
const dropDownShow = () => {
  dropDown.value = true;
};
const dropDownHide = () => {
  dropDown.value = false;
};
</script>

<template>
  <article class="flex flex-col justify-center items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      stroke="currentColor"
      class="text-[#545454] hover:text-primary-4 duration-100"
      @mouseover="dropDownShow()"
      @mouseleave="dropDownHide()"
    >
      <path
        d="M12 2.5H3.83333C3.21449 2.5 2.621 2.74583 2.18342 3.18342C1.74583 3.621 1.5 4.21449 1.5 4.83333V21.1667C1.5 21.7855 1.74583 22.379 2.18342 22.8166C2.621 23.2542 3.21449 23.5 3.83333 23.5H20.1667C20.7855 23.5 21.379 23.2542 21.8166 22.8166C22.2542 22.379 22.5 21.7855 22.5 21.1667V13"
        stroke-width="2.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.4374 2.06276C19.9016 1.59864 20.5311 1.33789 21.1874 1.33789C21.8438 1.33789 22.4733 1.59864 22.9374 2.06276C23.4016 2.52689 23.6623 3.15639 23.6623 3.81276C23.6623 4.46914 23.4016 5.09864 22.9374 5.56276L12.4223 16.0791C12.1453 16.3559 11.803 16.5585 11.4271 16.6683L8.07528 17.6483C7.97489 17.6775 7.86847 17.6793 7.76717 17.6533C7.66587 17.6274 7.57341 17.5747 7.49947 17.5007C7.42552 17.4268 7.37282 17.3343 7.34686 17.233C7.32091 17.1317 7.32267 17.0253 7.35195 16.9249L8.33195 13.5731C8.44223 13.1975 8.64524 12.8557 8.92228 12.5791L19.4374 2.06276Z"
        stroke-width="2.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <article
      v-if="dropDown"
      class="absolute bottom-[-10px] rounded-md bg-primary-4 w-[50px] h-4.5 flex items-center justify-center"
    >
      <span class="caption-r text-white">작성하기</span>
    </article>
  </article>
</template>

<style lang="scss" scoped></style>
