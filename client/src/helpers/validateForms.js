const validateForms = {
  signin: (data) => {
    const { mail, pass } = data;
    const error = [];
    const e1 = notEmpty("email", mail);
    if (e1) error.push(e1);
    const e2 = notEmpty("password", pass);
    if (e2) error.push(e2);
    const e3 = minLenght("password", pass, 5);
    if (e3) error.push(e3);
    const e4 = minLenght("email", mail, 10);
    if (e4) error.push(e4);

    if (error.length !== 0) {
      return error;
    }

    return false;
  },
  signup: (data) => {
    const { nombre, mail, pass, pass_r } = data;
    const error = [];

    const e1 = notEmpty("email", mail);
    if (e1) error.push(e1);
    const e2 = notEmpty("password", pass);
    if (e2) error.push(e2);
    const e3 = minLenght("password", pass, 5);
    if (e3) error.push(e3);
    const e4 = minLenght("email", mail, 10);
    if (e4) error.push(e4);
    const e5 = notEmpty("name", nombre);
    if (e5) error.push(e5);
    const e6 = minLenght("name", nombre, 3);
    if (e6) error.push(e6);
    const e7 = repeatPassword(pass, pass_r);
    if (e7) error.push(e7);

    if (error.length !== 0) {
      return error;
    }

    return false;
  },
};

const notEmpty = (name, val) => {
  if (!val || val === "") {
    return `${name} is required`;
  }
};

const minLenght = (name, val, min) => {
  if (val && val.length < min) {
    return `${name} must have a minimum of ${min} letters `;
  }
};

const repeatPassword = (val1, val2) => {
  if (val1 !== val2) {
    return "password repeat not match";
  }
};

export default validateForms;
