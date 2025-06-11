export const toFixed = (num: number, fixed: number): string => {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  const numFixedData = re.exec(num.toString());
  const numFixed = numFixedData ? numFixedData[0] : num;
  return numFixed.toString();
};
