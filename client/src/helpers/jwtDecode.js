import jwt_decode from "jwt-decode";
import moment from "moment";

/**
 * @description decode a jwt
 * @param {JSON WEB TOKEN STRING} token
 * @returns users attributes
 */
const jwtDecode = (token) => {
  const decoded = jwt_decode(token);
  const { id, nombre, mail, rol } = decoded;

  if (nombre && mail) {
    return { id, nombre, mail, rol };
  }

  return false;
};

/**
 * @description verify if a jwt to expired
 * @param {JSON WEB TOKEN STRING} token
 * @returns true if token expired else false
 */
const jwtUnexpired = (token) => {
  const decoded = jwt_decode(token);
  const { exp } = decoded;
  //console.log(exp, exp <= moment().unix());
  if (exp <= moment().unix()) {
    return true;
  }

  return false;
};

export { jwtDecode, jwtUnexpired };
