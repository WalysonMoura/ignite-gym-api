/* import { verify } from "jsonwebtoken";

import authConfig from "../configs/auth";

export async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new Error("token.invalid", 401);
  }
}

module.exports = ensureAuthenticated;
 */