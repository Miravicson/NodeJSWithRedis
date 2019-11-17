import redis from 'redis';
import config from '../config';

const { redisPort } = config;

const redisClient = redis.createClient(redisPort);

export default redisClient;
