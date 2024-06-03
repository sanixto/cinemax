export const parseDataFromDB = (data: any) => {
  const parsedData: any = {};
  for (const prop of Object.keys(data)) {
    const camelCaseProp = prop.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    parsedData[camelCaseProp] = data[prop];
  }
  return parsedData;
}

export const prepareDataForDB = (data: any) => {
  const preparedData: any = {};
  for (const prop of Object.keys(data)) {
    const snakeCaseProp = prop.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    preparedData[snakeCaseProp] = data[prop];
  }
  return preparedData;
}