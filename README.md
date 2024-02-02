Stack: NodeJS, Express, PostgresSQL

## Requisitos Funcionais
- [X] Autenticação JWT
- [X] Persistência em banco de dados
- [X] Cadastro de pessoa;
- [X] Cadastro de livro;
- [X] Cadastro de copia;
- [X] Controle de aluguel;
- [X] Listar títulos mais atrasados
- [ ] Listar mais alugados por cidade
- [X] Restrição de pessoa com atraso recorrente

## Regras de Negocio
- [X] Uma cópia de um livro não pode estar com mais de uma pessoa ao mesmo tempo.
- [X] Todos os campos são obrigatórios no cadastro de pessoa, livro e cópia.
- [X] Ao alugar um livro, é necessário registrar a data de aluguel.
- [X] Ao registrar a devolução, é necessário calcular e registrar atrasos, se houver.

## Requisitos não funcionais
- [X] Segurança
- [X] Desempenho
- [X] Boas práticas

