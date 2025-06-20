#!/bin/bash
ACTIVE_WINDOW=$(hyprctl activewindow -j | jq -r '.address')
# Tắt pin cho tất cả cửa sổ trong nhóm hiện tại
GROUP_ID=$(hyprctl activewindow -j | jq -r '.group')
if [ ! -z "$GROUP_ID" ]; then
    hyprctl clients -j | jq -r ".[] | select(.group == \"$GROUP_ID\") | .address" | xargs -I {} hyprctl dispatch pin off {}
fi
# Pin cửa sổ active
hyprctl dispatch pin $ACTIVE_WINDOW
