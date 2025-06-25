#!/bin/bash
# Toggle WiFi connection

if command -v nmcli &> /dev/null; then
    wifi_status=$(nmcli radio wifi)
    
    if [ "$wifi_status" = "enabled" ]; then
        nmcli radio wifi off
        eww update wifi-enabled=false
        notify-send "WiFi" "Disabled" -t 1500
    else
        nmcli radio wifi on
        eww update wifi-enabled=true
        notify-send "WiFi" "Enabled" -t 1500
    fi
    
    # Update airplane mode status
    scripts/update_status.sh
elif command -v iwctl &> /dev/null; then
    # For iwd
    device=$(iwctl device list | grep station | awk '{print $1}' | head -n1)
    if [ -n "$device" ]; then
        iwctl station "$device" disconnect 2>/dev/null && \
        notify-send "WiFi" "Disconnected" -t 1500 || \
        notify-send "WiFi" "Connecting..." -t 1500
    fi
else
    notify-send "WiFi" "No network manager found" -t 2000
fi