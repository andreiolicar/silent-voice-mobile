# Arquitetura

## Stack

React Native com Expo SDK 57, TypeScript estrito, Expo Router, Zustand, React Native Safe Area Context, Expo Font e Manrope. O projeto permanece no fluxo managed do Expo e pode receber `expo-dev-client` quando um Development Build for necessário.

## Organização

- `app/`: entradas finas de rota e composição global do Expo Router; os fluxos inicial e principal delegam a UI para `src/features/`.
- `src/components/ui/`: primitivas visuais genéricas orientadas pelo Design System.
- `src/components/layout/`: Screen, cabeçalhos e navegação visual compartilhada.
- `src/components/silent-voice/`: padrões visuais próprios do produto, sem lógica de feature.
- `src/domain/`: contratos e tipos independentes de UI e infraestrutura.
- `src/stores/`: stores Zustand pequenas, separadas por responsabilidade.
- `src/theme/`: tokens visuais centralizados.
- `src/features/`: módulos verticais do fluxo inicial, playground e visão geral do sistema.
- `src/services/`: reservado para integrações e adapters concretos.

Pastas sem implementação não são preenchidas com arquivos vazios; surgem junto com a primeira responsabilidade real.

## Limite do dispositivo

A aplicação depende de `SilentVoiceDevice`, nunca de uma biblioteca Bluetooth. Um futuro `BleSilentVoiceDevice` implementará o contrato em infraestrutura, enquanto um `MockSilentVoiceDevice` permitirá desenvolvimento e testes sem hardware.

```text
UI / feature -> SilentVoiceDevice <- BLE adapter
                                  <- Mock adapter
```

Os estados de conexão e sessão são tipos de domínio. A descoberta e a conexão atuais são mocks visuais; não existe integração BLE ou código nativo neste ciclo.

## Visão geral do sistema

As rotas internas de Home, Status dos Módulos e Saúde do Sistema permanecem em `app/(main)/`, enquanto UI, mocks e composição ficam em `src/features/system-overview/`. O estado atual é demonstrativo e centralizado em um mock tipado; nenhuma telemetria, persistência ou integração BLE foi simulada.

O resumo de módulos da Home é derivado dos módulos obrigatórios: OpenMV Cam H7, Myoware 2.0, INMP441 e IMU. Por isso a interface exibe `4/4 Operando`; `Confirmation` é opcional e não entra no denominador, mesmo que o wireframe mostre `5/5`. A métrica do processador usa a nomenclatura normalizada `ESP32-S3`, e o gráfico de estabilidade é um asset estático local do Figma.
