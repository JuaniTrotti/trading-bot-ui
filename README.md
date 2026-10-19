# Bot Operations Dashboard

Dashboard para visualizar las operaciones y decisiones de un trading bot.

## Descripción

Esta aplicación muestra el historial de operaciones de un bot de trading, incluyendo:
- Lista de todas las posiciones (trades) ejecutadas
- Detalle de cada operación: símbolo, precios de entrada/salida, PnL, duración
- Decisiones de compra/venta con sus preguntas y scores de confianza
- Animaciones para visualizar el progreso de las decisiones

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.js           # Página principal
│   └── layout.js         # Layout raíz
├── components/
│   ├── ActionBadge.js    # Badge BUY/SELL
│   ├── DetailPanel.js    # Panel de detalle de operación
│   ├── OperationItem.js  # Item individual de operación
│   ├── OperationsList.js # Sidebar con lista de operaciones
│   ├── ScoreItem.js      # Pregunta con scores animados
│   └── Summary.js        # Resumen de stats
├── hooks/
│   └── useReducedMotion.js
└── lib/
    ├── api.js            # Fetch a la API
    └── utils.js          # Helpers: mapTradeToOperation, formatDuration
```

## Getting Started

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## API

La aplicación consume datos de:
```
https://jtrotti.com/api/trading-bot-service/testnet/positions/history
```

El endpoint devuelve un array de `trades` con la siguiente estructura:
- `_id`: ID de la operación
- `symbol`: Símbolo trading (ej: BTCUSDT)
- `side`: BUY o SELL
- `entryPrice` / `exitPrice`: Precios de entrada y salida
- `pnlPct`: Porcentaje de ganancia/pérdida
- `openedAt` / `closedAt`: Timestamps
- `buyTrace` / `sellTrace`: Trace de decisiones con questions y answers

## Animaciones

Las animaciones se realizan con GSAP:
- Header del detail panel: fade-in con stagger
- Score items: fade-in + slide-up con delay escalonado
- Barras de score: animación de ancho progresivo
