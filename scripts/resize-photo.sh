#!/bin/sh

if [ -z "$1" ]; then
  echo "Usage: $0 <filename>"
  exit 1
fi

convert "$1" -resize 1538x "$1"