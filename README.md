hyprpm add https://github.com/KZDKM/Hyprspace                                                                                                                                                                                           
hyprpm enable Hyprspace

eww, hyprspace, hyprpaper, waybar, ags, hyprpicker
ranger

eww daemon && eww open activate-linux

 kitten @ resize-window --match title:Output --axis vertical --increment 3

kitten @ launch --title Output --keep-focus zsh

fcitx5 & disown

sudo rsync -aAXv #restore

need dart-sass to run this config ags

flatpak override md.obsidian.Obsidian --socket=wayland

git clone https://github.com/InioX/matugen.git

cd matugen

cargo install --path .
