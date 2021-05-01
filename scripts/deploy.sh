#!/bin/bash

### Inicialização
SELF_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$SELF_DIR/utils/utils.sh"

ambiente=$1

show_title "Deploy"

if [ -z "$ambiente" ]; then
	show_help "Argumentos inválidos."
fi

### AMBIENTE: Verificando ambiente e arquivos de configuração

path_config_ambiente="$SELF_DIR/conf/$ambiente.sh"

if [ ! -f $path_config_ambiente ]; then
	show_help "Ambiente inválido. Não existe o arquivo de configuração '$path_config_ambiente'."
fi

source "$path_config_ambiente"

### Folder
FOLDER_BUILD_FRONTEND="$ROOT_FOLDER/frontend/build/"
FOLDER_SRC_FRONTEND="$ROOT_FOLDER/frontend"
FOLDER_SRC_BACKEND="$ROOT_FOLDER/backend"
FOLDER_PUBLISH_BACKEND="$ROOT_FOLDER/publish"
FOLDER_PUBLISH_FRONTEND="$FOLDER_PUBLISH_BACKEND/wwwroot"
FILE_ZIP_PUBLISH="$ROOT_FOLDER/publish.zip"

### LIMPANDO PASTAS

show_msg "Limpando pastas ..."

if [ -d $FOLDER_PUBLISH_BACKEND ]; then
	rm -Rf $FOLDER_PUBLISH_BACKEND
fi

if [ -d $FOLDER_PUBLISH_FRONTEND ]; then
	rm -Rf $FOLDER_PUBLISH_FRONTEND
fi

if [ -d $FILE_ZIP_PUBLISH ]; then
	rm -Rf $FILE_ZIP_PUBLISH
fi

mkdir $FOLDER_PUBLISH_BACKEND
mkdir $FOLDER_PUBLISH_FRONTEND

### BACKEND

show_msg "Configurando backend ..."

cd $FOLDER_SRC_BACKEND

dotnet publish -c release --self-contained --runtime linux-x64 -o $FOLDER_PUBLISH_BACKEND

### FRONTEND

show_msg "Configurando frontend ..."

cd $FOLDER_SRC_FRONTEND

yarn run build

cp -a "$FOLDER_BUILD_FRONTEND/." $FOLDER_PUBLISH_FRONTEND

## DEPLOY

if [ ! "${server_ssh}" ];then
  error "Configuração 'server_ssh' não definida para este ambiente."
fi

if [ ! "${server_path_aplicacao}" ];then
  error "Configuração 'server_path_aplicacao' não definida para este ambiente."
fi

show_msg "Compactando arquivos"

cd ../publish && zip -r ../publish.zip .

cd scripts

show_msg "Executando deploy no servidor: ${ambiente}"

connection="$server_user@$server_ssh"

scp -r "$FILE_ZIP_PUBLISH" "$connection:$server_path_aplicacao"

ssh "$connection" <<-DEPLOY

  cd "$server_path_aplicacao/"

  echo $server_password | sudo -S systemctl stop kestrel-dotnet.service

  rm -Rf publish

  unzip publish.zip -d publish

  cd publish

  chmod 777 /home/paulohenriquevn/aplicacao/publish/Sync/Data/Pendentes/
  
  chmod 777 /home/paulohenriquevn/aplicacao/publish/Sync/Data/Processados/
  
  echo $server_password | sudo -S systemctl start kestrel-dotnet.service

DEPLOY