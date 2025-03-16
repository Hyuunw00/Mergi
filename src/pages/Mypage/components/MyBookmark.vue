<script setup>
import { getBookmarkPostsByUser } from '@/api/supabase/post';
import FilterDropdown from '@/components/FilterDropdown.vue';
import PostCard from '@/components/PostCard.vue';
import LoadingPage from '@/pages/LoadingPage.vue';
import PostPagination from '@/pages/PostListPage/components/PostPagination.vue';
import { usePagination } from '@/hooks/usePagination';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const orderFilterList = ['최신순', '오래된순', '인기순', '마감일순'];
const router = useRouter();

onMounted(() => {
  fetchUserBookmarkWithPagination();
});

// 필터링 & 페이지네이션 처리된 게시물 불러오기
const fetchUserBookmarkWithPagination = async () => {
  return await getBookmarkPostsByUser(
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
} = usePagination(fetchUserBookmarkWithPagination, 'filteredBookmarkPosts', {
  order: '최신순',
});

const handleSelectOrder = (order) => {
  handleUpdateFilter({ order });
};
</script>
<template>
  <!-- 로딩중일 때 -->
  <LoadingPage v-if="isLoading" class="w-32 h-32" />

  <div v-else class="flex flex-col gap-5 px-4">
    <FilterDropdown
      class="w-[126px] ml-auto"
      :items="orderFilterList"
      :selected="selectedFilter.order"
      defaultText="정렬 순서"
      @click:select="handleSelectOrder"
    />

    <!-- 글이 있을때 -->
    <div v-if="filteredPosts.length > 0" class="flex flex-col gap-7">
      <div class="flex gap-4 flex-wrap">
        <div v-for="post in filteredPosts" :key="post.id" class="cursor-pointer">
          <PostCard
            :user_id="post.author"
            :id="post.id"
            :user-image="post.profile_img_path"
            :user-name="post.name"
            :project-title="post.title"
            :skills="post.stack"
            :position="post.post_position"
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

    <!-- 목록이 없을 때 -->
    <div
      v-else-if="filteredPosts?.length === 0"
      class="h-[400px] flex flex-col gap-4 items-center justify-center"
    >
      <p class="text-center text-primary-4 h3-b">아직 찜한 글이 없습니다.</p>
      <button
        @click="router.push('/PostList/project')"
        class="bg-primary-3 text-white rounded-lg body-large-m py-2 px-6"
      >
        찜하러 가볼까요?
      </button>
    </div>
  </div>
</template>
<style scoped></style>
