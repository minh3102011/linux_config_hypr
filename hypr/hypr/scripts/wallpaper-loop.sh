#!/bin/bash

WALL_DIR="/home/bien/background"
MONITOR="eDP-1"
DELAY=60

# Danh sách ảnh
mapfile -t IMAGES < <(find "$WALL_DIR" -type f \( -iname "*.jpg" -o -iname "*.png" \) | sort)

if [ ${#IMAGES[@]} -eq 0 ]; then
    echo "Không tìm thấy hình nền trong $WALL_DIR"
    exit 1
fi

# Chạy hyprpaper nếu chưa chạy
pgrep -x hyprpaper > /dev/null || hyprpaper &

# Đợi hyprpaper socket sẵn sàng
sleep 1

# Lặp vô hạn để thay hình nền
i=0
while true; do
    IMG="${IMAGES[$i]}"
    
    if [[ -f "$IMG" ]]; then
        hyprctl hyprpaper unload all
        hyprctl hyprpaper preload "$IMG"
        hyprctl hyprpaper wallpaper "$MONITOR,$IMG"
    fi

    ((i=(i+1)%${#IMAGES[@]}))
    sleep $DELAY
done

