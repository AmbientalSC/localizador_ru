# Como usar a extensão JMESPath no VS Code

## O que é JMESPath?

JMESPath é uma linguagem de consulta para JSON que permite extrair e transformar dados de documentos JSON de forma simples e eficiente.

## Como usar a extensão JMESPath

### 1. **Abrir arquivos JSON**
- Abra o arquivo `exemplo-dados.json` no VS Code
- Este arquivo contém dados de setores para teste

### 2. **Criar queries JMESPath**
- Crie um novo arquivo com extensão `.jmespath` (ex: `minha-query.jmespath`)
- Ou use o arquivo `exemplos-jmespath.jmespath` que já foi criado

### 3. **Executar queries**
Existem várias formas de executar queries JMESPath:

#### **Método 1: Command Palette**
1. Pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no Mac)
2. Digite "JMESPath"
3. Selecione "JMESPath: Evaluate JMESPath expression"
4. Cole sua query JMESPath

#### **Método 2: Terminal integrado**
1. Abra o terminal no VS Code (`Ctrl+`` `)
2. Use o comando: `jmespath "sua_query" arquivo.json`

#### **Método 3: Extensão direta**
- A extensão pode ter botões ou comandos específicos na interface

### 4. **Exemplos práticos**

#### **Listar todos os nomes dos setores:**
```jmespath
setores[*].nome
```
**Resultado:** `["Centro", "Trindade", "Estreito", "Coqueiros", "Córrego Grande"]`

#### **Filtrar setores ativos:**
```jmespath
setores[?status=='ativo']
```
**Resultado:** Array com apenas os setores que têm status "ativo"

#### **Calcular população total:**
```jmespath
sum(setores[*].populacao)
```
**Resultado:** `92000`

#### **Encontrar setor com maior população:**
```jmespath
max_by(setores, &populacao)
```
**Resultado:** Objeto do setor "Trindade" (25000 habitantes)

### 5. **Sintaxe básica JMESPath**

| Operação | Sintaxe | Exemplo |
|----------|---------|---------|
| Acessar propriedade | `.propriedade` | `setores[0].nome` |
| Acessar array | `[*]` | `setores[*].nome` |
| Filtrar | `[?condicao]` | `setores[?status=='ativo']` |
| Projeção | `{chave: valor}` | `setores[*].{id: id, nome: nome}` |
| Funções | `funcao(expressao)` | `sum(setores[*].populacao)` |

### 6. **Funções úteis**

- `length()` - Conta elementos
- `sum()` - Soma valores
- `max_by()` - Encontra máximo por critério
- `min_by()` - Encontra mínimo por critério
- `sort()` - Ordena array
- `reverse()` - Inverte array

### 7. **Dicas de uso**

1. **Teste suas queries** no arquivo `exemplo-dados.json`
2. **Use comentários** com `#` para documentar suas queries
3. **Quebre queries complexas** em partes menores
4. **Use aspas simples** para strings: `'ativo'`
5. **Use backticks** para números: `` `15000` ``

### 8. **Exemplo completo**

Para extrair informações específicas dos seus dados de setores:

```jmespath
# Query complexa: setores ativos com população > 15000, ordenados por população
sort(setores[?status=='ativo' && populacao > `15000`], &populacao)[*].{nome: nome, populacao: populacao}
```

**Resultado:**
```json
[
  {"nome": "Centro", "populacao": 15000},
  {"nome": "Estreito", "populacao": 18000},
  {"nome": "Coqueiros", "populacao": 22000},
  {"nome": "Trindade", "populacao": 25000}
]
```

### 9. **Recursos da extensão**

- ✅ Syntax highlighting para JMESPath
- ✅ Autocompletar
- ✅ Validação de sintaxe
- ✅ Execução direta de queries
- ✅ Integração com arquivos JSON

### 10. **Próximos passos**

1. Experimente as queries no arquivo `exemplos-jmespath.jmespath`
2. Modifique o arquivo `exemplo-dados.json` para testar diferentes cenários
3. Crie suas próprias queries para seus dados reais
4. Explore a documentação oficial do JMESPath para mais funcionalidades

---

**Documentação oficial:** https://jmespath.org/
**GitHub da extensão:** https://github.com/jmespath/jmespath.vscode 