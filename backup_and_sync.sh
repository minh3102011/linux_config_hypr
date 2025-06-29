#!/bin/bash

# ==============================================================================
# SCRIPT ĐỒNG BỘ HÓA VÀ BACKUP CẤU HÌNH LÊN GITHUB
#
# Script này sẽ:
# 1. Sao chép các thư mục cấu hình từ ~/.config vào thư mục Git này.
# 2. Commit và đẩy các thay đổi lên GitHub.
#
# --- HƯỚNG DẪN ---
# 1. SỬA PHẦN "CẤU HÌNH" BÊN DƯỚI:
#    - Đảm bảo REPO_PATH trỏ đúng đến thư mục Git của bạn.
#    - Thêm hoặc xóa các thư mục bạn muốn backup trong FOLDERS_TO_BACKUP.
# 2. Cấp quyền chạy: chmod +x backup_and_sync.sh
# 3. Chạy script với token của bạn:
#    ./backup_and_sync.sh <ghp_TOKEN_CUA_BAN>
# ==============================================================================

# --- PHẦN CẤU HÌNH (SỬA Ở ĐÂY) ---

# Đường dẫn tuyệt đối đến thư mục Git của bạn
REPO_PATH="$HOME/linux_config_hypr" # <-- SỬA NẾU CẦN

# Đường dẫn đến thư mục chứa các cấu hình gốc
CONFIG_SOURCE_DIR="$HOME/.config"

# Danh sách các thư mục trong ~/.config bạn muốn backup
# (Các thư mục cách nhau bởi dấu cách)
FOLDERS_TO_BACKUP=(
    "hypr"
    "kitty"
    "waybar"
    "cursor"
    "eww"
    "fastfetch"
    "ags"
    "nvim"
    "ranger"
    "wallust"
    "wlogout"

    # Thêm các thư mục khác vào đây, ví dụ: "nvim", "cava" ...
)

# Thông tin GitHub
GITHUB_USERNAME="minh3102011"
REPO_NAME="linux_config_hypr"
COMMIT_MESSAGE="Sync: Update config on $(date +'%Y-%m-%d %H:%M:%S')"

# --- KẾT THÚC PHẦN CẤU HÌNH ---


# --- LOGIC SCRIPT (KHÔNG CẦN SỬA) ---

# 1. Kiểm tra đầu vào
if [ -z "$1" ]; then
    echo "LỖI: Bạn phải cung cấp Khóa Truy Cập Cá Nhân (PAT) làm đối số."
    echo "Cách dùng: $0 <ghp_TOKEN_CUA_BAN>"
    exit 1
fi
GITHUB_TOKEN=$1

if [ ! -d "$REPO_PATH" ]; then
    echo "LỖI: Không tìm thấy thư mục Git tại: $REPO_PATH"
    echo "Vui lòng kiểm tra lại biến REPO_PATH trong script."
    exit 1
fi

echo "Bắt đầu quá trình đồng bộ hóa và backup..."
echo "----------------------------------------"

# 2. Đồng bộ hóa các thư mục cấu hình
for folder in "${FOLDERS_TO_BACKUP[@]}"; do
    SOURCE="$CONFIG_SOURCE_DIR/$folder"
    DEST="$REPO_PATH"
    if [ -d "$SOURCE" ]; then
        echo "=> Đang đồng bộ hóa '$folder'..."
        # Sử dụng rsync để sao chép hiệu quả và xóa các file không còn tồn tại
        rsync -av --delete "$SOURCE" "$DEST"
    else
        echo "=> CẢNH BÁO: Không tìm thấy thư mục nguồn '$SOURCE'. Bỏ qua."
    fi
done

echo "----------------------------------------"
echo "Đồng bộ hóa hoàn tất. Bắt đầu quá trình Git..."

# 3. Di chuyển vào thư mục Git để thực hiện các lệnh
cd "$REPO_PATH" || exit

# 4. Thêm, commit và push
git add .

if git diff-index --quiet HEAD --; then
    echo "=> Không có gì thay đổi. Không cần backup."
    exit 0
fi

echo "=> Đang commit các thay đổi..."
git commit -m "$COMMIT_MESSAGE"

echo "=> Đang đẩy (push) lên GitHub..."
REMOTE_URL="https://_:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
git push "${REMOTE_URL}"

echo "----------------------------------------"
echo "✅ Backup và đồng bộ hóa thành công!"
echo "----------------------------------------"
