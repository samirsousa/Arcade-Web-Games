# Stacker Pro: Urban Builder 🏙️⚡

Um jogo arcade cyberpunk de ritmo e precisão geométrica construído com **React 19**, **TypeScript 5.7**, **Tailwind CSS 3.4** e **HTML5 Canvas (60 FPS)**.

---

## 🎮 Mecânicas do Jogo

- **Stacking de Alta Velocidade:** Blocos oscilam horizontalmente. O jogador deve soltá-los exatamente sobre o topo da pilha anterior.
- **Corte Dinâmico a Laser (Overhang Slice):** Qualquer excesso desalinhado é cortado fisicamente e despenca com rotação e gravidade no abismo urbano, estreitando a torre.
- **Perfect Placement & Combos:** Encaixes dentro da margem de tolerância ativam o status **PERFECT**, tocando arpeggios harmônicos ascendentes, liberando faíscas neon e recuperando largura da torre em sequências de combos!
- **Câmera Vertical Cinematográfica:** À medida que a torre sobe, a câmera desliza suavemente revelando 6 camadas urbanas:
  1. *Ground Zero (Subsolo Cyber)*
  2. *Neon Midtown (Avenida Neon)*
  3. *High-Tech District (Centro Financeiro)*
  4. *Skyline Spires (Arranta-Céus)*
  5. *Stratosphere Apex (Camada de Nuvens)*
  6. *Orbital Elevator (Estação Espacial)*
- **Sistema de Vidas (Tolerância):** 3 chances antes do colapso estrutural.
- **Sintetizador Web Audio:** Trilha synthwave procedural e SFX arcade 100% sintetizados via código sem dependência de arquivos externos de áudio.

---

## 🕹️ Controles

| Ação | Teclado | Mobile |
| :--- | :--- | :--- |
| **Soltar Bloco** | `Espaço` / `Enter` / Clique | Botão tátil `SOLTAR BLOCO` ou Toque na tela |
| **Pausar / Retomar** | `P` / `Esc` | Botão de Pausa no HUD |
| **Reiniciar Partida** | `R` (durante o jogo) | Botão no Modal de Game Over / Pausa |

---

## 🚀 Execução e Build

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Compilar para produção (Vite + TypeScript)
npm run build
```
