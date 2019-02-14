const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const fakeUser = {
  email: 'user@email.com',
  password: "abcd1234"
}

const JWT_SECRET_KEY = 'PRIVATEKEY123'

app.post('/auth', (req, res) => {
  const { email, password } = req.body;
  
  if (fakeUser.email !== email || fakeUser.password !== password) {
    return res.status(401).send('Credenciais inválidas');
  }

  const token = jwt.sign({ email: fakeUser.email }, JWT_SECRET_KEY, { expiresIn: '7 days' });

  res.send(token);
})

app.post('/token-refresh', verifyTokenMiddleware, (req, res) => {
  const JWT_SECRET_KEY = 'PRIVATEKEY123'
  const token = jwt.sign({ email: req.userEmail }, JWT_SECRET_KEY, { expiresIn: '7 days' });

  console.log(req.header('Authorization'))
  res.send(token);
})

app.get('/test', verifyTokenMiddleware, (req, res) => {
  res.send(`Isto só pode ser visto se o token for válido. ${req.userEmail}`);
})

function verifyTokenMiddleware (req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).send('Access denied. No token provided');
  }

  try {
    const tokenPayload = jwt.verify(token, JWT_SECRET_KEY);
    req.userEmail = tokenPayload.email;
    next();
  } catch (ex) {
    res.status(401).send('Invalid token');
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`));
