let history = {};

/**
 * @params [Array] products - list of products
 * @params [Number] options.size - Optional parameter. By default it should be 5
**/
export function sortProductsByPrice (products, options) {
  let highest = null, lowest = null;
  const size = options && !!(options.size) ? options.size :  5;
  // Need to create clone becouse sort modify array
  const cloneProducts = [...products];

  const requestHas = createHash({products, options});

  if (!history[requestHas] && products.length >= size && size > 0) {
    //sort
    cloneProducts.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });

    //slice
    highest = cloneProducts.slice(0, size);
    lowest = cloneProducts.slice(size);
    lowest = lowest.length == 0 ? null : lowest;
    
    // do not need to store result {null, null}
    history[requestHas] = true;
  }

  return { highest, lowest };
}

export function cleanCache() {
  history = {};
}

function createHash(data) {
  //it is not good for performance, but fast for implementing
  return JSON.stringify(data);
}