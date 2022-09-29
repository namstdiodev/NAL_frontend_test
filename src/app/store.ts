import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { logger } from './middleware';
import rootSaga from './saga';
import blogReducer from 'src/features/blog/blogSlice';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: { blog: blogReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
