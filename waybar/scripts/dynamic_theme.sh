#!/bin/bash

# === Config ===
WALL_DIR="$HOME/background/"   # Thư mục ảnh
WAYBAR_CSS="$HOME/.config/waybar/colors.css"
DELAY=1                           # Delay chờ pywal generate

# === Chọn ảnh ngẫu nhiên ===
WALL=$(find "$WALL_DIR" -type f \( -iname '*.jpg' -o -iname '*.png' -o -iname '*.jpeg' \) | shuf -n 1)

# === Đặt hình nền với hiệu ứng ===
swww img "$WALL" --transition-type grow --transition-fps 60 --transition-duration 1

# === Tạo theme bằng pywal ===
wal -i "$WALL" --saturate 0.7 > /dev/null

# === Đợi một chút để wal sinh xong màu ===
sleep "$DELAY"

# === Đọc màu từ pywal output ===
COLORS="$HOME/.cache/wal/colors.json"

# === Trích xuất màu từ JSON (sử dụng jq) ===
BG=$(jq -r '.colors.background' "$COLORS")
FG=$(jq -r '.colors.foreground' "$COLORS")
ACCENT=$(jq -r '.colors.color1' "$COLORS")

# === Cập nhật colors.css cho Waybar ===
cat > "$WAYBAR_CSS" << EOF
* {
  background: $BG;
  color: $FG;
}

#workspaces button.focused {
  background: $ACCENT;
  color: $BG;
}
EOF

# === Reload Waybar để áp dụng theme ===
pkill waybar
waybar & disown

notify-send "🎨 Waybar Theme Applied" "Image: $(basename "$WALL")"
