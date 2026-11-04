---
name: Bispo Studio
description: Sites para quem imprime e vende peças em 3D. Versão "Luz", com fundo índigo iluminado como estúdio de retrato.
colors:
  electric-indigo: "#6331fb"
  indigo-highlight: "#8d60ff"
  indigo-deep: "#3b17b4"
  indigo-night: "#13063b"
  tropical-mint: "#88f9c0"
  mint-press: "#6fefad"
  onyx-black: "#01010d"
  surface: "#0a0a1d"
  surface-raised: "#12122c"
  ink: "#eeedfb"
  muted: "#a9a8c8"
  on-indigo: "#ffffff"
  on-indigo-muted: "#e2dbff"
  on-mint: "#01010d"
  hairline: "rgba(238, 237, 251, 0.18)"
typography:
  display-caps:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "clamp(3.5rem, 1.5rem + 7vw, 8.5rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  display-italic:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.1rem, 1rem + 4vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  hero-caps:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "clamp(4.5rem, 1rem + 11.4vw, 14rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  title-caps:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "clamp(2.25rem, 1.6rem + 1.6vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1
  title-italic:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.5vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.3
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.45vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.12em"
  label-small:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.2em"
  button:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  photo-sm: "14px"
  photo: "18px"
  panel: "24px"
  band: "32px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 5.4vw, 88px)"
  section: "clamp(120px, 14vw, 220px)"
  row: "16px"
  stack: "28px"
components:
  button-primary:
    backgroundColor: "{colors.tropical-mint}"
    textColor: "{colors.on-mint}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.mint-press}"
    textColor: "{colors.on-mint}"
  button-outline:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "56px"
  button-outline-hover:
    backgroundColor: "{colors.tropical-mint}"
    textColor: "{colors.on-mint}"
  tag:
    backgroundColor: "{colors.tropical-mint}"
    textColor: "{colors.on-mint}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  nav-link:
    textColor: "{colors.on-indigo}"
    typography: "{typography.label}"
    height: "44px"
  plan-featured:
    backgroundColor: "{colors.electric-indigo}"
    textColor: "{colors.on-indigo}"
    rounded: "{rounded.panel}"
    padding: "clamp(28px, 2.8vw, 44px)"
  calculator-panel:
    backgroundColor: "{colors.onyx-black}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "clamp(18px, 2.4vw, 32px)"
  calculator-field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.muted}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
---

# Design System: Bispo Studio

## Overview

**Creative North Star: "O Estúdio de Retrato"**

A página é um estúdio fotográfico montado para a impressora 3D. Um fundo de luz índigo, aceso no alto e no centro, cai até o preto Onyx nas bordas e embaixo. A máquina aparece no meio como quem posa para um retrato. As palavras ficam em volta dela, nunca por cima de um cartão: caixa alta condensada (Anton) que bate forte, emendada com um itálico serifado (Bodoni Moda) que responde baixinho. A interface fica no Archivo: rótulos pequenos em caixa alta espaçada, listas separadas por linhas finas, botões em pílula Tropical Mint.

O mundo foi fixado pelo dono a partir de uma imagem de referência (2026-11-04), não sorteado. O gradiente de luz, as pílulas, os rótulos espaçados e as listas de linha fina são a gramática da casa. A densidade é baixa: blocos grandes de título, muito respiro entre as seções (120 a 220 px) e conteúdo organizado em linhas em vez de caixas.

O movimento faz parte do mundo: a caixa alta sobe de dentro da própria linha, o itálico chega de lado saindo do desfoque, uma luz grande passeia atrás das seções conforme a rolagem e as lojas correm de lado num corredor preso ao scroll. Com `prefers-reduced-motion`, tudo isso para e o corredor vira uma pilha.

**Key Characteristics:**
- Fundo índigo iluminado em gradiente radial, terminando em Onyx Black.
- Títulos em par: caixa alta condensada em cima, itálico serifado embaixo.
- Tropical Mint como contraluz: botões, rótulos, marcadores, valores, foco.
- Listas e tabelas feitas só de linhas finas (18% de opacidade), sem cartões.
- Cantos arredondados só em pílulas, fotos e painéis de luz; o resto fica reto.

