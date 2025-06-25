#!/bin/bash
# Toggle airplane mode (disable WiFi and Bluetooth)

# Check current state by looking at WiFi
if command -v nmcli &> /dev/null; then
    current_airplane=$(eww get airplane-mode 2>/dev/null || echo "false")
    
    if [ "$current_airplane" = "false" ]; then
        # Enable airplane mode
        nmcli radio wifi off
        command -v bluetoothctl &> /dev/null && bluetoothctl power off
        eww update airplane-mode=true
        eww update wifi-enabled=false
        eww update bluetooth-enabled=false
        notify-send "Airplane Mode" "Enabled - All wireless disabled" -t 1500
    else
        # Disable airplane mode
        nmcli radio wifi on
        command -v bluetoothctl &> /dev/null && bluetoothctl power on
        eww update airplane-mode=false
        eww update wifi-enabled=true
        eww update bluetooth-enabled=true
        notify-send "Airplane Mode" "Disabled - Wireless restored" -t 1500
    fi
else
    notify-send "Airplane Mode" "Network manager not found" -t 2000
fi