const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let query = {};
    let sortOption = {};

    switch (req.query.sort) {
      case 'az':
          sortOption = { name: 1 };
          break;
      case 'za':
          sortOption = { name: -1 };
          break;
      case 'lastModified':
          sortOption = { updatedAt: -1 };
          break;
      case 'lastInserted':
          sortOption = { createdAt: -1 };
          break;
  }
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    query = {
        $or: [
            { name: searchRegex },
            { email: searchRegex },
            { phone: searchRegex },
        ],
    };
}
const users = await User.find(query).sort(sortOption);
res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
