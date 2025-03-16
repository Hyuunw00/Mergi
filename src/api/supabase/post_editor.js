import { supabase } from '@/config/supabase';
import { getUserLoggedIn } from '@/api/supabase/auth';

// 게시물 작성 API(🔒) - POST
export const postCreatePost = async (requestObj, positions, techStacks) => {
  try {
    const user = await getUserLoggedIn();
    if (!user) {
      throw new Error('로그인이 필요합니다!');
    }
    const { data, error } = await supabase
      .from('post')
      .insert({ ...requestObj, author: user.id })
      .select()
      .single();
    if (error) {
      throw new Error(error);
    }
    const postId = data.id;

    const joinedPositions = positions.join('/');
    const joinedTeckStacks = techStacks.join('/');

    return {
      data: data,
      positions: await postAddPosition(postId, joinedPositions),
      techStacks: await postAddTechStack(postId, joinedTeckStacks),
    };
  } catch (error) {
    console.error(error);
  }
};

// 게시글에 들어갈 포지션
const postAddPosition = async (postId, positions) => {
  try {
    const { data, error } = await supabase
      .from('post_positions')
      .insert([
        {
          post_id: postId,
          position: positions,
        },
      ])
      .select('position')
      .single();
    if (error) {
      throw new Error(error);
    }
    const result = data.position.split('/');
    return result;
  } catch (error) {
    console.error(error);
  }
};

// 게시글에 들어갈 기술 스택
const postAddTechStack = async (postId, stacks) => {
  try {
    const { data, error } = await supabase
      .from('post_stacks')
      .insert([
        {
          post_id: postId,
          stack: stacks,
        },
      ])
      .select('stack')
      .single();
    if (error) {
      throw new Error(error);
    }
    const result = data.stack.split('/');
    return result;
  } catch (error) {
    console.error(error);
  }
};

// 게시물 이미지 업로드(🔒) - POST
// event.target.files[0]의 값을 아래 매개변수에 넣어 나온 반환값을  게시물 생성 API의 post_img_path에 넣어줘야함!
export const postUploadPostImage = async (file) => {
  try {
    const user = await getUserLoggedIn();
    if (!user) {
      throw new Error('로그인이 필요합니다!');
    }
    const encodedFileName = encodeURIComponent(file.name).replace(/%/g, '');
    const exist_files = await supabase.storage.from('post_images').list('');

    // 파일 존재 여부 확인
    const fileExists = exist_files.data.some((e) => e.name === encodedFileName);

    // 파일이 없다면 업로드
    if (!fileExists) {
      const { error } = await supabase.storage.from('post_images').upload(encodedFileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) {
        throw new Error(error.message);
      }
    }

    const { data: publicURL, error: urlError } = supabase.storage
      .from('post_images')
      .getPublicUrl(file.name);
    if (urlError) {
      console.error(urlError);
    }
    return publicURL.publicUrl;
  } catch (error) {
    console.error(error);
  }
};

// 내가 작성한 게시물 수정 API(🔒)  - PUT
export const putUpdatePost = async (requestObj, positions, stacks, postId) => {
  try {
    const user = await getUserLoggedIn();
    if (!user) {
      throw new Error('로그인이 필요합니다!');
    }

    const { data, error } = await supabase
      .from('post')
      .update(requestObj)
      .eq('id', postId)
      .eq('author', user.id) // 자신이 작성한 글인지 확인
      .select()
      .single();

    if (error) {
      throw new Error(error);
    }
    const joinedPositions = positions.join('/');
    const joinedStacks = stacks.join('/');

    return {
      data: data,
      positions: await putUpdatePosition(postId, joinedPositions),
      techStacks: await putUpdateTechStack(postId, joinedStacks),
    };
  } catch (error) {
    console.error(error);
  }
};

const putUpdatePosition = async (postId, positions) => {
  const { data, error } = await supabase
    .from('post_positions')
    .update({
      position: positions,
    })
    .eq('post_id', postId)
    .select()
    .single();

  if (error) {
    console.error(error);
  }

  const result = data.position.split('/');
  return result;
};

const putUpdateTechStack = async (postId, stacks) => {
  const { data, error } = await supabase
    .from('post_stacks')
    .update({
      stack: stacks,
    })
    .eq('post_id', postId)
    .select()
    .single();
  if (error) {
    console.error(error);
  }
  const result = data.stack.split('/');
  return result;
};

// 내가 작성한 게시물 삭제 API(🔒)  - DELETE
export const deletePost = async (postId) => {
  try {
    const { error } = await supabase.from('post').delete().eq('id', postId);

    if (error) {
      throw new Error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

// 내 게시글인지 확인하는 api(추가)
export const isUserPostAuthor = async (post_id) => {
  const { data, error } = await supabase.rpc('is_user_post_author', {
    post_id: post_id,
  });
  if (error) console.error(error);
  else return data;
};
