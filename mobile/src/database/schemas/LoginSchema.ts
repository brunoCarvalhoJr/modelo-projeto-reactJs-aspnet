class Login {
  public login: string;
  public senha: string;
  public accessToken: string;

  constructor(login: string, senha: string, accessToken: string) {
    this.login = login;
    this.senha = senha;
    this.accessToken = accessToken;
  }

  static schema = {
    name: 'Login',
    primaryKey: 'login',
    properties: {
      login: {type: 'string'},
      senha: 'string',
      accessToken: 'string',
    },
  };
}

export {Login};
