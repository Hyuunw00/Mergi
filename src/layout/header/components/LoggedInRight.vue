<script setup>
import default_user_img from '@/assets/images/default_user_img.png';
import PostEditSvg from '@/assets/icons/PostEditSvg.vue';
import NotificationSvg from '@/assets/icons/NotificationSvg.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import DropdownButton from '@/components/DropdownButton.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { signOut } from '@/api/supabase/auth';
import { useNotificationModalStore } from '@/stores/notificaionModal';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { subscribeToNotifications } from '@/api/supabase/notifications';

const router = useRouter();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const notificationModalStore = useNotificationModalStore();
const { notifications, hasNewNotification } = storeToRefs(notificationModalStore);

const subscribeRef = ref({});

const user_img = computed(() => {
  return user?.value?.profile_img_path ? user.value.profile_img_path : default_user_img;
});

const dropdownList = [
  {
    label: '마이페이지',
    action: () => {
      router.push('/MyPage');
    },
  },
  {
    label: '로그아웃',
    action: () => {
      subscribeRef.value.unsubscribe();
      signOut();
      userStore.user = null;
      userStore.isLoggedIn = false;
      userStore.userPostLikes = [];
      router.push('/');
    },
  },
];

onMounted(async () => {
  await notificationModalStore.fetchNotifications();

  const result = notifications.value.filter((notification) => !notification.seen);

  if (result.length > 0) {
    notificationModalStore.setHasNewNotificationTrue();
  }
  subscribeRef.value = subscribeToNotifications(
    notificationModalStore.addNotifications,
    notificationModalStore.setHasNewNotificationTrue,
  );
});
onUnmounted(() => {
  subscribeRef.value.unsubscribe();
});
</script>

<template>
  <ul class="w-full max-w-[148px] flex items-center justify-between">
    <li>
      <RouterLink to="/EditRecruitPost">
        <PostEditSvg />
      </RouterLink>
    </li>
    <li class="flex items-center">
      <button @click="notificationModalStore.openNotificationModal()" class="relative">
        <NotificationSvg />
        <div
          v-if="hasNewNotification"
          class="w-2.5 h-2.5 rounded-full bg-red-600 absolute top-0 right-0"
        ></div>
      </button>
    </li>
    <li class="flex flex-col items-end justify-center" ref="targetElement">
      <DropdownButton>
        <template #trigger="{ toggleDropdown }">
          <button
            @click="toggleDropdown"
            class="flex w-10 h-10 rounded-full overflow-hidden user-Profile-img-shadow"
          >
            <img
              :src="user_img"
              alt="유저 기본 이미지 아이콘"
              class="object-cover origin-center w-full h-full"
            />
          </button>
        </template>
        <template #menu="{ isOpen, closeDropdown }">
          <DropdownMenu
            :isOpen="isOpen"
            :dropdown-list="dropdownList"
            class="right-0 bottom-0 mt-1.5 top-full"
            @onClose="closeDropdown"
          />
        </template>
      </DropdownButton>
    </li>
  </ul>
</template>
