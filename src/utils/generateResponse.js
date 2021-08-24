const success = (data) => {
  const returnObject = {
    success: true,
    data,
  };

  console.log("returnObject :>> ", returnObject);

  return returnObject;
};

const error = (error) => {
  console.log("error in generateResponse() :>> ", error);
  return {
    success: false,
    error,
  };
};

module.exports = { success, error };
