# ~/.config/hypr/startup.sh
fcitx5 & disown
waybar & disown
~/.config/hypr/scripts/wallpaper-loop.sh &
eww daemon && sleep 2 && eww open activate-linux

