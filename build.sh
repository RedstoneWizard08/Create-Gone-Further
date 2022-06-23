#!/bin/bash

if [[ "$1" == "mr" ]] || [[ "$1" == "modrinth" ]]; then
    echo "Building for Modrinth..."
    packwiz modrinth export --restrictDomains=false --output=pack.mrpack
    node fix.js
    rm -rf tmp
elif [[ "$1" == "cf" ]] || [[ "$1" == "curseforge" ]]; then
    echo "Building for CurseForge..."
    packwiz curseforge export --output=pack.zip
else
    echo "Usage: $0 [mr | modrinth | cf | curseforge]"
fi
