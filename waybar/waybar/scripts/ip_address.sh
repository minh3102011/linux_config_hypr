#!/bin/bash

VPN_INTERFACE="CloudflareWARP"
LOCAL_INTERFACE="wlan0" # Giao diện WiFi

if ip link show $VPN_INTERFACE > /dev/null 2>&1; then
    VPN_IP=$(ip addr show $VPN_INTERFACE | grep 'inet ' | awk '{print $2}' | cut -d'/' -f1)
    echo "WARP: $VPN_IP"
else
    LOCAL_IP=$(ip addr show $LOCAL_INTERFACE | grep 'inet ' | awk '{print $2}' | cut -d'/' -f1)
    echo "IP: $LOCAL_IP"
fi
