import jwt from 'jsonwebtoken';
const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    // grabbing json web token from the front end
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      // jwt verify passes the name of the person and the ID
      decodedData = jwt.verify(token, SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      // sub is google OAuth's way of unique ID
      req.usedId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;