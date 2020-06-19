class QueryFailed extends Error {
  status: number;
  path: string;

  constructor(error: any) {
    super(error.message);
    this.name = "Query Failed Error";
    this.path = "Unknow error path";
    this.status = 400;

    if (error.message.indexOf("ER_DUP_ENTRY:") !== -1) {
      let aux = error.message.split(": ");
      this.path = aux[0];
      this.message = aux[1].split("for key")[0];
    }
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

export default QueryFailed;
