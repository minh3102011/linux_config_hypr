# ~/.config/hypr/startup.sh
#for i in {1..10}; do
#  if [ -n "$WAYLAND_DISPLAY" ]; then
#    break
#  fi
#  sleep 1
#done
fcitx5 & disown
ags & disown > ~/log.txt
#~/.config/hypr/scripts/wallpaper-loop.sh &
#sleep 10
#waybar & disown
eww daemon && sleep 2 && eww open activate-linux

