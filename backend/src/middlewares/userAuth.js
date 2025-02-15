import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  //get token
  const { token } = req.cookies;

  //authenticate user
  if (!token) {
    return res.status(401).json({
      message: "User not authenticated",
      success: false,
    });
  }

  //verify token
  const isValidToken = await jwt.verify(token, process.env.SECRET_KEY);
  if (!isValidToken) {
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }

  //store and next
  req.id = isValidToken.userId;
  next();
};

export default userAuth;
