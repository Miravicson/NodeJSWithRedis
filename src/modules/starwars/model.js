// @flow

type modelCreatorReturnType = {
  sayHello: (options: any) => any,
};

const modelCreator = (): modelCreatorReturnType => {
  const sayHello = (options: any) => `Hello World. Your Creator is: ${options.creatorName}`;
  return { sayHello };
};

const db = modelCreator();

export default db;
