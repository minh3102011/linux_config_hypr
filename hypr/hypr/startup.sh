# ~/.config/hypr/startup.sh
ibus-daemon -drx
waybar & disown
~/.config/hypr/scripts/wallpaper-loop.sh &
eww daemon && sleep 2 && eww open activate-linux

