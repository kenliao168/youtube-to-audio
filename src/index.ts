#!/usr/bin/env node

import { program } from 'commander';
import { spawn } from 'child_process';
import { resolve, join, dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';

// 取得當前檔案的目錄（用於找到本地的 yt-dlp.exe）
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ytDlpPath = join(__dirname, '..', 'yt-dlp.exe');

// 檢查 yt-dlp 是否存在
function checkYtDlp(): Promise<boolean> {
  return new Promise((resolve) => {
    // 優先使用本地的 yt-dlp.exe
    const execPath = existsSync(ytDlpPath) ? ytDlpPath : 'yt-dlp';
    const process = spawn(execPath, ['--version']);
    process.on('error', () => resolve(false));
    process.on('close', (code) => resolve(code === 0));
  });
}

// 下載並轉換 YouTube 影片為音訊
async function downloadAudio(url: string, outputPath: string, format: string = 'mp3'): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`\n開始下載: ${url}`);
    console.log(`輸出格式: ${format}`);
    console.log(`輸出目錄: ${outputPath}\n`);

    // 優先使用本地的 yt-dlp.exe
    const execPath = existsSync(ytDlpPath) ? ytDlpPath : 'yt-dlp';

    // yt-dlp 參數
    const args = [
      '-x',                          // 提取音訊
      '--audio-format', format,       // 音訊格式
      '--audio-quality', '0',         // 最佳音質
      '-o', join(outputPath, '%(title)s.%(ext)s'),  // 輸出檔案名稱模板
      '--progress',                   // 顯示進度
      '--no-playlist',                // 不下載播放清單
      url
    ];

    const ytDlp = spawn(execPath, args, {
      stdio: 'inherit'  // 繼承父進程的 stdio，可以看到進度
    });

    ytDlp.on('error', (error) => {
      reject(new Error(`執行失敗: ${error.message}`));
    });

    ytDlp.on('close', (code) => {
      if (code === 0) {
        console.log('\n✅ 轉換完成！');
        resolve();
      } else {
        reject(new Error(`yt-dlp 退出代碼: ${code}`));
      }
    });
  });
}

// 主程式
async function main() {
  program
    .name('youtube-to-audio')
    .description('將 YouTube 影片轉換成音訊檔')
    .version('1.0.0')
    .argument('<url>', 'YouTube 影片連結')
    .option('-o, --output <path>', '輸出目錄', './downloads')
    .option('-f, --format <format>', '音訊格式 (mp3, m4a, wav, opus)', 'mp3')
    .action(async (url: string, options: { output: string; format: string }) => {
      try {
        // 檢查 yt-dlp 是否已安裝
        const hasYtDlp = await checkYtDlp();
        if (!hasYtDlp) {
          console.error('❌ 錯誤: 找不到 yt-dlp');
          console.log('\nyt-dlp.exe 應該在專案目錄中，或是從以下網址下載:');
          console.log('  https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe');
          console.log(`\n下載後請放置於: ${ytDlpPath}`);
          process.exit(1);
        }

        // 確保輸出目錄存在
        const outputPath = resolve(options.output);
        if (!existsSync(outputPath)) {
          mkdirSync(outputPath, { recursive: true });
        }

        // 下載並轉換
        await downloadAudio(url, outputPath, options.format);
        
      } catch (error) {
        console.error('\n❌ 錯誤:', error instanceof Error ? error.message : error);
        process.exit(1);
      }
    });

  program.parse();
}

main();
