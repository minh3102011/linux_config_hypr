#!/bin/bash
# Lấy thông tin cửa sổ active
ACTIVE_WINDOW=$(hyprctl activewindow -j | jq -r '.address')
IS_FULLSCREEN=$(hyprctl activewindow -j | jq -r '.fullscreen')
WORKSPACE=$(hyprctl activewindow -j | jq -r '.workspace.id')
# Kiểm tra trạng thái fullscreen
if [ "$IS_FULLSCREEN" = "true" ]; then
    # Thoát fullscreen
    hyprctl dispatch fullscreen 0
else
    # Lấy danh sách cửa sổ trong workspace, sắp xếp theo z-order
    WINDOWS=$(hyprctl clients -j | jq -r ".[] | select(.workspace.id == $WORKSPACE) | .address")
    # Tìm cửa sổ ở dưới active window
    FOUND_ACTIVE=false
    PREV_WINDOW=""
    for WIN in $WINDOWS; do
        if [ "$FOUND_ACTIVE" = "true" ]; then
            NEXT_WINDOW=$WIN
            break
        fi
        if [ "$WIN" = "$ACTIVE_WINDOW" ]; then
            FOUND_ACTIVE=true
        else
            PREV_WINDOW=$WIN
        fi
    done
    # Nếu có cửa sổ ở dưới, focus vào nó
    if [ ! -z "$PREV_WINDOW" ]; then
        hyprctl dispatch focuswindow address:$PREV_WINDOW
    else
        # Nếu không có cửa sổ ở dưới, di chuyển đến special workspace
        hyprctl dispatch movetoworkspace special
    fi
fi
