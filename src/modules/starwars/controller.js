// @flow

import type { $Request, $Response, Middleware, NextFunction } from 'express';
import Axios from 'axios';
import starWarsService from './service';
import config from '../../config';

const swService = starWarsService({});

type controllerActionsType = {
  getSWElement: Middleware,
  checkCacheMiddleWare: Middleware,
};

const controller = (dependencyObject: any): controllerActionsType => {
  const checkCacheMiddleWare = async (req: $Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const data = await swService.checkCache(id);
    if (data) {
      res.send(data);
    } else {
      next();
    }
  };
  const getSWElement = async (req: $Request, res: $Response): Promise<void> => {
    try {
      const { id } = req.params;
      const starWarsURL = `${config.starWarsUrl}/${id}`;
      const starShipInfo = await Axios.get(starWarsURL);
      const { data: starShipInfoData } = starShipInfo;
      swService.saveResponseToRedis(id, 3600, JSON.stringify(starShipInfoData));
      return res.json(starShipInfoData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
  return {
    getSWElement,
    checkCacheMiddleWare,
  };
};

export default controller;
