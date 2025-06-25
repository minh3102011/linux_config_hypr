#!/bin/bash
# Toggle Bluetooth connection

if command -v bluetoothctl &> /dev/null; then
    bt_status=$(bluetoothctl show | grep "Powered" | awk '{print $2}')
    
    if [ "$bt_status" = "yes" ]; then
        bluetoothctl power off
        eww update bluetooth-enabled=false
        notify-send "Bluetooth" "Disabled" -t 1500
    else
        bluetoothctl power on
        eww update bluetooth-enabled=true
        notify-send "Bluetooth" "Enabled" -t 1500
    fi
    
    # Update airplane mode status
    scripts/update_status.sh
else
    notify-send "Bluetooth" "bluetoothctl not found" -t 2000
fi