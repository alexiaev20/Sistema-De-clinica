# Clínica de Consultas


### 📝Funcionalidades do Projeto

#### Cadastrar Pacientes:
- Entrada de Dados: Solicita ao usuário para inserir nome, telefone, data de nascimento, e-mail e CPF do paciente.
- Validação de Dados: Verifica se o paciente já está cadastrado com base no número de telefone. Se já estiver cadastrado, exibe uma mensagem informando que o paciente já está cadastrado e retorna ao menu principal.
- Confirmação de Cadastro: Após o cadastro bem-sucedido, exibe a mensagem "Paciente cadastrado com sucesso" e adiciona o paciente à lista de pacientes cadastrados.
- Retorno ao Menu: Retorna ao menu principal após o cadastro.

#### Marcações de Consulta:
- Lista de Pacientes: Exibe uma lista numerada dos pacientes cadastrados.
- Seleção de Paciente: Solicita ao usuário selecionar um paciente pelo número correspondente na lista.
- Dados da Consulta: Pede ao usuário para inserir o dia, hora e especialidade desejada para a consulta.
- Validação de Horário: Verifica se o horário e dia solicitados estão disponíveis para agendamento. Caso contrário, exibe uma mensagem de conflito de horário e retorna ao menu principal.
- Confirmação de Agendamento: Após o agendamento bem-sucedido, adiciona a consulta à lista de agendamentos e exibe uma mensagem de confirmação.
- Retorno ao Menu: Retorna ao menu principal após o agendamento.

#### Cancelamento de Consultas:
- Lista de Agendamentos: Exibe uma lista numerada das consultas agendadas.
- Seleção de Consulta: Solicita ao usuário selecionar uma consulta pelo número correspondente na lista.
- Confirmação de Cancelamento: Exibe os detalhes da consulta selecionada e permite ao usuário confirmar o cancelamento.
- Remoção do Agendamento: Se confirmado, remove a consulta da lista de agendamentos e exibe uma mensagem de cancelamento bem-sucedido.
- Retorno ao Menu: Retorna ao menu principal após o cancelamento.
#### Sair
- Finalização: Encerra a execução do programa fechando.

## 👨🏽‍💻 Foram utilizadas

- HTML5
- CSS3
- JavaScript
- Font Awesome (para ícones)
- Google Fonts (para tipografia)
- SweetAlert2 (para diálogos)

## 🛠️ Tomada de Decisões

**Linguagem de Programação: JavaScript**

Escolhi a linguagem de programação JavaScript para desenvolver este projeto porque é amplamente utilizada no desenvolvimento web e permite criar interações dinâmicas no lado do cliente. Além disso, a familiaridade com tecnologias de front-end como HTML e CSS complementa a utilização do JavaScript para criar uma aplicação completa e responsiva.

**Armazenamento de Dados: localStorage**

Para armazenar os dados, utilizei o localStorage do navegador porque é uma maneira simples e rápida de armazenar informações de forma persistente, sem a necessidade de instalar ou configurar um banco de dados externo. O localStorage permite que os dados permaneçam armazenados mesmo após o fechamento do navegador, garantindo que as informações dos pacientes e consultas agendadas sejam preservadas.

## ✒️ Autor

**Alexia Evelyn**







