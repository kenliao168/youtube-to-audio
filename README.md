# 🎵 YouTube to Audio Converter

一個簡單易用的本地工具，可以將 YouTube 影片轉換成音訊檔（MP3、M4A、WAV 等格式）。

## ✨ 功能特點

- 🎯 **超簡單使用** - 雙擊執行，貼上連結即可
- 🎼 **多種格式** - 支援 MP3、M4A、WAV、OPUS
- 🎚️ **最佳音質** - 自動提取最高音質
- 📊 **進度顯示** - 即時顯示下載進度
- 🔄 **批次下載** - 可連續下載多個影片
- 💻 **命令行模式** - 也支援進階命令行操作

## 🚀 快速開始

### 前置需求

1. **Node.js** (v18 或更高版本)
2. **yt-dlp** - YouTube 下載工具

### 安裝步驟

```bash
# 1. Clone 此儲存庫
git clone https://github.com/你的帳號/youtube-to-audio.git
cd youtube-to-audio

# 2. 安裝依賴
npm install

# 3. 下載 yt-dlp.exe
# Windows: 從 https://github.com/yt-dlp/yt-dlp/releases/latest 下載 yt-dlp.exe
# 並放置在專案根目錄
```

或使用 PowerShell 自動下載：
```powershell
Invoke-WebRequest -Uri "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe" -OutFile "yt-dlp.exe"
```

## 📖 使用方法

### 方法一：互動式介面（推薦）

**Windows:**
```bash
# 雙擊執行
下載YouTube音訊.bat

# 或在 PowerShell 中執行
npm run interactive
```

執行後會看到友善的介面：

```
╔═══════════════════════════════════════════════╗
║     🎵 YouTube 音訊下載器 🎵                  ║
╚═══════════════════════════════════════════════╝

請貼上 YouTube 連結 (或輸入 q 離開): 
```

只需：
1. 貼上 YouTube 連結
2. 選擇格式（預設 MP3）
3. 選擇輸出目錄（預設 downloads）
4. 等待下載完成

### 方法二：命令行模式

```bash
# 基本用法（下載為 MP3）
npm run dev "https://www.youtube.com/watch?v=VIDEO_ID"

# 指定輸出目錄
npm run dev "YouTube連結" -o "./music"

# 指定音訊格式
npm run dev "YouTube連結" -f m4a

# 組合使用
npm run dev "YouTube連結" -o "./music" -f m4a
```

### 命令行選項

| 選項 | 簡寫 | 說明 | 預設值 |
|------|------|------|--------|
| `--output` | `-o` | 輸出目錄 | `./downloads` |
| `--format` | `-f` | 音訊格式（mp3, m4a, wav, opus） | `mp3` |
| `--help` | `-h` | 顯示幫助訊息 | - |
| `--version` | `-V` | 顯示版本號 | - |

## 📂 專案結構

```
youtube-to-audio/
├── src/
│   ├── index.ts          # 命令行模式主程式
│   └── interactive.ts    # 互動式介面
├── downloads/            # 預設下載目錄
├── yt-dlp.exe           # YouTube 下載工具（需自行下載）
├── 下載YouTube音訊.bat   # Windows 快速啟動檔
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ 開發

```bash
# 安裝依賴
npm install

# 開發模式 - 命令行
npm run dev "YouTube連結"

# 開發模式 - 互動式
npm run interactive

# 編譯 TypeScript
npm run build

# 執行編譯後的程式
npm start "YouTube連結"
```

## ❓ 常見問題

### 找不到 yt-dlp

請確保 `yt-dlp.exe` 在專案根目錄，或從以下連結下載：
https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe

### 下載失敗

1. 確認 YouTube 連結正確
2. 檢查網路連線
3. 某些影片可能有地區或年齡限制
4. 嘗試更新 yt-dlp

### 音訊轉換失敗

某些格式需要 FFmpeg。Windows 使用者可透過以下方式安裝：
```powershell
winget install FFmpeg
```

## 📝 系統需求

- **作業系統**: Windows 10/11, macOS, Linux
- **Node.js**: v18 或更高版本
- **磁碟空間**: 視下載內容而定

## ⚖️ 授權

MIT License

## ⚠️ 免責聲明

- 請遵守 YouTube 服務條款
- 僅下載您有權使用的內容
- 本工具僅供個人合法使用
- 請勿用於商業用途或侵犯版權

## 🤝 貢獻

歡迎提交 Issues 和 Pull Requests！

## 📧 聯絡方式

如有問題或建議，歡迎開 Issue。

---

**享受您的音樂！** 🎵
