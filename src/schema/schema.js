const userSchema = {
  name: "string",
  email: "string",
  password: "string",
  profile: {
    identityType: "string",
    identityNumber: "string",
    address: "string",
  },
};

const accountSchema = {
  userId: "string",
  bankName: "string",
  bankAccountNumber: "string",
  balance: "number",
};

module.exports = {
  userSchema,
  accountSchema,
};
