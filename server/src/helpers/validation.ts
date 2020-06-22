import Joi from "@hapi/joi";

const validation = {
  user: {
    createUser: (data: NewUser) => {
      const schema = Joi.object({
        nombre: Joi.string().alphanum().min(3).max(30).required(),
        pass: Joi.string().min(6).required(),
        mail: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "io"] },
          })
          .required(),
        rol: Joi.string().valid("admin", "user"),
      });

      return schema.validate(data);
    },
    updateUser: (data: User) => {
      const schema = Joi.object({
        nombre: Joi.string().alphanum().min(3).max(30),
        pass: Joi.string().min(6),
        mail: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "io"] },
        }),
        rol: Joi.string().valid("admin", "user"),
      });
      return schema.validate(data);
    },
    signinUser: (data: SigninData) => {
      const schema = Joi.object({
        mail: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "io"] },
          })
          .required(),
        pass: Joi.string().min(6).required(),
      });
      return schema.validate(data);
    },
  },
  ticket: {
    createTicket: (data: NewTicket) => {
      const schema = Joi.object({
        id_user: Joi.number().required(),
        ticket_pedido: Joi.boolean(),
      });
      return schema.validate(data);
    },
    updateTicket: (data: Ticket) => {
      const schema = Joi.object({
        id_user: Joi.number(),
        ticket_pedido: Joi.boolean(),
      });
      return schema.validate(data);
    },
  },
  userType: {
    createUserType: (data: Ticket) => {
      const schema = Joi.object({
        nombre: Joi.string().required(),
      });
      return schema.validate(data);
    },
  },
};

type User = {
  id: number;
  nombre: string;
  pass: string;
  mail: string;
  rol: string;
};

type NewUser = {
  nombre: string;
  pass: string;
  mail: string;
  rol: string;
};

type SigninData = {
  mail: string;
  pass: string;
};

type Ticket = {
  id: number;
  id_user: string;
  ticket_pedido: boolean;
};

type NewTicket = {
  id_user: string;
  ticket_pedido: boolean;
};

export default validation;
