class ValidationFailed extends Error {
  status: number;
  path: string;

  constructor(error: any) {
    super(error.message);
    this.name = "Validation Failed Error";
    this.path = error.details[0].path[0];
    this.status = 400;
  }

  toJson = (): ObjectError => {
    return {
      ok: false,
      name: this.name,
      status: this.status,
      message: this.message,
      path: this.path,
    };
  };
}

type ObjectError = {
  ok: boolean;
  name: string;
  status: number;
  message: string;
  path: string;
};

export default ValidationFailed;
