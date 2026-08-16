#!/bin/bash
# 将源码构建产物部署到系统全局 npm 包目录（替换 npm 发布的 dist）
# 用法: sudo bash scripts/deploy-to-system.sh
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)"
CLI_DST="/usr/lib/node_modules/@getpaseo/cli"
PKG_DST="$CLI_DST/node_modules/@getpaseo"

deploy() {
    local name="$1"
    echo ">> deploying @getpaseo/$name ..."
    rsync -a --delete "$SRC/packages/$name/dist/" "$PKG_DST/$name/dist/"
}

echo ">> deploying @getpaseo/cli ..."
rsync -a --delete "$SRC/packages/cli/dist/" "$CLI_DST/dist/"

for name in server client protocol relay highlight; do
    deploy "$name"
done

echo ">> deploy complete"
