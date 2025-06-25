import { type MprisPlayer } from "types/service/mpris"
import icons from "lib/icons"
import options from "options"
import { icon } from "lib/utils"

const mpris = await Service.import("mpris")
const players = mpris.bind("players")
const { media } = options.quicksettings
// const frames = [
//   "/home/bien/.config/ags/assets/frame_0.png",
//   "/home/bien/.config/ags/assets/frame_1.png",
//   "/home/bien/.config/ags/assets/frame_2.png",
// "/home/bien/.config/ags/assets/frame_3.png",
// "/home/bien/.config/ags/assets/frame_4.png",
// "/home/bien/.config/ags/assets/frame_5.png",
// ]

// const frames = [
//   "/home/bien/.config/ags/assets/ezgif-split/frame_0_delay-0.12s.gif",
//   "/home/bien/.config/ags/assets/ezgif-split/frame_1_delay-0.12s.gif",
//   "/home/bien/.config/ags/assets/ezgif-split/frame_2_delay-0.12s.gif",
//   "/home/bien/.config/ags/assets/ezgif-split/frame_3_delay-0.12s.gif",
//   "/home/bien/.config/ags/assets/ezgif-split/frame_4_delay-0.12s.gif",
//   "/home/bien/.config/ags/assets/ezgif-split/frame_5_delay-0.12s.gif",
// ]
const frames = [
  "/home/bien/.config/ags/assets/ezgif-split1/frame_0_delay-0.06s.gif",
  "/home/bien/.config/ags/assets/ezgif-split1/frame_1_delay-0.06s.gif",
  "/home/bien/.config/ags/assets/ezgif-split1/frame_2_delay-0.06s.gif",
  "/home/bien/.config/ags/assets/ezgif-split1/frame_3_delay-0.06s.gif",
  "/home/bien/.config/ags/assets/ezgif-split1/frame_4_delay-0.06s.gif",
  "/home/bien/.config/ags/assets/ezgif-split1/frame_5_delay-0.06s.gif",
]
// const frames = [
//   "/home/bien/.config/ags/assets/ezgif-split2/frame_0_delay-0.15s.gif",
//   "/home/bien/.config/ags/assets/ezgif-split2/frame_1_delay-0.15s.gif",
//   "/home/bien/.config/ags/assets/ezgif-split2/frame_2_delay-0.15s.gif",
//   "/home/bien/.config/ags/assets/ezgif-split2/frame_3_delay-0.15s.gif",
//   "/home/bien/.config/ags/assets/ezgif-split2/frame_4_delay-0.15s.gif",
// ]
// const frames = [
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_000_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_001_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_002_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_003_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_004_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_005_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_006_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_007_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_008_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_009_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_010_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_011_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_012_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_013_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_014_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_015_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_016_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_017_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_018_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_019_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_020_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_021_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_022_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_023_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_024_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_025_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_026_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_027_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_028_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_029_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_030_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_031_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_032_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_033_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_034_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_035_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_036_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_037_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_038_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_039_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_040_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_041_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_042_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_043_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_044_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_045_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_046_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_047_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_048_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_049_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_050_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_051_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_052_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_053_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_054_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_055_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_056_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_057_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_058_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_059_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_060_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_061_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_062_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_063_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_064_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_065_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_066_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_067_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_068_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_069_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_070_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_071_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_072_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_073_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_074_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_075_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_076_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_077_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_078_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_079_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_080_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_081_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_082_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_083_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_084_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_085_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_086_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_087_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_088_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_089_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_090_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_091_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_092_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_093_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_094_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_095_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_096_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_097_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_098_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_099_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_100_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_101_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_102_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_103_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_104_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_105_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_106_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_107_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_108_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_109_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_110_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_111_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_112_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_113_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_114_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_115_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_116_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_117_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_118_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_119_delay-0.03s.gif",
//     "/home/bien/.config/ags/assets/ezgif-split3/frame_120_delay-0.03s.gif",
// ]



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