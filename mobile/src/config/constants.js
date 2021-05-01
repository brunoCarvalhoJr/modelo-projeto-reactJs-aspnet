import Config from 'react-native-config';

export const Secret = Config.SECRET;
export const Namespace = Config.NAMESPACE;
export const ApiUrl = Config.API_URL;

export const Messages = {
  ALERT_ATENCAO: 'Atenção',
  ALERT_CANCELAR: 'Não',
  ALERT_CONFIRMAR: 'Sim',
  ERRO_PADRAO:
    'Tivemos um problema ao completar sua requisição, contate o administrador do sistema ou tente novamente mais tarde.',
  CAMPO_OBRIGATORIO: 'Campo obrigatório!',
  SENHA_USUARIO_INCORRETO: 'CPF e/ou senha estão incorretos.',
  USUARIO_SEM_PERMISSAO:
    'Desculpe, você não tem permissão para acessar este módulo.',
  USUARIO_NAO_AUTORIZADO: 'Sua sessão expirou.',
};
