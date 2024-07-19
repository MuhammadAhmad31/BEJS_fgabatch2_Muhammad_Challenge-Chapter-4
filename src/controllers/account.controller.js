const {
  createAccount,
  getAllAccounts,
  getAccountById,
} = require("../models/account.model");
const validateData = require("../utils/validateData");
const { accountSchema } = require("../schema/schema");
const handleResponse = require("../utils/handleResponse");
const { getAccountsByUserId } = require("../models/account.model");

const create = async (req, res) => {
  const { body } = req;
  const { userId, bankName, bankAccountNumber, balance } = body;

  if (!userId || !bankName || !bankAccountNumber || balance === undefined) {
    return handleResponse(res, 400, {
      message: "Gagal menambahkan akun, semua field wajib diisi.",
      error:
        "Missing required fields: userId, bankName, bankAccountNumber, balance",
    });
  }

  const { isValid, message } = validateData(body, accountSchema);

  if (!isValid) {
    return handleResponse(res, 400, {
      message: "Gagal menambahkan akun, tipe data tidak sesuai.",
      error: message,
    });
  }

  try {
    const account = await createAccount(body);
    handleResponse(res, 201, {
      message: "Akun berhasil ditambahkan",
      data: account,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Gagal menambahkan akun",
      error: err ? err.message : "Unknown error",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const accounts = await getAllAccounts(parseInt(page), parseInt(limit));
    handleResponse(res, 200, {
      message: "Akun berhasil ditampilkan",
      data: accounts,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Gagal menampilkan akun",
      error: err ? err.message : "Unknown error",
    });
  }
};

const getById = async (req, res) => {
  const { accountId } = req.params;
  try {
    const account = await getAccountById(accountId);
    if (!account) {
      handleResponse(res, 404, {
        message: "Akun tidak ditemukan",
      });
      return;
    }
    handleResponse(res, 200, {
      message: "Akun berhasil ditampilkan",
      data: account,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Gagal menampilkan akun",
      error: err ? err.message : "Unknown error",
    });
  }
};

const getByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const accounts = await getAccountsByUserId(userId);
    if (!accounts.length) {
      handleResponse(res, 404, {
        message: "Akun tidak ditemukan",
      });
      return;
    }
    handleResponse(res, 200, {
      message: "Akun berhasil ditampilkan",
      data: accounts,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Gagal menampilkan akun",
      error: err ? err.message : "Unknown error",
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getByUserId,
};
