import jwt from 'jsonwebtoken';


const SECRET_KEY = 'phantuankiet';

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'user3', password: 'password3' },
];

const generateToken = (username) => {
  const payload = { username };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

const controllers = {
  createProfile: (req, res) => {
    const profileData = req.body;
    res.status(201).send({ message: "Profile created" });
  },

  updateProfile: (req, res) => {
    const profileId = req.params.id;
    const updatedData = req.body;

    res.status(200).send({ message: "Profile updated" });
  },
  getProfile: (req, res) => {
    const profileId = req.params.id;
    res.status(200).send({ profile: profileId })
  },
  deleteProfile: (req, res) => {
    const profileId = req.params.id;
    
    res.status(200).send({ message: " Profile deleted " });
  }
};

export { controllers, authenticateToken };