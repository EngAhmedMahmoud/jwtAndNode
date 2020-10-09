module.exports = (data, code, err) => {
  let response = data
    ? { success: true, data, err: [] }
    : { success: false, data: [], err };
  return { response, code };
};
