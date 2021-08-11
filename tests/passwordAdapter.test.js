const passwordUtils = require("../src/utils/passwordAdapter");

test("hashes password and verifies it", async () => {
  const testPassword = "password123456";

  const oldHash = await passwordUtils.hash(testPassword);
  const result = await passwordUtils.verify(testPassword, oldHash);

  expect(result).toBe(true);
});
