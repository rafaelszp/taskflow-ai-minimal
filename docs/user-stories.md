# User Stories Essenciais - TaskFlow AI Minimal

**Product Name**: TaskFlow AI Minimal
**Document Owner**: Rafael
**Version**: 1.0
**Last Updated**: 22 de julho de 2025

-----

## 1\. Introdução

Este documento apresenta as user stories essenciais para o MVP (Minimum Viable Product) do TaskFlow AI Minimal, baseadas nos requisitos funcionais detalhados nos FRDs de Frontend e Backend, e nas personas do PRD. As user stories descrevem as funcionalidades do ponto de vista do usuário, focando no valor que cada funcionalidade entrega.

-----

## 2\. User Stories

### 2.1 Módulo de Autenticação e Gerenciamento de Usuário

  * **US-AUTH-001**: Como um **Indivíduo Ocupado**, eu quero **fazer login no TaskFlow AI Minimal**, para que eu possa acessar minhas tarefas e funcionalidades personalizadas.

      * **Critérios de Aceitação**:
          * Dado que estou na tela de login, quando insiro meu e-mail/usuário e senha corretos, então sou redirecionado para o dashboard.
          * Dado que estou na tela de login, quando insiro credenciais inválidas, então recebo uma mensagem de erro clara.

  * **US-AUTH-002**: Como um **Indivíduo Ocupado**, eu quero **fazer logout do TaskFlow AI Minimal**, para que eu possa proteger minhas informações e finalizar minha sessão.

      * **Critérios de Aceitação**:
          * Dado que estou logado, quando clico no botão de logout, então sou redirecionado para a tela de login.

  * **US-AUTH-003**: Como um **novo Indivíduo Ocupado**, eu quero **criar uma nova conta no TaskFlow AI Minimal**, para que eu possa começar a organizar minhas tarefas.

      * **Critérios de Aceitação**:
          * Dado que estou na tela de registro, quando preencho as informações necessárias (e-mail, senha) e clico em registrar, então minha conta é criada e sou logado no sistema.
          * Dado que estou na tela de registro, quando tento registrar com um e-mail já existente ou senhas que não coincidem, então recebo uma mensagem de erro apropriada.

### 2.2 Módulo de Gerenciamento de Tarefas

  * **US-TASK-001**: Como um **Indivíduo Ocupado**, eu quero **criar uma nova tarefa**, para que eu possa registrar meus compromissos e atividades.

      * **Critérios de Aceitação**:
          * Dado que estou no dashboard, quando clico em "Adicionar Tarefa", então sou levado a um formulário de criação de tarefa.
          * Quando preencho o título (obrigatório), descrição e prazo (opcionais), e salvo, então a tarefa é criada e aparece na minha lista de tarefas.
          * Quando a tarefa é criada, a prioridade sugerida pela IA é exibida.

  * **US-TASK-002**: Como um **Indivíduo Ocupado**, eu quero **visualizar minhas tarefas por status**, para que eu possa ter uma visão clara do que preciso fazer, o que está em andamento e o que já concluí.

      * **Critérios de Aceitação**:
          * Dado que estou no dashboard, então vejo minhas tarefas agrupadas em "A Fazer", "Em Andamento" e "Concluídas".
          * Cada tarefa exibe seu título, descrição (truncada), prazo e prioridade destacada.

  * **US-TASK-003**: Como um **Indivíduo Ocupado**, eu quero **editar os detalhes de uma tarefa existente**, para que eu possa atualizar informações como título, descrição, prazo ou status.

      * **Critérios de Aceitação**:
          * Dado que estou visualizando uma tarefa, quando clico para editá-la, então sou levado a um formulário pré-preenchido com os detalhes da tarefa.
          * Quando altero qualquer campo (título, descrição, prazo, status) e salvo, então as alterações são refletidas na lista de tarefas.
          * Quando o título, descrição ou prazo são alterados, a prioridade pode ser recalculada pela IA, e eu posso ajustá-la manualmente.

  * **US-TASK-004**: Como um **Indivíduo Ocupado**, eu quero **excluir uma tarefa**, para que eu possa remover compromissos que não são mais relevantes.

      * **Critérios de Aceitação**:
          * Dado que estou visualizando ou editando uma tarefa, quando clico em "Excluir", então uma confirmação é solicitada.
          * Quando confirmo a exclusão, então a tarefa é removida da minha lista.

### 2.3 Módulo de Inteligência Artificial

  * **US-AI-001**: Como um **Indivíduo Ocupado**, eu quero **receber sugestões automáticas de prioridade para minhas tarefas**, para que eu possa focar no que é mais importante sem ter que decidir manualmente.
      * **Critérios de Aceitação**:
          * Dado que estou criando ou editando uma tarefa, quando insiro o título e/ou descrição e prazo, então o sistema sugere uma prioridade (alta, média, baixa).
          * Posso aceitar ou ajustar manualmente a prioridade sugerida.

### 2.4 Módulo de Notificações

  * **US-NOTIF-001**: Como um **Indivíduo Ocupado**, eu quero **receber notificações push sobre prazos de tarefas iminentes**, para que eu não me esqueça de compromissos importantes.
      * **Critérios de Aceitação**:
          * Dado que uma tarefa tem um prazo próximo (e.g., 24 horas antes), então recebo uma notificação no aplicativo.
          * A notificação inclui o título da tarefa e seu prazo.

### 2.5 Módulo de Feedback e Usabilidade

  * **US-UX-001**: Como um **Indivíduo Ocupado**, eu quero **ver mensagens claras quando algo dá errado**, para que eu possa entender o problema e como resolvê-lo.

      * **Critérios de Aceitação**:
          * Quando tento salvar uma tarefa sem um título, então uma mensagem de erro aparece ao lado do campo do título.
          * Quando há um problema de conexão com o servidor, então uma mensagem de erro geral aparece na tela, sem bloquear a interface.

  * **US-UX-002**: Como um **Indivíduo Ocupado**, eu quero **saber quando o sistema está processando uma ação**, para que eu não fique esperando sem saber o que está acontecendo.

      * **Critérios de Aceitação**:
          * Quando clico em "Salvar Tarefa", então um indicador de carregamento (e.g., spinner) aparece no botão ou na tela até a operação ser concluída.

