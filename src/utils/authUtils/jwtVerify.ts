import JwtVerify from "../jwt/jwtVerify.utils";
export default new JwtVerify(process.env.JWT_KEY);