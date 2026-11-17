# 🌌 SuperShift: Aventura em Gravidade Zero

[![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![HTML5 Canvas 60 FPS](https://img.shields.io/badge/HTML5_Canvas-60_FPS-10b981?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Deploy Ready](https://img.shields.io/badge/Deploy-GitHub_Pages_Ready-8b5cf6?style=flat-square)]()

Um jogo web de plataforma e ação de alta performance desenvolvido em **React**, **TypeScript**, **Tailwind CSS** e **HTML5 Canvas**, projetado com os mais altos padrões de arquitetura de código, separação de responsabilidades (*Clean Architecture*) e otimização de renderização a 60 FPS estáveis.

---

## 🎭 Heróis Cósmicos Jogáveis

O jogador pode escolher seu herói diretamente no Menu Principal através do botão **"HERÓI"**:

1. **Miguel Tricolor (Fluminense FC):**
   - *Visual:* Garoto de 10 anos, cabelos cacheados volumosos, camisa oficial listrada grená e verde com o monograma do Fluminense e chinelos Havaianas.
   - *Trait:* Equilibrado, veloz e destemido contra as anomalias espaciais.
2. **Red Treinador (Inspirado em Pokémon):**
   - *Visual:* Boné vermelho e branco com aba virada, colete azul com gola branca, calça jeans e tênis vermelhos.
   - *Trait:* Afinidade Elemental — Raio magnético de atração de moedas e Pocket Pets ampliado em +50%.
3. **Herói do Tempo (Inspirado em The Legend of Zelda):**
   - *Visual:* Túnica verde clássica, gorro longo pontudo, cabelos loiros e o lendário escudo Hylian nas costas.
   - *Trait:* Coragem de Hyrule — Maior sustentação aerodinâmica e controle acrobático no ar.
4. **Super Encanador (Inspirado em Mario):**
   - *Visual:* Boina e camisa vermelhas, macacão azul com botões dourados, luvas brancas e bigode marcante.
   - *Trait:* Salto Supremo — Salto 15% mais alto e ganha o dobro de pontuação ao atingir blocos `?`.
5. **Ouriço Supersônico (Inspirado em Sonic the Hedgehog):**
   - *Visual:* Espinhos azuis aerodinâmicos, luvas brancas e sapatilhas vermelhas de corrida.
   - *Trait:* Velocidade da Luz — Velocidade de corrida base +25% e efeito de Boost supersônico mais duradouro.
6. **Guerreiro Saiyajin (Inspirado em Dragon Ball / Goku):**
   - *Visual:* Cabelo espetado volumoso preto (com transformação dourada cintilante em Boost!), gi laranja com faixa azul e munhequeiras.
   - *Trait:* Aura de Ki Cósmica — Desintegra drones glitches ao correr em alta velocidade e ganha desaceleração de queda suave.

---

## 🗺️ 6 Fases com Paisagens Originais de Cada Franquia

Cada fase apresenta uma paisagem cinematográfica completa pintada proceduralmente no HTML5 Canvas com camadas de paralaxe dinâmicas:

1. **Setor 01: Mushroom Kingdom (Super Mario):**
   - Céu azul arcade com nuvens clássicas fofas de olhinhos ovais pretos, colinas verdes arredondadas, canos Warp Pipes no topo e silhueta do Castelo da Princesa Peach ao fundo.
2. **Setor 02: Green Hill Zone (Sonic the Hedgehog):**
   - Céu azul-ciano com oceano reluzente em ondas, montanhas em padrão xadrez (checkerboard terracota), cachoeiras com espuma, palmeiras tropicais geométricas e loops gigantes 360°.
3. **Setor 03: Santuário de Hyrule (The Legend of Zelda):**
   - Pôr do sol místico e crepuscular, a Sagrada Triforce dourada radiante no firmamento, a temida Montanha da Morte (Death Mountain) expelindo anéis de fumaça, Castelo de Hyrule e torres Sheikah com glifos cianos.
4. **Setor 04: Região de Kanto & Mt. Silver (Pokémon Universe):**
   - Noite estrelada em degradê violeta profundo, lua cheia reluzente com a silhueta de um pássaro lendário planando, picos nevados do Mt. Silver, Pokébola gigante holográfica e o Centro Pokémon com seu teto curvo vermelho.
5. **Setor 05: Planeta Namek & Kami's Lookout (Dragon Ball):**
   - O inconfundível céu esmeralda/turquesa de Namekusei com três sóis em órbita, o Templo Sagrado de Kami Sama flutuando nas nuvens, pilares rochosos cilíndricos e árvores alienígenas azuis.
6. **Setor 06: Núcleo SuperShift (Vórtice Multidimensional):**
   - Convergência cósmica de todas as realidades em uma gigantesca espiral quântica com ilhas dimensionais despedaçadas dos universos (Mario, Sonic, Zelda, Pokémon e Dragon Ball).

---

## 🎁 Novos Itens dos Blocos Misteriosos `?`

Os blocos interrogativos contêm agora um arsenal completo de itens clássicos dos videogames:

- **🍄 Cogumelo de Vida (Mario):** Restaura 1 coração de vida do personagem.
- **⭐ Estrela de Invencibilidade (Starman):** 7 segundos de invencibilidade estelar com rastro cintilante e velocidade aumentada.
- **🔮 Esfera do Dragão (Dragon Ball):** +1000 pontos imediatos e emite uma onda de choque que desintegra todos os drones na tela!
- **🔺 Triforce da Coragem (Zelda):** Concede super salto vertical com escudo protetor sagrado.
- **💍 Anel Dourado Especial (Sonic):** +500 pontos instantâneos e recarrega imediatamente a barra de Super Boost.
- **🐾 Pocket Pets (Pokémon):** Invoca Aero (Pulo Duplo), Sparky (Aura de Fogo) ou Volt (Ímã de Moedas).

---

## 🏛️ Arquitetura e Estrutura de Código

```
src/
├── data/
│   └── characters.ts          # Definição e traits dos 6 personagens jogáveis
├── types/
│   └── game.ts                # Tipagens de entidades, itens, personagens e fases
├── sound/
│   └── soundEngine.ts         # Síntese Web Audio API nativa com sons de power-up, esfera e anel
├── engine/
│   ├── physics.ts             # Motor de física 2D com multiplicadores de traits e itens
│   ├── particles.ts           # ParticleSystem com Object Pooling
│   ├── renderer.ts            # Renderizador dos 6 personagens e dos 6 biomas espaciais
│   ├── levelData.ts           # Design dos 6 setores cósmicos com os novos itens
│   └── gameEngine.ts          # Game loop desacoplado com modo Live Background
├── components/
│   ├── MenuPrincipal.tsx      # Menu clássico com botão de escolha de personagens e tela ao vivo
│   ├── ModalSelecaoPersonagem.tsx # Seletor interativo de heróis cósmicos
│   ├── HUDInGame.tsx          # HUD com indicador de setor e medidor de gravidade
│   ├── BannerTransicaoFase.tsx # Notificação cinematográfica de transição entre setores
│   ├── CanvasGameEngine.tsx   # Wrapper React do Canvas com DPI scaling e ResizeObserver
│   ├── TouchControls.tsx      # D-Pad e botões de ação para mobile/touchscreen
│   ├── ModalGameOver.tsx      # Resumo da partida e setor alcançado
│   ├── PainelConfiguracoes.tsx # Modulação de áudio e touch UI
│   ├── ModalGraficos.tsx      # Filtro CRT Scanlines, partículas e monitor FPS
│   └── ModalComandos.tsx      # Guia ilustrado completo de controles
├── hooks/
│   ├── useGameControls.ts     # Hook unificado de teclado e toque
│   └── useLocalStorage.ts     # Persistência de High Score e personagem ativo
├── styles/
│   └── index.css              # Diretivas Tailwind e classes CRT Scanlines
├── App.tsx                    # Orquestrador central dos estados
└── main.tsx                   # Ponto de entrada React 19
```

---

## 🕹️ Controles

| Ação | Teclado | Controles Táteis (Mobile) |
|---|---|---|
| **Mover** | `A` / `D` ou `◀` / `▶` | Botões `◀` `▶` |
| **Pulo / Pulo Duplo** | `Espaço` / `W` / `▲` | Botão `▲` |
| **Super Boost** | `Shift` / `K` | Botão `⚡` |
| **Pausar** | `P` ou `Esc` | Botão Pause no HUD |
| **Reiniciar** | `R` | Botão no Modal |

---

## 🛠️ Executar Localmente e Deploy

```bash
# Rodar localmente em http://localhost:3000
npm run dev

# Build de produção pronto para GitHub Pages
npm run build
```
