#!/bin/bash

set -e

if [[ -z "$1" ]] || [[ "$1" != "export" ]] && [[ "$1" != "generate" ]]; then
    echo "Usage: $0 [export | generate]"
    exit 1
fi

if [[ "$1" == "export" ]]; then
    echo "Exporting modpack..."
    mv mods_mr mods
    packwiz refresh
    packwiz modrinth export
    mv mods mods_mr
fi
