export const parseDataFromDB = (data: any) => {
  const parsedData: any = {};
  for (const prop of Object.keys(data)) {
    const propWords = prop.split('_');
    const firstWord = propWords[0];
    const camelCasePropWords = propWords.slice(1).map(item => `${item[0].toUpperCase()}${item.slice(1)}`);
    const newPropName:string = `${firstWord}${camelCasePropWords.join('')}`;
    parsedData[newPropName] = data[prop];
  }
  return parsedData;
}