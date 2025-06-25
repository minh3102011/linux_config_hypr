import { type MprisPlayer } from "types/service/mpris"
import icons from "lib/icons"
import options from "options"
import { icon } from "lib/utils"

const mpris = await Service.import("mpris")
const players = mpris.bind("players")
const { media } = options.quicksettings
const frames = [
  "/home/bien/.config/ags/assets/frame_0.png",
  "/home/bien/.config/ags/assets/frame_1.png",
  "/home/bien/.config/ags/assets/frame_2.png",
"/home/bien/.config/ags/assets/frame_3.png",
"/home/bien/.config/ags/assets/frame_4.png",
"/home/bien/.config/ags/assets/frame_5.png",
]
function lengthStr(length: number) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}

const Player = (player: MprisPlayer) => {
    const cover = Widget.Box({
    class_name: "cover",
    vpack: "start",
    css: media.coverSize.bind().as(size => `
        min-width: ${size}px;
        min-height: ${size}px;
    `),
    setup: self => {
        let currentFrame = 0

        const updateFrame = () => {
            const path = frames[currentFrame]
            currentFrame = (currentFrame + 1) % frames.length

            const size = media.coverSize.value
            self.css = `
                min-width: ${size}px;
                min-height: ${size}px;
                background-image: url('${path}');
                background-size: cover;
                background-position: center;
            `
        }

        updateFrame()
        self.poll(100, updateFrame)
    },
})

    const title = Widget.Label({
        class_name: "title",
        max_width_chars: 20,
        truncate: "end",
        hpack: "start",
        label: player.bind("track_title"),
    })

    const artist = Widget.Label({
        class_name: "artist",
        max_width_chars: 20,
        truncate: "end",
        hpack: "start",
        label: player.bind("track_artists").as(a => a.join(", ")),
    })

    const positionSlider = Widget.Slider({
        class_name: "position",
        draw_value: false,
        on_change: ({ value }) => player.position = value * player.length,
        setup: self => {
            const update = () => {
                const { length, position } = player
                self.visible = length > 0
                self.value = length > 0 ? position / length : 0
            }
            self.hook(player, update)
            self.hook(player, update, "position")
            self.poll(1000, update)
        },
    })

    const positionLabel = Widget.Label({
        class_name: "position",
        hpack: "start",
        setup: self => {
            const update = (_: unknown, time?: number) => {
                self.label = lengthStr(time || player.position)
                self.visible = player.length > 0
            }
            self.hook(player, update, "position")
            self.poll(1000, update)
        },
    })

    const lengthLabel = Widget.Label({
        class_name: "length",
        hpack: "end",
        visible: player.bind("length").as(l => l > 0),
        label: player.bind("length").as(lengthStr),
    })

    const playericon = Widget.Icon({
        class_name: "icon",
        hexpand: true,
        hpack: "end",
        vpack: "start",
        tooltip_text: player.identity || "",
        icon: Utils.merge([player.bind("entry"), media.monochromeIcon.bind()], (e, s) => {
            const name = `${e}${s ? "-symbolic" : ""}`
            return icon(name, icons.fallback.audio)
        }),
    })

    const playPause = Widget.Button({
        class_name: "play-pause",
        on_clicked: () => player.playPause(),
        visible: player.bind("can_play"),
        child: Widget.Icon({
            icon: player.bind("play_back_status").as(s => {
                switch (s) {
                    case "Playing": return icons.mpris.playing
                    case "Paused":
                    case "Stopped": return icons.mpris.stopped
                }
            }),
        }),
    })

    const prev = Widget.Button({
        on_clicked: () => player.previous(),
        visible: player.bind("can_go_prev"),
        child: Widget.Icon(icons.mpris.prev),
    })

    const next = Widget.Button({
        on_clicked: () => player.next(),
        visible: player.bind("can_go_next"),
        child: Widget.Icon(icons.mpris.next),
    })

    return Widget.Box(
        { class_name: "player", vexpand: false },
        cover,
        Widget.Box(
            { vertical: true },
            Widget.Box([
                title,
                playericon,
            ]),
            artist,
            Widget.Box({ vexpand: true }),
            positionSlider,
            Widget.CenterBox({
                class_name: "footer horizontal",
                start_widget: positionLabel,
                center_widget: Widget.Box([
                    prev,
                    playPause,
                    next,
                ]),
                end_widget: lengthLabel,
            }),
        ),
    )
}

export const Media = () => Widget.Box({
    vertical: true,
    class_name: "media vertical",
    children: players.as(p => p.map(Player)),
})
