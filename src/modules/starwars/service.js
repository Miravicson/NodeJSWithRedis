// @flow

import db from './model';
import { CREATOR_NAME } from './constants';
import redisService from '../../common/redisService';

const starWarsService = (options: any) => {
  const __cacheData = [];
  const __checkCacheHandler = (error, data) => {
    if (error) {
      throw new Error(error);
    }

    if (data !== null) {
      const newData = {
        ...JSON.parse(data),
        fromCache: true,
      };
      __cacheData.push(newData);
    }
  };

  const saveResponseToRedis = (...args: Array<any>) => {
    redisService.setex(...args);
  };

  const checkCache = async (id: string | number) => {
    await redisService.get(id, __checkCacheHandler);
    return __cacheData.pop();
  };

  return {
    saveResponseToRedis,
    checkCache,
  };
};

export default starWarsService;
