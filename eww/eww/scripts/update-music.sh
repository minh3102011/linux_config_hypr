#!/bin/bash
# Update various system status variables

# Update WiFi status
wifi_status=$(nmcli radio wifi 2>/dev/null || echo "unknown")
eww update wifi-enabled="$([ "$wifi_status" = "enabled" ] && echo true || echo false)"

# Update Bluetooth status  
bt_status=$(bluetoothctl show | grep "Powered" | awk '{print $2}' 2>/dev/null || echo "no")
eww update bluetooth-enabled="$([ "$bt_status" = "yes" ] && echo true || echo false)"

# Check airplane mode (both WiFi and Bluetooth off)
if [ "$wifi_status" = "disabled" ] && [ "$bt_status" = "no" ]; then
    eww update airplane-mode=true
else
    eww update airplane-mode=false
fi

# Update music playing status
music_status=$(playerctl status 2>/dev/null || echo "Stopped")
eww update music-playing="$([ "$music_status" = "Playing" ] && echo true || echo false)"

# Update recording status (check if recording software is running)
if pgrep -f "obs\|ffmpeg\|recordmydesktop\|kazam" > /dev/null; then
    eww update recording=true
else
    eww update recording=false
fi