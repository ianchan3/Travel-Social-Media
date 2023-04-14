import * as postService from '../services/postService';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await postService.fetchPosts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}