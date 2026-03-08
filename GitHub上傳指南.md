# 如何上傳到 GitHub

## 📋 步驟一：初始化 Git 儲存庫

在專案目錄開啟 PowerShell，執行以下指令：

```powershell
# 切換到專案目錄
cd c:\Users\admin\Desktop\youtube-to-audio

# 初始化 Git 儲存庫
git init

# 設定你的 Git 使用者資訊（如果還沒設定過）
git config user.name "你的名字"
git config user.email "你的email@example.com"

# 加入所有檔案到暫存區
git add .

# 提交變更
git commit -m "Initial commit: YouTube to Audio Converter"
```

## 📋 步驟二：在 GitHub 上建立新儲存庫

1. 前往 [GitHub](https://github.com)
2. 點擊右上角的 **+** → **New repository**
3. 填寫資訊：
   - **Repository name**: `youtube-to-audio`
   - **Description**: YouTube 影片轉音訊工具
   - **Public** 或 **Private**: 選擇公開或私有
   - **不要**勾選 "Initialize this repository with a README"（因為我們已經有了）
4. 點擊 **Create repository**

## 📋 步驟三：推送到 GitHub

GitHub 會顯示指令，複製並執行類似以下的指令：

```powershell
# 加入遠端儲存庫（替換成你的 GitHub 使用者名稱）
git remote add origin https://github.com/你的使用者名稱/youtube-to-audio.git

# 推送到 GitHub（第一次）
git branch -M main
git push -u origin main
```

## 📋 步驟四：完成！

現在你的專案已經在 GitHub 上了！

訪問: `https://github.com/你的使用者名稱/youtube-to-audio`

---

## 🔄 之後更新專案

當你修改專案後，使用以下指令更新 GitHub：

```powershell
# 加入變更
git add .

# 提交變更
git commit -m "描述你的變更"

# 推送到 GitHub
git push
```

---

## 💡 提示

### 如果遇到需要登入 GitHub

第一次推送時可能需要登入，有兩種方式：

**方式一：使用 GitHub CLI**
```powershell
# 安裝 GitHub CLI
winget install GitHub.cli

# 登入
gh auth login
```

**方式二：使用 Personal Access Token**
1. 前往 GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. 勾選 `repo` 權限
4. 複製產生的 token
5. 在推送時使用 token 作為密碼

### 建議的 .gitignore 已設定好

以下檔案不會被上傳：
- `node_modules/` - 依賴套件（別人可以自行 npm install）
- `dist/` - 編譯後的檔案
- `downloads/` - 下載的音訊檔
- `yt-dlp.exe` - 太大了，使用者可自行下載
- 各種音訊檔案（*.mp3, *.m4a, *.wav）

這樣儲存庫會保持乾淨且小巧！

---

## 📝 GitHub 儲存庫建議設定

建議在 GitHub 儲存庫中：

1. **加入 Topics**（標籤）:
   - `youtube-downloader`
   - `audio-converter`
   - `typescript`
   - `nodejs`
   - `cli-tool`

2. **設定 About**:
   - 簡短描述專案
   - 加入網站連結（如果有）

3. **建立 Release**:
   - 當你完成重要版本時，可以建立 Release
   - 附上編譯好的版本供其他人下載

---

**祝你的專案在 GitHub 上成功！** 🎉
