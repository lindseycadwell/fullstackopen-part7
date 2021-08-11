const success = (data) => ({
  success: true,
  data,
});

const error = (error) => ({
  success: false,
  error,
});

module.exports = { success, error };
