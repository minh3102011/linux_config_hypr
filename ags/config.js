import GLib from "gi://GLib"

const main = "/tmp/asztal/main.js"
const entry = `${App.configDir}/main.ts`
const bundler = GLib.getenv("AGS_BUNDLER") || "bun"

const v = {
    ags: pkg.version?.split(".").map(Number) || [],
    expect: [1, 8, 1],
}

try {
    switch (bundler) {
        case "bun": await Utils.execAsync([
            "bun", "build", entry,
            "--outfile", main,
            "--external", "resource://*",
            "--external", "gi://*",
            "--external", "file://*",
        ]); break

        case "esbuild": await Utils.execAsync([
            "esbuild", "--bundle", entry,
            "--format=esm",
            `--outfile=${main}`,
            "--external:resource://*",
            "--external:gi://*",
            "--external:file://*",
        ]); break

        default:
            throw `"${bundler}" is not a valid bundler`
    }

   if (v.ags[0] < v.expect[0] || (v.ags[0] === v.expect[0] && v.ags[1] < v.expect[1])) {
    print(`my config needs at least v${v.expect.join(".")}, yours is v${v.ags.join(".")}`)
    App.quit()
}
    await import(`file://${main}`)
} catch (error) {
    console.error(error)
    App.quit()
}

export { }
