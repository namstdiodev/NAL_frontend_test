import { AxiosResponse } from 'axios';
import { IBlogQuery } from 'src/api/blog';
import { BlogAPI, IEditBlogPayload } from 'src/api/blog';
import { PayloadAction } from '@reduxjs/toolkit';
import Router from 'next/router';
import {
  all,
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import {
  createBlog,
  editBlog,
  failCreateBlog,
  failGetDetailBlog,
  failGetListBlog,
  getDetailBlog,
  getListBlog,
  successCreateBlog,
  successGetDetailBlog,
  successGetListBlog,
} from './blogSlice';

function* _getListBlog({
  payload,
}: PayloadAction<IBlogQuery>): Generator<CallEffect | PutEffect> {
  try {
    const response = (yield call(
      BlogAPI.getListBlogs,
      payload,
    )) as AxiosResponse<any>;
    const { data, ...paginate } = response.data;
    yield put(successGetListBlog({ data, paginate }));
  } catch (error) {
    yield put(failGetListBlog({ error }));
  }
}

function* _getDetailBlog({
  payload,
}: PayloadAction<number>): Generator<CallEffect | PutEffect> {
  try {
    const response = (yield call(
      BlogAPI.getDetailBlog,
      payload,
    )) as AxiosResponse<any>;
    const { data } = response.data;
    yield put(successGetDetailBlog({ data }));
  } catch (error) {
    yield put(failGetDetailBlog({ error }));
  }
}

function* _createBlog({
  payload,
}: PayloadAction<any>): Generator<CallEffect | PutEffect> {
  try {
    const response = (yield call(
      BlogAPI.createBlog,
      payload,
    )) as AxiosResponse<any>;
    yield put(successCreateBlog());
    Router.push(`/blog/${response.data.data.id}`);
  } catch (error) {
    yield put(failCreateBlog({ error }));
  }
}

function* _editBlog({
  payload,
}: PayloadAction<IEditBlogPayload>): Generator<CallEffect | PutEffect> {
  const { id, params } = payload;
  try {
    yield call(BlogAPI.editBlog(id), params);
    yield put(successCreateBlog());
    Router.push(`/blog/${id}`);
  } catch (error) {
    yield put(failCreateBlog({ error }));
  }
}

export function* blogSaga() {
  yield all([
    takeLatest(getListBlog, _getListBlog),
    takeLatest(getDetailBlog, _getDetailBlog),
    takeLatest(createBlog, _createBlog),
    takeLatest(editBlog, _editBlog),
  ]);
}
