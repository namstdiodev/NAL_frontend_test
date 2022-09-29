import { all } from 'redux-saga/effects';
import { blogSaga } from 'src/features/blog/blogSaga';
export default function* rootSaga() {
  yield all([blogSaga()]);
}
