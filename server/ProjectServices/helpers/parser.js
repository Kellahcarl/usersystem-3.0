const parser = (result, single) => {
  let key = result.recordset[0];
  let values = Object.values(key)[0];

  if (!values) {
    throw "no results found";
  }

  if (single) {
    return JSON.parse(values)[0];
  }

  return JSON.parse(values);
};

module.exports = parser;
