import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
  // 发出一个创建job的请求
  try {
    const resp = await customFetch.post('/jobs', job);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
    // 这里也会返回一个 createjob的状态 会在job里面 看是pending reject还是完成 都有不同的弹窗表示
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
    // 看看灯眉等处
  }
};
export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  // 删除的时候 会更新我们的job数据 这时候 加上一个show
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    // axios里面有的delete方法
    thunkAPI.dispatch(getAllJobs());
    // 返回剩下的所有job
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
