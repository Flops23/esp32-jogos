# ESP32 Jogos

Coleção de jogos multiplayer para jogar pelo celular dentro da mesma rede. O objetivo final é usar um ESP32 como servidor local, enquanto os jogadores continuam usando o navegador do celular.

## Primeiro jogo: Dominó

A primeira versão é um protótipo executável no navegador e preparado para a futura comunicação com o ESP32.

### Arquitetura

```text
Futuro:
ESP32 (servidor local)
        |
       Wi-Fi
   +----+----+----+
   |    |    |    |
 celular celular celular ...
```

O navegador será o cliente. O ESP32 ficará responsável pelo estado da partida e pela validação das jogadas.

## Teste atual

Abra `public/index.html` com o Live Server do VS Code. O protótipo possui um modo local para testar a interface e as regras sem servidor.

A comunicação futura usa WebSocket. O formato das mensagens está definido em `public/js/protocol.js` para manter o cliente independente da implementação do servidor.

## Estrutura

```text
public/
  index.html
  css/style.css
  js/protocol.js
  js/domino.js
  js/app.js
```

## Próximas etapas

1. Finalizar as regras do Dominó.
2. Criar salas e entrada por código.
3. Implementar cliente WebSocket.
4. Criar servidor WebSocket diretamente no ESP32.
5. Adicionar Batalha Naval, Stop e UNO usando o mesmo protocolo-base.
