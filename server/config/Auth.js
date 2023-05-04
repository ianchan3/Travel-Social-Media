import jwt from 'jsonwebtoken';
const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomerAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      // sub is google OAuth way of unique ID
      req.usedId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;