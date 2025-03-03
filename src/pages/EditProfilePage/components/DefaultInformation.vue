<script setup>
import BaseInput from '@/components/BaseInput.vue';
import {
  MAX_NICKNAME_LENGTH,
  MAX_SHORT_INTRODUCE_LENGTH,
  NICKNAME_MESSAGE_STATUS,
} from '@/constants';
import { ref, computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { twMerge } from 'tailwind-merge';
import { useProfileStore } from '@/stores/profile';
import DropdownButton from '@/components/DropdownButton.vue';
import { PencilIcon } from '@/assets/icons';
import DropdownMenu from '@/components/DropdownMenu.vue';

const profileStore = useProfileStore();
const { isCheckNickname, nicknameMessageStatus, newNickname, profileImage, shortIntroduction } =
  storeToRefs(profileStore);
const {
  updateNewNickname,
  validateNickname,
  updateProfileImage,
  deleteProfileImage,
  updateShortIntroduction,
} = profileStore;

const fileInputRef = ref(null);
const dropdownList = reactive([
  {
    label: '이미지 변경하기',
    action: () => {
      fileInputRef.value.click();
    },
  },
  {
    label: '이미지 삭제하기',
    action: () => {
      deleteProfileImage();
    },
  },
]);
const nicknameMessage = computed(() => NICKNAME_MESSAGE_STATUS[nicknameMessageStatus.value]);
const nicknameMessageStyleClass = computed(() =>
  twMerge(
    (nicknameMessageStatus.value === 'symbol' ||
      nicknameMessageStatus.value === 'duplicate' ||
      nicknameMessageStatus.value === 'blank') &&
      'text-accent-error',
    nicknameMessageStatus.value === 'success' && 'text-primary-3',
  ),
);

const handleNickNameInput = (value) => {
  updateNewNickname(value);
};

const handleShortIntroductionInput = (value) => {
  updateShortIntroduction(value);
};

const handleCheckNickname = () => {
  validateNickname(newNickname.value.trim());
};

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const fileURL = URL.createObjectURL(file);
  updateProfileImage(fileURL, file);
  event.target.value = '';
};
</script>
<template>
  <h2 class="text-gray-80 h2-b mb-2">기본 정보</h2>
  <div class="flex gap-[70px] items-center px-12">
    <input
      type="file"
      ref="fileInputRef"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
    <section class="flex flex-col items-center">
      <DropdownButton>
        <template #trigger="{ toggleDropdown }">
          <div
            class="group w-[190px] h-[190px] rounded-full relative overflow-hidden user-Profile-img-shadow"
          >
            <button
              type="button"
              class="absolute w-[190px] h-[190px] bg-black/60 hidden group-hover:flex items-center justify-center"
              @click="toggleDropdown"
            >
              <PencilIcon class="w-6 h-6 text-white" />
            </button>
            <img
              v-if="profileImage.local"
              :src="profileImage.local"
              alt="프로필 이미지"
              class="object-cover object-center w-full h-full"
            />
            <div else class="w-full h-full bg-primary-5" />
          </div>
        </template>
        <template #menu="{ isOpen, closeDropdown }">
          <DropdownMenu
            :isOpen="isOpen"
            :dropdownList="dropdownList"
            class="ml-6 -translate-y-1/2 top-1/2 left-1/2"
            @onClose="closeDropdown"
          />
        </template>
      </DropdownButton>
    </section>

    <div class="grow">
      <section class="mb-6">
        <h3 class="h3-b text-gray-80 mb-2.5">닉네임을 입력해주세요.</h3>
        <BaseInput
          :value="newNickname"
          placeholder="닉네임"
          :maxLength="MAX_NICKNAME_LENGTH"
          class="py-2 pr-2"
          @input="handleNickNameInput"
        >
          <template #rightIcon>
            <button
              type="button"
              :disabled="isCheckNickname"
              class="primary-button px-3 py-1.5 shrink-0 body-r"
              @click="handleCheckNickname"
            >
              중복확인
            </button>
          </template>
        </BaseInput>
        <div class="flex justify-between gap-3 mt-1 body-r text-gray-50">
          <p :class="nicknameMessageStyleClass">{{ nicknameMessage }}</p>
          <p>{{ newNickname.length }}/{{ MAX_NICKNAME_LENGTH }}</p>
        </div>
      </section>
      <section>
        <h3 class="h3-b text-gray-80 mb-2.5">간단하게 본인을 소개해주세요.</h3>
        <BaseInput
          :value="shortIntroduction"
          placeholder="한 줄 소개"
          :maxLength="MAX_SHORT_INTRODUCE_LENGTH"
          @input="handleShortIntroductionInput"
        />
        <p class="mt-1 body-r text-gray-50 justify-self-end">
          {{ shortIntroduction.length }}/{{ MAX_SHORT_INTRODUCE_LENGTH }}
        </p>
      </section>
    </div>
  </div>
</template>
<style scoped></style>
