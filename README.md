# bispo-studio

Kit de design para o Claude Code: skills de UI/animação e o MCP do Playwright.
Abra qualquer sessão do Claude Code (local ou em claude.ai/code) com este
repositório e tudo carrega sozinho.

## Skills (`.claude/skills/`)

| Origem | Skills |
|---|---|
| [emilkowalski/skills](https://github.com/emilkowalski/skills) @ `f1090be` | animate, animate-expo, animation-performance, animation-vocabulary, apple-design, ask-sonner, break-ui, emil-design-eng, find-animation-opportunities, improve-animations, mobile-native, pick-ui-library, prototype, remove-animations, review-animations, write-swift |
| [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) @ `12af471` | taste-skill |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) @ `9fadc41` | impeccable |

Licenças originais em [`licenses/`](licenses/) (MIT e Apache-2.0).

## MCPs

- **Playwright** — definido em [`.mcp.json`](.mcp.json). Na nuvem usa o
  Chromium pré-instalado em `/opt/pw-browsers`; localmente usa o navegador
  padrão do Playwright.
- **Figma** — conecte em <https://claude.ai/customize/connectors> (vale para
  todas as sessões). Para usar só localmente:
  `claude mcp add --transport http figma https://mcp.figma.com/mcp` e depois
  `/mcp` para fazer login.

## Atualizar as skills

```bash
./scripts/update-skills.sh
```
