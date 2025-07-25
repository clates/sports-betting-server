export const printObj = (...objs: any[]): void => {
  objs.forEach((object) => {
    console.dir(object, { depth: null, colors: true });
  });
};
