#!/bin/zsh
zsh ./shell-scripts/build/build-cleanup.sh
zsh ./shell-scripts/build/build-setup.sh
zsh ./shell-scripts/pages/pages-prod.sh
zsh ./shell-scripts/styles/styles-prod.sh
zsh ./shell-scripts/scripts/scripts-prod.sh
zsh ./shell-scripts/assets/assets.sh
