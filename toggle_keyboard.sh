#!/bin/bash

# Đường dẫn đến file cấu hình Hyprland
CONF_FILE="$HOME/.config/hypr/hyprland.conf"

# Tên bàn phím cần điều khiển
KEYBOARD_NAME="at-translated-set-2-keyboard"

# --- LOGIC SCRIPT ---

# Kiểm tra xem bàn phím hiện đang được bật hay tắt trong file config
# Bằng cách tìm khối device của bàn phím và xem dòng "enabled" đang là "true" hay không.
# grep -A 2: tìm dòng chứa tên keyboard và 2 dòng kế tiếp.
# grep -q "enabled = true": kiểm tra trong kết quả đó có dòng "enabled = true" không.
if grep -A 2 "name = ${KEYBOARD_NAME}" "${CONF_FILE}" | grep -q "enabled = true"; then
    # Nếu đang là "true", đổi thành "false"
    echo "Bàn phím đang BẬT. Đang TẮT..."
    # Lệnh sed: tìm khối cấu hình của bàn phím và thay "enabled = true" thành "enabled = false"
    sed -i "/name = ${KEYBOARD_NAME}/,/}/ s/enabled = true/enabled = false/" "${CONF_FILE}"
    notify-send "Bàn phím Laptop" "ĐÃ TẮT" -i keyboard-disabled
else
    # Nếu đang là "false" (hoặc không phải "true"), đổi thành "true"
    echo "Bàn phím đang TẮT. Đang BẬT..."
    # Lệnh sed: tìm khối cấu hình của bàn phím và thay "enabled = false" thành "enabled = true"
    sed -i "/name = ${KEYBOARD_NAME}/,/}/ s/enabled = false/enabled = true/" "${CONF_FILE}"
    notify-send "Bàn phím Laptop" "ĐÃ MỞ" -i input-keyboard
fi

# BƯỚC QUAN TRỌNG NHẤT: Tải lại cấu hình Hyprland để áp dụng thay đổi
hyprctl reload

echo "Đã áp dụng thay đổi."