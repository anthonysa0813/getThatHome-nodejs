const { response, request } = require("express");

// url: localhost:8080/api/users?limit=10&offset=2
const getAllUsers = (req, res = response) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      message: "Get all users",
      limit,
      offset,
    });
  } else {
    res.json({
      message: "Get all users",
    });
  }
};

const createUser = (req = request, res = response) => {
  const { body } = req;
  res.json({
    message: "Create an user",
    body,
  });
};

const editUser = (req, res = response) => {
  const { id } = req.params;
  res.json({
    message: "Edit an user",
    id,
  });
};

const deleteUser = (req, res = response) => {
  res.json({
    message: "Delete an user",
  });
};

module.exports = {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
};
