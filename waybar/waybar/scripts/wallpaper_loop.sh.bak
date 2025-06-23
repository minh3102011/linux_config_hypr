#!/bin/bash

WALL_DIR="/home/bien/background"
MONITOR="eDP-1"
DELAY=60

# Danh sách file ảnh, GIF, và video
mapfile -t IMAGES < <(find "$WALL_DIR" -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \) | sort)

if [ ${#IMAGES[@]} -eq 0 ]; then
    echo "Không tìm thấy hình nền trong $WALL_DIR"
    exit 1
fi

# Chạy swww-daemon nếu chưa chạy
pgrep -x swww-daemon > /dev/null || swww-daemon &

# Đợi swww-daemon sẵn sàng
sleep 1

# Lặp vô hạn để thay hình nền
i=0
while true; do
    IMG="${IMAGES[$i]}"
    
    if [[ -f "$IMG" ]]; then
        swww img "$IMG" --outputs "$MONITOR" --transition-type fade --transition-fps 60 --transition-duration 2
    fi

    ((i=(i+1)%${#IMAGES[@]}))
    sleep $DELAY
done
