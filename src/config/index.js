const verifyEnvVariable = name => {
  if (!process.env[name]) {
    console.log(`Environment variable ${name} has not been set. Please set the environment variable `);
    process.kill(process.pid, 'SIGTERM');
    throw new Error(`Environment variable ${name} has not been set. Please set the environment variable `);
  } else {
    return process.env[name];
  }
};

const config = {
  serverPort: verifyEnvVariable('PORT'),
  redisPort: verifyEnvVariable('REDIS_PORT'),
  starWarsUrl: verifyEnvVariable('STARWARS_BASEURL'),
};

export default config;
