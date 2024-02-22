const controller = {
  createProfile: (req, res) => {
    const { username, password } = req.body;
    if (isValidLogin(username, password)) {
      res.status(201).send({ message: "User created successfully" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  },

  loginUser: (req, res) => {
    const { username, password } = req.body;
    if (isValidLogin(username, password)) {
      res.status(200).send({ message: "Login successfully" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
    res.status(200).send({ message: "Login successfully" });
  },

  logoutUser: (req, res) => {
    res.status(200).send({ message: "Logout successfully" });
  },
};

export default controller;
