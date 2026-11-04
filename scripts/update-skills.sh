#!/usr/bin/env bash
# Baixa a versão mais recente de cada repositório de skills e substitui .claude/skills/.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
git clone -q --depth 1 https://github.com/emilkowalski/skills "$TMP/emil"
git clone -q --depth 1 https://github.com/leonxlnx/taste-skill "$TMP/taste"
git clone -q --depth 1 https://github.com/pbakaus/impeccable "$TMP/impeccable"
for s in "$TMP"/emil/skills/*; do rm -rf "$ROOT/.claude/skills/$(basename "$s")"; cp -r "$s" "$ROOT/.claude/skills/"; done
rm -rf "$ROOT/.claude/skills/taste-skill" "$ROOT/.claude/skills/impeccable"
cp -r "$TMP/taste/skills/taste-skill" "$ROOT/.claude/skills/"
cp -r "$TMP/impeccable/.claude/skills/impeccable" "$ROOT/.claude/skills/"
for d in emil taste impeccable; do echo "$d: $(git -C "$TMP/$d" rev-parse --short HEAD)"; done
echo "Pronto. Revise com 'git diff --stat' e faça o commit."
