import { supabase } from '@/config/supabase';
import { getPostComments } from '@/api/supabase/comment';
import { getUserInfoToUserId } from './user';

export const getAllPosts = async (filters, size = 10) => {
  try {
    let { data, error } = await supabase.rpc('get_all_posts', {
      filters,
      size,
    });
    if (error) console.error(error);
    else return data;
  } catch (error) {
    console.error(error);
  }
};

// 특정 페이지의 게시물을 보여주는 API (1페이지당 12개 보여주기)
// export const getAllPostsWithPagination = async (filters, page = 1, pageSize = 12) => {
//   try {
//     const from = (page - 1) * pageSize;
//     const to = page * pageSize - 1;

//     // 기술 스택 요소를 포함하는 post_id를 담을 배열
//     let matchingPostIds = [];
//     if (filters.techStack && filters.techStack.length > 0) {
//       const { data: stackData } = await supabase
//         .from('post_stacks')
//         .select('post_id')
//         .or(filters.techStack.map((tech) => `stack.ilike.%${tech}%`).join(','));

//       matchingPostIds = stackData?.map((item) => item.post_id) || [];

//       if (matchingPostIds.length === 0) {
//         return { data: [], totalPost: 0, page, totalPage: 0 };
//       }
//     }

//     // 쿼리 체이닝 방식을 사용시 await을 마지막에 단 한번 실행
//     // post_positions 테이블을 post 테이블과 inner join
//     let query = supabase
//       .from('post')
//       .select(`*,post_positions!inner(position)`, { count: 'exact' })
//       .order('created_at', { ascending: false });

//     if (matchingPostIds.length > 0) {
//       query = query.in('id', matchingPostIds);
//     }
//     if (filters.position && filters.position !== '전체') {
//       query = query.ilike('post_positions.position', `%${filters.position}%`);
//     }
//     if (filters.recruitArea && filters.recruitArea !== '전체') {
//       query = query.ilike('recruit_area', `%${filters.recruitArea}%`); // 수정된 부분
//     }
//     if (filters.recruitType) {
//       query = query.ilike('recruit_type', filters.recruitType);
//     }
//     if (filters.onOffline && filters.onOffline !== '전체') {
//       query = query.ilike('on_offline', `%${filters.onOffline}%`); // 수정된 부분
//     }
//     //like, is 연산자는 문자열 비교에만 사용된다.
//     //  boolean 타입은  eq로 비교해야한다.
//     if (typeof filters.finished === 'boolean' && filters.finished) {
//       query = query.eq('finished', filters.finished); // 수정된 부분
//     }
//     if (filters.searchResults) {
//       query = query.or(`title.ilike.%${filters.searchResults}%`);
//     }

//     query = query.range(from, to);
//     const { data, error, count } = await query; // 수정된 부분

//     if (error) {
//       throw new Error(error);
//     }

//     const totalPage = Math.ceil((count || 0) / pageSize);

//     const totalData = await Promise.all(
//       data.map(async (item) => {
//         const userInfo = await getUserInfoToUserId(item.author);

//         return {
//           ...item,
//           name: userInfo.name,
//           profile_img_path: userInfo.profile_img_path,
//           positions: await getPostPositions(item.id),
//           techStacks: await getPostTechStacks(item.id),
//         };
//       }),
//     );

//     return { data: totalData, totalPost: count, page, totalPage };
//   } catch (error) {
//     console.error(error);
//     return { data: [], totalPost: 0, page, totalPage: 0 };
//   }
// };

export const getAllPostsWithPagination = async (filters, page = 1, page_size = 12) => {
  try {
    let { data, error } = await supabase.rpc('get_filtered_posts_with_pagination', {
      filters,
      page,
      page_size,
    });
    if (error) console.error(error);
    else return data;
  } catch (error) {
    console.error(error);
    return { posts: [], total_post: 0, page, total_page: 0 };
  }
};

export const getMyApplyPosts = async (filters, page = 1, page_size = 4) => {
  try {
    let { data, error } = await supabase.rpc('get_my_apply_posts', {
      filters,
      page,
      page_size,
    });
    if (error) console.error(error);
    else return data;
  } catch (error) {
    console.error('내가 신청한 목록 처리 중 오류 발생:', error);
  }
};

// 내가 북마크한 게시물 목록 API
export const getBookmarkPostsByUser = async (filters, page, page_size) => {
  let { data, error } = await supabase.rpc('get_user_bookmarks_with_pagination', {
    filters,
    page,
    page_size,
  });
  if (error) console.error(error);
  else return data;
};

// 사용자(나 포함)가 작성한 게시물 목록 API
export const getPostsByUser = async (user_id, filters, page, page_size) => {
  let { data, error } = await supabase.rpc('get_post_by_user_with_pagination', {
    filters,
    page,
    page_size,
    user_id,
  });
  if (error) console.error(error);

  return data;
};

// 게시물 상세보기 API
export const getPostDetails = async (postId) => {
  try {
    const { data, error } = await supabase.from('post').select().eq('id', postId).single();

    if (error) {
      throw new Error(error);
    }
    const [position, techStack, comments] = await Promise.all([
      getPostPositions(postId),
      getPostTechStacks(postId),
      getPostComments(postId),
    ]);

    const userId = data.author;

    const { data: user, error: userError } = await supabase
      .from('user_list')
      .select()
      .eq('user_id', userId)
      .single();

    if (userError) {
      throw new Error(userError);
    }

    const totalData = { ...data, position, techStack, comments, user };
    return totalData;
  } catch (error) {
    console.error(error);
  }
};

//  특정 게시물의 포지션 정보 불러오기
export const getPostPositions = async (postId) => {
  const { data, error } = await supabase
    .from('post_positions')
    .select('position')
    .eq('post_id', postId)
    .single();

  if (error) {
    console.error(error);
  }
  return data.position.split('/');
};

//  특정 게시물의 기술스택 정보 불러오기
export const getPostTechStacks = async (postId) => {
  const { data, error } = await supabase
    .from('post_stacks')
    .select('stack')
    .eq('post_id', postId)
    .single();

  if (error) {
    console.error(error);
  }
  return data.stack.split('/');
};
