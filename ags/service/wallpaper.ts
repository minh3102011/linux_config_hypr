import { dependencies, sh } from "lib/utils" // Chỉ import dependencies và sh

export type Resolution = 1920 | 1366 | 3840
export type Market =
    | "random"
    | "en-US"
    | "ja-JP"
    | "en-AU"
    | "en-GB"
    | "de-DE"
    | "en-NZ"
    | "en-CA"

const WP_DIR = `${Utils.HOME}/.config/background` // Thư mục chứa wallpaper
const WP_FILE = `${WP_DIR}/current-wallpaper.jpg` // File đích duy nhất
const Cache = `${Utils.HOME}/Pictures/Wallpapers/Bing`

class Wallpaper extends Service {
    static {
        Service.register(this, {}, {
            "wallpaper": ["string"],
        })
    }

    #blockMonitor = false

    #wallpaper() {
        if (!dependencies("swww"))
            return

        sh("hyprctl cursorpos").then(pos => {
            sh([
                "swww", "img",
                "--invert-y",
                "--transition-type", "grow",
                "--transition-pos", pos.replace(" ", ""),
                WP_FILE,
            ]).then(() => {
                this.changed("wallpaper")
            }).catch(err => {
                console.error("swww error:", err);
            })
        }).catch(err => {
            console.error("hyprctl error:", err);
            sh([
                "swww", "img",
                "--invert-y",
                "--transition-type", "grow",
                "--transition-pos", "960,540",
                WP_FILE,
            ]).catch(() => null);
        })
    }

    async #setWallpaper(path: string) {
        this.#blockMonitor = true

        // Kiểm tra file nguồn tồn tại
        try {
            const stat = await Utils.execAsync(`stat "${path}"`);
            if (!stat) {
                console.error("Source file does not exist:", path);
                this.#blockMonitor = false;
                return;
            }
        } catch (error) {
            console.error("Error checking source file:", error);
            this.#blockMonitor = false;
            return;
        }

        // Đảm bảo thư mục WP_DIR tồn tại và có quyền ghi
        await sh(`mkdir -p "${WP_DIR}"`).catch(() => null);
        await sh(`chmod -R u+rw "${WP_DIR}"`).catch(() => null);

        // Thử xóa file cũ để tránh xung đột
        await sh(`rm -f "${WP_FILE}"`).catch(err => console.warn("Failed to remove old file:", err));

        try {
            // Sao chép file với shell đúng
            const cpCommand = `cp "${path}" "${WP_FILE}"`;
            const cpResult = await Utils.execAsync(cpCommand); // Sử dụng execAsync để chạy shell đúng
            console.log("Copy command output:", cpResult);
            if (!(await Utils.execAsync(`test -f "${WP_FILE}"`))) {
                console.error("Failed to copy file to", WP_FILE, "after cp command. Check permissions or locks.");
                this.#blockMonitor = false;
                return;
            }
            this.#wallpaper();
        } catch (error) {
            console.error("Error copying wallpaper to", WP_FILE, ":", error);
        }

        this.#blockMonitor = false
    }

    async #getRandomImageFromCache() {
        try {
            const output = await sh(`ls "${Cache}"`);
            const files = output.split("\n").filter(file => file.trim()); // Lọc file rỗng
            if (files.length === 0) {
                console.warn("No images found in", Cache);
                return;
            }
            const randomFile = files[Math.floor(Math.random() * files.length)];
            const fullPath = `${Cache}/${randomFile}`;
            await this.#setWallpaper(fullPath);
        } catch (error) {
            console.error("Error getting random image:", error);
        }
    }

    constructor() {
        super()

        if (!dependencies("swww"))
            return this

        // Đảm bảo thư mục WP_DIR tồn tại và có quyền
        Utils.execAsync(`mkdir -p "${WP_DIR}"`).catch(() => null);
        Utils.execAsync(`chmod -R u+rw "${WP_DIR}"`).catch(() => null);

        // gtk portal
        Utils.monitorFile(WP_FILE, () => {
            if (!this.#blockMonitor)
                this.#wallpaper()
        })

        Utils.execAsync("swww-daemon")
            .then(this.#wallpaper)
            .catch(() => null)

        // Đổi ảnh mỗi 1 phút (60 giây)
        setInterval(() => {
            this.#getRandomImageFromCache();
        }, 60000);
    }

    readonly random = async () => { await this.#getRandomImageFromCache() } // Đảm bảo bất đồng bộ
    readonly set = (path: string) => { this.#setWallpaper(path) }
    get wallpaper() { return WP_FILE }
}

export default new Wallpaper