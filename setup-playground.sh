#!/bin/bash

set -euo pipefail

(
  cd "$(dirname "$0")"
  dzu-dev reset > /dev/null
  (
    mkdir local 2> /dev/null || true
    cd local
    rm -rf playground
    mkdir playground
    cd playground
    mkdir asset-1 asset-2 store-1 store-2
  )
  echo "precious data" > local/playground/asset-1/data1.txt
  echo "more precious data" > local/playground/asset-2/more-data.txt
  dzu-dev protect local/asset-1 > /dev/null
  dzu-dev protect local/asset-2 > /dev/null
  dzu-dev use local/store-1 > /dev/null
  dzu-dev use local/store-2 > /dev/null

  echo "🟢 Setup playground in ./local/playground"
  echo
  dzu-dev list
)