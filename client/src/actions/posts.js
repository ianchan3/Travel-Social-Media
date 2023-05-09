import * as postService from '../services/postService';
import * as actionTypes from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data: { data, currentPage, numberOfPages} } = await postService.fetchPosts(page);
    
    dispatch({ type: actionTypes.FETCH_ALL, payload: { data, currentPage, numberOfPages} });
    dispatch({ type: actionTypes.END_LOADING });

  } catch (error) {
    console.log(error.message);
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data: { data } } = await postService.fetchPostsBySearch(searchQuery);
    dispatch({ type: actionTypes.FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await postService.createPost(post);
    dispatch({ type: actionTypes.CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await postService.updatePost(id, post);
    dispatch({ type: actionTypes.UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await postService.deletePost(id);
    dispatch({ type: actionTypes.DELETE, payload: id});
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await postService.likePost(id);
    dispatch({ type: actionTypes.UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}