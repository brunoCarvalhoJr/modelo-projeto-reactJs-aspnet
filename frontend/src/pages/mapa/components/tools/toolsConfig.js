import L from 'leaflet';

// let cancelar = 'ou aperte ESC para cancelar';
let cancelar = '';

L.drawLocal = {
    draw: {
        toolbar: {
            actions: {
                title: 'Cancelar desenho',
                text: 'Cancelar'
            },
            finish: {
                title: 'Finalizar desenho',
                text: 'Finalizar'
            },
            undo: {
                title: 'Apagar último ponto desenhado',
                text: 'Apagar último ponto'
            },
            buttons: {
                polyline: 'Desenhar uma linha',
                polygon: 'Desenhar um polígono',
                rectangle: 'Desenhar um retângulo',
                circle: 'Desenhar um círculo',
                marker: 'Desenhar um marcador'
            }
        },
        handlers: {
            circle: {
                tooltip: {
                    start: 'Clique e arraste para desenhar um círculo ' + cancelar
                },
                radius: 'Raio'
            },
            marker: {
                tooltip: {
                    start: 'Clique no mapa para posicionar um marcador ' + cancelar
                }
            },
            circlemarker: {
                tooltip: {
                    start: 'Clique no mapa para adicionar um ponto ' + cancelar
                }
            },
            polygon: {
                tooltip: {
                    start: 'Clique para começar a desenhar um polígono ' + cancelar,
                    cont: 'Clique para continuar desenhando.',
                    end: 'Clique no primeiro ponto para terminar.'
                }
            },
            polyline: {
                error: '<strong>Erro:</strong> arestas não podem se cruzar!',
                tooltip: {
                    start: 'Clique para desenhar linha ' + cancelar,
                    cont: 'Clique para continuar desenhando.',
                    end: 'Clique duas vezes para terminar.'
                }
            },
            rectangle: {
                tooltip: {
                    start: 'Clique e arraste para desenhar um retângulo ' + cancelar
                }
            },
            simpleshape: {
                tooltip: {
                    end: 'Solte o botão do mouse para terminar.'
                }
            }
        }
    },
    edit: {
        toolbar: {
            actions: {
                save: {
                    title: 'Salvar mudanças.',
                    text: 'Salvar'
                },
                cancel: {
                    title: 'Cancelar edição, descartar mudanças.',
                    text: 'Cancelar'
                }
            },
            buttons: {
                edit: 'Editar camada.',
                editDisabled: 'Sem camadas para editar.',
                remove: 'Apagar desenho.',
                removeDisabled: 'Sem camadas para apagar.'
            }
        },
        handlers: {
            edit: {
                tooltip: {
                    text: 'Arraste os quadrados, ou marcador para editar.',
                    subtext: 'Clique cancelar para desfazer.'
                }
            },
            remove: {
                tooltip: {
                    text: 'Clique em um desenho para remover.'
                }
            }
        }
    }
};