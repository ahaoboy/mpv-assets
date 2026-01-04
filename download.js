const fs = require("fs");

const headers = {
  headers: {
    'User-Agent': 'GitHub Actions',
    Connection: 'close',
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
}

async function download(url, filePath) {
  const buf = await fetch(url).then((r) => r.arrayBuffer(), headers);
  fs.writeFileSync(filePath, new Uint8Array(buf));
}

async function downloadMpv() {
  // https://github.com/shinchiro/mpv-winbuild-cmake/releases
  const { assets } = await fetch(
    "https://api.github.com/repos/shinchiro/mpv-winbuild-cmake/releases/latest", headers
  ).then((r) => r.json());

  const mpvV3Url = assets.find((i) =>
    i.name.startsWith("mpv-x86_64-v3-")
  ).browser_download_url;
  await download(mpvV3Url, "./dist/mpv-v3-win.7z");

  const mpvUrl = assets.find((i) =>
    i.name.startsWith("mpv-x86_64-2")
  ).browser_download_url;
  await download(mpvUrl, "./dist/mpv-win.7z");
}

async function downloadYtdl() {
  // https://github.com/yt-dlp/yt-dlp/releases
  const { assets } = await fetch(
    "https://api.github.com/repos/yt-dlp/yt-dlp/releases/latest", headers
  ).then((r) => r.json());
  const ytUrl = assets.find((i) =>
    i.name.startsWith("yt-dlp.exe")
  ).browser_download_url;
  await download(ytUrl, "./dist/yt-dlp.exe");
}


async function downloadFfmpeg() {
  // https://github.com/BtbN/FFmpeg-Builds/releases
  const { assets } = await fetch(
    "https://api.github.com/repos/BtbN/FFmpeg-Builds/releases/latest", headers
  ).then((r) => r.json());
  const ffmpegUrl = assets.find((i) =>
    i.name.startsWith("ffmpeg-master-latest-win64-lgpl.zip")
  ).browser_download_url;
  await download(ffmpegUrl, "./dist/ffmpeg.zip");
}

downloadMpv();
downloadYtdl();
downloadFfmpeg();