## Colors

Uma noite índigo com uma única contraluz verde-menta.

### Primary
- **Electric Indigo** (#6331fb): a luz do estúdio. Centro do gradiente `--lit` (de Indigo Highlight no ponto mais claro, passando por Electric Indigo e Indigo Deep até Indigo Night), cor da luz que passeia entre as seções, faixa do Precifica, plano em destaque e canal ativo da calculadora.
- **Indigo Highlight** (#8d60ff), **Indigo Deep** (#3b17b4), **Indigo Night** (#13063b): paradas do gradiente de luz. Não aparecem chapadas fora dele.

### Secondary
- **Tropical Mint** (#88f9c0): a contraluz. Fundo das pílulas principais e da etiqueta, contorno das pílulas secundárias, rótulos pequenos em caixa alta, valores à direita das listas, marcadores redondos, sinal de mais do FAQ, preço calculado, seleção de texto e anel de foco.
- **Mint Press** (#6fefad): só o estado de hover da pílula mint.

### Neutral
- **Onyx Black** (#01010d): fundo da página, cor da barra fixa (a 92%) e texto sobre mint.
- **Surface** (#0a0a1d): fundo de espera das fotos das lojas.
- **Surface Raised** (#12122c): trilhos e campos da calculadora.
- **Ink** (#eeedfb): texto corrido sobre o preto.
- **Muted** (#a9a8c8): legendas, links do rodapé, texto legal.
- **On Indigo** (#ffffff): títulos e texto sobre a luz índigo.
- **On Indigo Muted** (#e2dbff): texto de apoio sobre o índigo e respostas do FAQ.
- **Hairline** (rgba 238 237 251 / 18%): todas as linhas finas de lista, divisões entre planos e rodapé. Sobre a faixa índigo do Precifica, a linha sobe para branco a 24%.

### Named Rules
**The Lit Room Rule.** O índigo vive como luz (gradiente radial `--lit` ou o foco que passeia), não como bloco chapado. O plano em destaque e a faixa do Precifica recebem o mesmo gradiente do topo.

**The One Backlight Rule.** Mint é a única cor de destaque. Laranja (#ff9f6b) e os lilases da barra de custos existem só como cores de dado dentro da calculadora.

## Typography

**Display Font:** Anton (com Impact)
**Accent Font:** Bodoni Moda itálico (com Georgia)
**Body/Label Font:** Archivo (com system-ui)

**Character:** A caixa alta condensada é o grito de vitrine; o itálico Bodoni é a voz de quem fala de perto. Juntos fazem o título soar como capa de revista. O Archivo segura a interface com firmeza e sem enfeite.

### Hierarchy
- **Hero** (Anton 400, clamp(4.5rem, 1rem + 11.4vw, 14rem), 0.9; no celular 23vw): só o "SITES" e o "E VENDE" do topo. O itálico do par vai a clamp(2.25rem, 0.6rem + 5vw, 6.5rem).
- **Display** (Anton 400 de 0.9 + Bodoni itálico 400 de 1.0): títulos de seção, sempre em par, palavra condensada em cima e frase em itálico logo abaixo (margem de -0.06em). Três tamanhos observados: padrão, `titleBig` e `titleHuge` (até 10rem) e `titleMid` (até 6.5rem) para títulos dentro do corredor das lojas.
- **Title** (Anton 400, até 3.25rem, 1.0): nome e preço dos planos (o preço vai a clamp(3rem, 2rem + 2.6vw, 4.75rem)). O itálico de título (até 1.5rem) faz o "para quê" do plano; até 2.25rem nos termos de pagamento; 1.375rem nos preços do Precifica.
- **Lead** (Archivo 400, até 1.375rem, 1.5, máximo 44ch): parágrafo de abertura de seção.
- **Body** (Archivo 400, 1.0625rem, 1.55): texto corrido; respostas com máximo de 58ch.
- **Label** (Archivo 600, 0.75 a 0.875rem, caixa alta, 0.08 a 0.14em): navegação, itens das listas de linha fina, nomes das linhas da tabela de planos, tipo de cada loja. Em mint quando é informação de destaque, em branco quando é item de lista.
- **Label small** (Archivo 600, 0.6875rem, caixa alta, 0.2 a 0.24em): subtítulo do logo e faixa "Testado nas minhas lojas com".
- **Button** (Archivo 700, 0.9375rem, caixa alta, 0.04em).

### Named Rules
**The Paired Title Rule.** Título de seção é sempre o par caixa alta + itálico, nesta ordem; nunca só um dos dois, nunca o itálico em caixa alta.

**The Clean Accent Rule.** A máscara de entrada da caixa alta recorta só por baixo da linha (`clip-path: inset(-0.6em -0.3em -0.3em -0.3em)`), para Ó, Ú, É e Ç passarem inteiros.

## Layout

Página de uma coluna com margem lateral fluida (16 a 88 px) e grandes intervalos entre seções (120 a 220 px). O topo é uma composição livre em tela cheia (mínimo de 100svh ou 760 px): impressora centrada a 86% da altura, palavras posicionadas nos quatro cantos em volta dela, com esmaecimento para o preto nos últimos 26%.

Dentro das seções, a grade é de duas colunas iguais (sobre, termos, Precifica) ou 5/7 (dúvidas, com a coluna da esquerda fixa a 120 px do topo), e três colunas para os planos. As lojas correm num corredor horizontal preso ao scroll, com painéis de 40vw (introdução), 84vw (projeto, imagem 1.25fr ao lado do texto) e 70vw (peças em 4 colunas).

Pontos de quebra observados: 1100 px (navegação vira menu que desce), 959 px (grades viram uma coluna, corredor vira pilha, planos empilham), 759 px (o topo vira fluxo: título em cima, impressora no meio, texto, garantias e ferramentas embaixo; pílulas principais ocupam a largura toda).

## Elevation & Depth

Não há sombras. A profundidade vem da luz: o gradiente radial `--lit` atrás do topo, do plano em destaque, da faixa do Precifica e do fecho; uma luz circular de 110vmax fixa atrás da página que muda de posição, tamanho, opacidade e cor (índigo, ou mint a 38% no Precifica) conforme a seção entra; e o esmaecimento em degradê do índigo para o Onyx no pé do topo. A barra de navegação ganha fundo Onyx a 92% depois que a página rola.

### Named Rules
**The Light-Not-Shadow Rule.** Para separar um plano do fundo, acenda a luz atrás dele; não projete sombra.

## Shapes

Formas retas por padrão: planos, linhas de lista, campos e trilhos da calculadora têm canto zero. O arredondamento é reservado para quatro coisas: pílulas (999px) em botões e na etiqueta; fotos (14px nas peças, 18px nas capturas das lojas, círculo nas miniaturas de 88px e nos marcadores de 8px); painéis de luz (24px no plano em destaque, só embaixo no desktop e inteiro no celular; 24px no quadro da calculadora); e a faixa do Precifica (32px só no alto, 24px no celular). Linhas são sempre de 1px; contornos de pílula e sublinhados da navegação, de 1.5px.

## Components

### Buttons
Pílulas firmes, em caixa alta, com uma seta que anda.
- **Shape:** pílula completa (999px), altura mínima de 56px (46px na barra do topo), 28px de respiro lateral, 14px entre texto e seta.
- **Primary:** fundo Tropical Mint, texto Onyx.
- **Outline:** contorno mint de 1.5px, texto Ink, fundo transparente.
- **Hover / Focus:** a primária escurece para Mint Press; a de contorno se enche de mint. A seta desliza 5px para a direita (260ms). Pressionar encolhe para 97%. Foco é o anel mint de 3px afastado 3px, global.

### Chips
- **Etiqueta:** pílula mint com texto Onyx, 0.6875rem, 700, caixa alta 0.12em. Usada uma vez: "Mais completa" no plano em destaque.

### Hairline Lists
A assinatura da interface: conteúdo em linhas, sem caixas.
- Linhas separadas por 1px de Hairline; a primeira e a última fecham a lista em cima e embaixo quando a lista é autônoma.
- Item em Label branco à esquerda, valor em mint à direita (lista "Eu também vendo"); nos planos, nome da linha em Label On Indigo Muted e valor em Archivo 600.
- Lista de opções do Precifica: linhas de 64px com nome em mint, preço em itálico Bodoni e seta; no hover a linha recua 12px.

### Cards / Containers
- **Planos:** três colunas sem fundo, divididas por linhas finas e com uma linha no alto. O plano em destaque recebe a luz `--lit`. Respiro interno de 28 a 44px, 22px entre blocos, pílula no pé.
- **Fotos das lojas:** proporção 16:10.5, canto 18px, recorte pelo alto.

### Inputs / Fields
- **Calculadora (Precifica):** quadro Onyx de canto 24px dentro da faixa índigo; seletor de canal em dois botões retos sobre Surface Raised (o ativo vira Electric Indigo); controles deslizantes com trilho reto de 8px em Surface Raised, preenchimento mint e alça quadrada Ink de 22px; preço em Archivo 700 mint de até 3.75rem; barra de custos reta de 18px.
- **Focus:** anel mint de 3px.

### Navigation
- Barra fixa em três colunas (logo, links, WhatsApp + pílula de contorno), 88px de altura que vira 72px com fundo Onyx a 92% ao rolar.
- Links em Label branco 0.8125rem, 0.12em; no hover um sublinhado mint de 1.5px cresce da esquerda.
- Logo: "Bispo Studio" em Archivo 700 com o ponto final em mint, e subtítulo em Label small.
- Abaixo de 1100px: botão "Menu" em caixa alta; os links descem numa folha Onyx com linhas de 56px e a pílula mint na largura toda.

### FAQ
- Perguntas em Archivo 600 (até 1.25rem) em linhas de 72px entre linhas finas; sinal de mais desenhado com duas barras mint que gira 45° ao abrir; resposta abre pela altura da grade (380ms).

### Printer Portrait (signature)
- Fotos das impressoras recoloridas pelo `site/scripts/luz_printers.py`: sombras quase pretas, meios-tons índigo, luzes lilás, recorte sem fundo e contraluz mint nas bordas. Revezam a cada 4,2s, entrando com desfoque de 12px e escala de 1.05 (1.1s, `--ease-out`).

## Do's and Don'ts

### Do:
- **Do** acender o índigo como luz radial (`--lit`) atrás de topo, plano em destaque, Precifica e fecho.
- **Do** escrever todo título de seção como par Anton em caixa alta + Bodoni Moda itálico.
- **Do** usar pílulas mint (999px, 56px de altura) para toda ação, com seta que anda 5px no hover.
- **Do** organizar listas, tabelas e garantias em linhas finas de 1px a 18%.
- **Do** usar Tropical Mint como a única cor de destaque: rótulos, valores, marcadores, foco.
- **Do** passar toda foto de máquina nova pelo `luz_printers.py` antes de colocar na luz.
- **Do** manter área de toque mínima de 44px em links de texto.

### Don't:
- **Don't** pôr sombra em nada; a profundidade é luz e degradê.
- **Don't** arredondar planos, linhas ou campos; arredondamento é só de pílula, foto e painel de luz.
- **Don't** usar o índigo chapado como fundo de bloco fora do gradiente (exceção: canal ativo da calculadora).
- **Don't** usar o itálico Bodoni em caixa alta, nem o Anton em caixa baixa.
- **Don't** colocar um rótulo pequeno em caixa alta acima de um título como chapéu; o rótulo acompanha o conteúdo (abaixo do título ou como item de lista).
- **Don't** usar o laranja da calculadora fora da barra de custos.
