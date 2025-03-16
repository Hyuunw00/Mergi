import { useQuery } from '@tanstack/vue-query';
import { computed, ref, watch } from 'vue';

export const usePagination = (fetchData, queryKey, filters = {}) => {
  // 현재 페이지, 전체 페이지
  const currentPage = ref(1);
  const totalPage = computed(() => data?.value?.total_page || 1);

  // 필터링된 게시물
  const filteredPosts = computed(() => data?.value?.posts || []);

  // 필터링
  const selectedFilter = ref(filters);

  // queryKey가 currentPage와 selectedFilter를 반영하도록 업데이트
  const { isLoading, data, refetch } = useQuery({
    queryKey: [queryKey, selectedFilter.value, currentPage.value],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5, // 유통기한
    gcTime: 1000 * 60 * 5,
    structuralSharing: true, // 변경되지않은 데이터 재사용
    placeholderData: (prev) => prev, // 대기 상태때 표시해줄 데이터
  });

  // 필터링 적용시
  watch(selectedFilter, () => {
    currentPage.value = 1;
    refetch();
  });

  // 페이지 전환시
  const handleChangePage = (page) => {
    currentPage.value = page;
    refetch();
  };

  // 필터링 업데이트 함수
  const handleUpdateFilter = (newFilter) => {
    selectedFilter.value = { ...selectedFilter.value, ...newFilter };
  };

  return {
    isLoading,
    filteredPosts,
    currentPage,
    totalPage,
    selectedFilter,
    handleChangePage,
    handleUpdateFilter,
  };
};
