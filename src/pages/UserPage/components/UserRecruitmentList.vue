<script setup>
import PostCard from '@/components/PostCard.vue';
import { onMounted, ref } from 'vue';
import { getPostsByUser } from '@/api/supabase/post';

import { useRouter } from 'vue-router';
import LoadingPage from '@/pages/LoadingPage.vue';
import PostPagination from '@/pages/PostListPage/components/PostPagination.vue';
import FilterDropdown from '@/components/FilterDropdown.vue';
import { usePagination } from '@/hooks/usePagination';

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const loading = ref(true);

const orderFilterList = ['최신순', '오래된순', '인기순', '마감일순'];

onMounted(async () => {
  fetchUserPostsWithPagination();
});

// 필터링 & 페이지네이션 처리된 게시물 불러오기
const fetchUserPostsWithPagination = async () => {
  const userId = props.userInfo.user_id;
  loading.value = false;

  return await getPostsByUser(
    userId,
    {
      order: selectedFilter.value.order,
    },
    currentPage.value,
    8,
  );
};

const {
  isLoading,
  filteredPosts,
  currentPage,
  totalPage,
  selectedFilter,
  handleChangePage,
  handleUpdateFilter,
} = usePagination(fetchUserPostsWithPagination, 'filteredUserPosts', {
  order: '최신순',
});

const handleSelectOrder = (order) => {
  handleUpdateFilter({ order });
};
</script>
<template>
  <!-- 로딩중일때  -->
  <LoadingPage v-if="isLoading" class="w-32 h-32" />

  <div v-else class="flex flex-col px-4 gap-5">
    <FilterDropdown
      class="w-[126px] ml-auto"
      :items="orderFilterList"
      :selected="selectedFilter.order"
      defaultText="정렬 순서"
      @click:select="handleSelectOrder"
    />

    <!-- 모집 글이 있을때 -->
    <div v-if="filteredPosts?.length > 0" class="flex flex-col gap-7">
      <div class="flex items-center gap-4 ml-1 flex-wrap">
        <div v-for="post in filteredPosts" :key="post.id" class="cursor-pointer">
          <PostCard
            :user_id="post.author"
            :id="post.id"
            :user-image="userInfo.profile_img_path"
            :user-name="userInfo.name"
            :project-title="post.title"
            :skills="post.tech_stacks"
            :position="post.positions"
            :application-deadline="post.recruit_deadline"
          />
        </div>
      </div>
      <PostPagination
        :currentPage="currentPage"
        :totalPage="totalPage"
        @change="handleChangePage"
        class="m-auto"
      />
    </div>

    <!-- 모집 글이 없을때  -->
    <div
      v-else-if="filteredPosts?.length === 0"
      class="flex flex-col justify-center items-center gap-5 flex-1 h-[600px]"
    >
      <p class="text-center text-primary-4 h3-b">아직 작성한 모집글이 없습니다.</p>
      <button
        @click="router.push('/editrecruitpost')"
        class="bg-primary-3 text-white rounded-lg body-large-m py-2 px-6"
      >
        모집하러 가볼까요?
      </button>
    </div>
  </div>
</template>
<style scoped></style>
