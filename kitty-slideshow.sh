#!/bin/bash

# === CONFIG ===
IMAGE_DIR="$HOME/background"
INTERVAL=30  # thời gian mỗi ảnh (giây)

# === Đảm bảo kitty có hỗ trợ remote control ===
if ! kitty @ ls &>/dev/null; then
  echo "❌ Kitty remote control chưa bật hoặc kitty chưa chạy."
  echo "👉 Hãy đảm bảo bạn đã thêm 'allow_remote_control yes' vào ~/.config/kitty/kitty.conf"
  exit 1
fi

# === Tìm tất cả ảnh hợp lệ (cả subfolder), lưu vào mảng ===
mapfile -t IMAGES < <(find "$IMAGE_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.gif' \) | sort)

if [ ${#IMAGES[@]} -eq 0 ]; then
  echo "❌ Không tìm thấy ảnh trong $IMAGE_DIR"
  exit 1
fi

# === Vòng lặp slideshow ===
while true; do
  for img in "${IMAGES[@]}"; do
    clear
    kitty +kitten icat --clear
    kitty +kitten icat "$img"
    sleep "$INTERVAL"
  done
done
