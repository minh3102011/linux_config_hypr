# ~/.config/hypr/startup.sh
ibus-daemon -drx --panel enable
waybar &
~/.config/hypr/scripts/wallpaper-loop.sh &
eww daemon &&  eww open activate-linux

