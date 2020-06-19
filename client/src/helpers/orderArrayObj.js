const orderArrayObj = (a, b, order = 1) => {
  let comparison = 0;

  a > b ? (comparison = 1) : (comparison = -1);

  if ((order = -1)) {
    return comparison * -1;
  }

  return comparison;
};

export default orderArrayObj;
