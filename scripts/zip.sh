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
FOLDER_PUBLISH_BACKEND="$ROOT_FOLDER/publish"
FILE_ZIP_PUBLISH="$ROOT_FOLDER/publish.zip"


show_msg "Compactando arquivos"

zip $FILE_ZIP_PUBLISH $FOLDER_PUBLISH_BACKEND