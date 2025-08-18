# 🗺️ Localizador de Setores RU

Sistema web interativo para consulta e visualização de setores de coleta de resíduos urbanos da **Ambiental Limpeza Urbana e Saneamento Ltda**.

[![Made with Leaflet](https://img.shields.io/badge/Made%20with-Leaflet-green)](https://leafletjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-brightgreen)](https://github.com/AmbientalSC/localizador_ru)

## 📋 Sobre o Projeto

O **Localizador de Setores RU** é uma aplicação web que permite:

- 🗺️ **Visualização interativa** de setores de coleta em mapa
- 🔍 **Busca por endereço** com geocodificação
- 📊 **Tabela dinâmica** com filtros avançados
- 📱 **Interface responsiva** para desktop e mobile
- 🎯 **Filtros por operação** (Domiciliar, Seletiva, Volumosos)
- 📍 **Street View integrado** para localização precisa

## 🚀 Demonstração

🔗 **[Acesse a aplicação](https://ambientalsc.github.io/localizador_ru/)**

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[Leaflet.js](https://leafletjs.com/)** - Biblioteca de mapas interativos
- **[jQuery](https://jquery.com/)** - Manipulação DOM e AJAX
- **[DataTables](https://datatables.net/)** - Tabelas dinâmicas e filtros
- **HTML5 / CSS3** - Estrutura e estilização
- **JavaScript ES6+** - Lógica da aplicação

### APIs Integradas
- **[OpenStreetMap](https://www.openstreetmap.org/)** - Tiles do mapa base
- **[Nominatim](https://nominatim.org/)** - Geocodificação de endereços
- **[Google Street View](https://developers.google.com/maps/documentation/streetview)** - Visualização de ruas

### Dados Geoespaciais
- **GeoJSON** - Formato de dados geográficos
- **Múltiplas cidades** de Santa Catarina
- **Carregamento dinâmico** de arquivos

## 📁 Estrutura do Projeto

```
localizador_ru/
├── 📄 index.html              # Página principal
├── 📁 css/                    # Estilos da aplicação
│   ├── filter.css            # Estilos dos filtros
│   ├── leaflet.css           # Estilos do Leaflet
│   └── ...
├── 📁 js/                     # Scripts JavaScript
│   ├── geoJsonLoader.js      # Carregador dinâmico de GeoJSON
│   ├── leaflet.js            # Biblioteca Leaflet
│   └── ...
├── 📁 data/                   # Arquivos GeoJSON
│   ├── domiciliar_*.geojson  # Setores domiciliares
│   ├── seletiva_*.geojson    # Setores seletivos
│   └── *.geojson.backup      # Backups dos originais
├── 📁 legend/                 # Ícones da legenda
├── 📁 webfonts/              # Fontes da aplicação
├── � sync.js                # Script de sincronização
├── 🔧 validateGeoJSON.js     # Validador de arquivos
├── 🔧 updateGeoJsonList.js   # Atualizador da lista
├── 🔧 fixGeoJSON.js          # Corretor de arquivos
└── 📖 README.md              # Este arquivo
```

## 🎯 Funcionalidades Principais

### 🗺️ Mapa Interativo
- Visualização de setores por cores
- Zoom e navegação fluida
- Popup com informações detalhadas
- Destaque ao passar o mouse

### 🔍 Sistema de Busca
- **Geocodificação**: Busca por endereço
- **Marcador automático**: Localização no mapa
- **Street View**: Visualização da rua
- **Interface intuitiva**: Campo sempre visível

### 📊 Tabela Dinâmica
- **Filtros por coluna**: Busca em cada campo
- **Ordenação**: Clique nos cabeçalhos
- **Scroll virtual**: Performance otimizada
- **Seleção de setor**: Clique para localizar no mapa

### 🎛️ Filtros Avançados
- **Por operação**: Domiciliar, Seletiva, Volumosos
- **Interface moderna**: Design profissional
- **Aplicação instantânea**: Resultados em tempo real

### 📱 Design Responsivo
- **Mobile-first**: Otimizado para celulares
- **Tablet friendly**: Adapta-se a tablets
- **Desktop**: Interface completa

## 🚀 Como Usar

### 1. Acesso Direto
Acesse diretamente: [https://ambientalsc.github.io/localizador_ru/](https://ambientalsc.github.io/localizador_ru/)

### 2. Instalação Local

```bash
# Clone o repositório
git clone https://github.com/AmbientalSC/localizador_ru.git

# Entre no diretório
cd localizador_ru

# Abra o arquivo index.html no navegador
# Ou use um servidor local:
npx http-server .
```

### 3. Adicionando Novos Setores

1. **Adicione o arquivo GeoJSON** na pasta `data/`
2. **Execute o sincronizador**:
   ```bash
   node sync.js
   ```
3. **Teste a aplicação** para verificar se carregou corretamente

## 🔧 Scripts Disponíveis

### `sync.js` - Sincronização Completa
```bash
node sync.js

```
- Valida todos os arquivos GeoJSON
- Corrige problemas de formatação
- Atualiza a lista de arquivos automaticamente
- Cria backups dos originais

### `validateGeoJSON.js` - Validação
```bash
node validateGeoJSON.js
```
- Verifica integridade dos arquivos
- Corrige caracteres Unicode
- Relatório detalhado de features

### `updateGeoJsonList.js` - Atualização da Lista
```bash
node updateGeoJsonList.js
```
- Detecta novos arquivos automaticamente
- Atualiza o `geoJsonLoader.js`
- Mantém a aplicação sincronizada

## � Dados Incluídos

### 🏠 Setores Domiciliares
- Abelardo Luz (7 setores)
- Balneário Camboriú/BT (34 setores)
- Camboriú (22 setores)
- Campo Erê (2 setores)
- Chapecó (37 setores)
- Coronel Freitas (4 setores)
- Erval Velho (1 setor)
- Itajaí (57 setores)
- Itapema (1 setor)
- Itapema BT (20 setores)
- Jaraguá do Sul (30 setores)
- Joinville (112 setores)
- Rio do Sul (26 setores)
- Santa Cecília (3 setores)
- São Francisco do Sul (22 setores)
- São José (48 setores)
- Xanxerê (8 setores)

### ♻️ Setores Seletivos
- Balneário Camboriú
- Camboriú
- Chapecó
- Itajaí
- Itapema
- Jaraguá do Sul
- Joinville
- Rio do Sul
- São José
- São Francisco do Sul

**Total: 25+ cidades | 500+ setores**

## 🎨 Personalização

### Cores dos Setores
Edite o arquivo `data/styles.js` para personalizar as cores:

```javascript
function style_Mesclado_1_0(feature) {
    switch(feature.properties['OPERACAO']) {
        case 'DOMICILIAR': return { color: '#0066cc' };
        case 'SELETIVA': return { color: '#00cc00' };
        case 'VOLUMOSOS': return { color: '#cc6600' };
        default: return { color: '#666666' };
    }
}
```

### Layout e Estilos
- `css/filter.css` - Estilos dos filtros
- `css/tabela.css` - Estilos da tabela
- `index.html` - CSS inline para layout geral

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Alysson Krombauer** - *Desenvolvedor Principal*
- GitHub: [@AmbientalSC](https://github.com/AmbientalSC)
- Email: contato@ambiental.com.br

## 🏢 Empresa

**Ambiental Limpeza Urbana e Saneamento Ltda**
- Website: [www.ambiental.com.br](https://www.ambiental.com.br)
- Setor: Gestão de Resíduos Urbanos
- Atuação: Santa Catarina, Brasil

## 📈 Estatísticas do Projeto

- 🎯 **500+ setores** mapeados
- 🏙️ **25+ cidades** atendidas
- 📱 **100% responsivo**
- ⚡ **Carregamento dinâmico**
- 🔄 **Sistema automático** de sincronização

## 🚀 Roadmap

- [ ] **v2.0**: Sistema de autenticação
- [ ] **v2.1**: Exportação de relatórios
- [ ] **v2.2**: API REST para integração
- [ ] **v2.3**: Dashboard administrativo
- [ ] **v2.4**: Notificações push
- [ ] **v2.5**: Modo offline

## 🔧 Resolução de Problemas

### Erro: "Unexpected non-whitespace character"
Execute o validador para corrigir caracteres Unicode problemáticos:
```bash
node validateGeoJSON.js
```

### Novo arquivo GeoJSON não aparece
1. Verifique se está na pasta `data/`
2. Execute: `node updateGeoJsonList.js`
3. Recarregue a página

### Performance lenta
- Verifique arquivos muito grandes (>5MB)
- Execute: `node sync.js` para otimizar
- Use filtros para reduzir dados exibidos

## � Suporte

Para suporte e dúvidas:
- 📧 **Email**: suporte@ambiental.com.br
- 📱 **Telefone**: (47) 3xxx-xxxx
- 🐛 **Issues**: [GitHub Issues](https://github.com/AmbientalSC/localizador_ru/issues)

---

<div align="center">

**Desenvolvido com ❤️ pela equipe da Ambiental**

[![Ambiental Logo](https://via.placeholder.com/150x50/0066cc/ffffff?text=AMBIENTAL)](https://www.ambiental.com.br)

</div>
