# 🍅 Pomodoro Timer

Um aplicativo de produtividade baseado na técnica Pomodoro, desenvolvido para ajudar no gerenciamento de tempo durante sessões de foco e descanso.

## 🚀 Funcionalidades

- ⏱️ Timer de foco, descanso curto e descanso longo
- 🔁 Controle de ciclos automáticos
- 🔔 Notificações no navegador ao final de cada etapa
- 🔊 Feedback sonoro (início, pausa e término)
- 🎛️ Configuração personalizada de tempo (focus, short break, long break, ciclos)
- ▶️ Controles de Start / Stop / Reset
- 📊 Contagem de ciclos concluídos

## 🧠 Conceitos aplicados

Este projeto foi desenvolvido com foco em aprendizado e evolução técnica, aplicando:

- Hooks customizados (useTimer, useNotification)
- Separação de responsabilidades
- Tipagem forte com TypeScript
- Event-driven (comunicação baseada em eventos)
- Object Parameter Pattern
- Refatoração para reduzir duplicação
- Organização modular de código

## 🏗️ Arquitetura

O core da aplicação gira em torno do hook:

### `useTimer`

Responsável por:

- Controle do tempo
- Alternância entre modos (Focus / Short Break / Long Break)
- Gerenciamento de ciclos
- Emissão de eventos (`focusEnd`, `shortbreakEnd`, `longbreakEnd`)

### 🔔 `useNotification`

Responsável por:

- Solicitar permissão do navegador
- Disparar notificações ao usuário

## 🧩 Sistema baseado em eventos

O fluxo foi refatorado de:

```bash
boolean (isFinished)
```

para:

```bash
event-driven (event)
```

Exemplo de eventos:

- focusEnd
- shortbreakEnd
- longbreakEnd

## 📂 Estrutura do projeto

```bash
 src/
  ├── components/
  ├── hooks/
  │ ├── useTimer/
  │ └── useNotification/
  ├── types/
  │ ├── timer-config.ts
  │ ├── timer-map.ts
  │ ├── timer-condition.ts
  │ └── event-timer.ts
  ├── sounds/
  └── pages/
```

## ⚙️ Tecnologias

- React
- TypeScript
- Vite (ou CRA, dependendo do seu setup)
- Web Notifications API

## 🧪 Como rodar o projeto

```bash
# Clonar o repositório

git clone <url-do-repo>

# Entrar na pasta

cd pomodoro

# Instalar dependências

npm install

# Rodar o projeto

npm run dev
```

## 🔐 Permissão de Notificação

Ao iniciar o timer, o navegador solicitará permissão para enviar notificações.

Caso esteja bloqueado:

- Clique no ícone de cadeado na barra de URL
- Permita notificações manualmente

## 💡 Aprendizados

Durante o desenvolvimento, foram reforçados conceitos importantes como:

- Refatoração orientada a melhoria real (não apenas estética)
- Redução de acoplamento
- Uso de tipagem como ferramenta de design
- Organização de lógica complexa em estruturas escaláveis

## 👨‍💻 Autor

`Paulo Robert`

## 📌 Observação

Este projeto faz parte do meu processo de aprendizado contínuo em desenvolvimento Web, com foco em boas práticas e arquitetura de código.
