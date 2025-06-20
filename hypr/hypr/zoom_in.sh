#!/bin/bash
# Lấy thông tin cửa sổ active
ACTIVE_WINDOW=$(hyprctl activewindow -j | jq -r '.address')
WORKSPACE=$(hyprctl activewindow -j | jq -r '.workspace.id')
# Lấy danh sách cửa sổ trong workspace hiện tại
WINDOWS=$(hyprctl clients -j | jq -r ".[] | select(.workspace.id == $WORKSPACE) | .address")
# Kiểm tra xem cửa sổ active có phải là cao nhất
TOP_WINDOW=$(hyprctl clients -j | jq -r ".[] | select(.workspace.id == $WORKSPACE) | .address>
if [ "$ACTIVE_WINDOW" != "$TOP_WINDOW" ]; then
    # Nếu không phải cao nhất, nâng z-order bằng cách focus lại
    hyprctl dispatch focuswindow address:$ACTIVE_WINDOW
else
    # Nếu đã ở trên cùng, toggle fullscreen
    hyprctl dispatch fullscreen 0
fi
