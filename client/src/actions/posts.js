import * as postService from '../services/postService';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await postService.fetchPosts();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const {data} = await postService.createPost(post);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await postService.updatePost(id, post);
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await postService.deletePost(id);
    dispatch({ type: 'DELETE', payload: id});
  } catch (error) {
    console.log(error)
  }
}