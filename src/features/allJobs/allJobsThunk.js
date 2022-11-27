import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkAPI) => {
  // 每一个后面都考虑到没权限 的结果
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;
// 注意fetch 是自己找自己的数据 customfetch里面有前面的url
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  // 直接到这个stat界面
  try {
    const resp = await customFetch.get('/jobs/stats');

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
