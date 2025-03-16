<script setup>
import TabMenu from '@/components/TabMenu.vue';
import { onMounted, ref, watch } from 'vue';
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import { useRouter } from 'vue-router';
import { getUserInfoToUserId } from '@/api/supabase/user';
import MyInfo from '../Mypage/components/MyInfo.vue';
import { useRoute } from 'vue-router';
import Review from './components/UserReviewList.vue';
import UserRecruitmentList from './components/UserRecruitmentList.vue';
import { useUserStore } from '@/stores/user';
import LoadingPage from '../LoadingPage.vue';
import { storeToRefs } from 'pinia';
import { useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();

const items = ['유저 정보', '작성한 모집글', '후기/평가 목록'];
const activeIndex = ref(0);

const router = useRouter();
const route = useRoute();

//  특정 사용자
const userInfo = ref(null);
const userId = useRoute().params.userId;

// 현재 로그인한 사용자(나)
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

watch(activeIndex, async () => {
  await queryClient.invalidateQueries('filteredMyPosts');
});

onMounted(async () => {
  fetchUserinfo();

  // 탭의 갯수보다 큰 index 임의 조작시 0으로 강제 전환
  if (route.query.tabIndex > items.length || !route.query.tabIndex) {
    activeIndex.value = 0;
    router.push({ query: { tabIndex: activeIndex.value } });
    return;
  }
  activeIndex.value = parseInt(route.query.tabIndex);

  // 사용자 좋아요 업데이트
  await userStore.setUserPostLikes();
});

const fetchUserinfo = async () => {
  // 현재 로그인한 사용자가 자신의 상세정보에 들어왔을시 마이페이지로 리다이렉트
  if (user?.user_id === userId) {
    router.push('/myPage');
  }
  userInfo.value = await getUserInfoToUserId(userId);
};

const handleUpdateIndex = (index = 0) => {
  activeIndex.value = index;
  router.push({ query: { tabIndex: index } });
};
</script>

<template>
  <!-- 로딩중일때  -->
  <LoadingPage v-if="!user || !userInfo" />

  <div v-else class="pb-20 pt-12">
    <!-- 프로필 카드 -->
    <div
      class="px-[58px] py-[48px] flex items-center gap-[44px] rounded-[8px] bg-white max-w-[928px] m-auto card-shadow"
    >
      <!-- 프로필 이미지 -->
      <div>
        <img
          :src="userInfo.profile_img_path"
          alt="프로필 이미지"
          class="w-[165px] h-[165px] rounded-full user-Profile-img-shadow"
        />
      </div>
      <!-- 프로필 정보 -->
      <div class="flex flex-col items-start flex-1 gap-4">
        <div class="flex flex-col items-start flex-1 w-full gap-1">
          <p class="text-black h2-b">{{ userInfo.name }}</p>

          <div class="flex items-center justify-between w-full">
            <p class="body-large-r text-gray-40">{{ userInfo.short_introduce }}</p>
          </div>
        </div>

        <div>
          <ul class="flex items-center gap-4">
            <li v-for="pos in userInfo.positions" :key="pos.id">
              <PositionSmallBadge :position="pos.position" />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 탭 -->
    <div
      class="rounded-lg bg-white card-shadow pb-10 overflow-hidden flex flex-col gap-11 mt-[52px]"
    >
      <!-- 탭 메뉴 -->
      <TabMenu :menu-items="items" :activeIndex="activeIndex" @update-Index="handleUpdateIndex" />
      <!-- 탭 내용 -->
      <div>
        <div v-if="activeIndex === 0"><MyInfo :userInfo="userInfo" /></div>
        <div v-else-if="activeIndex === 1"><UserRecruitmentList :userInfo="userInfo" /></div>
        <div v-else-if="activeIndex === 2"><Review /></div>
      </div>
    </div>
  </div>
</template>
