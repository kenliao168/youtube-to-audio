import { spawn } from 'child_process';
import { resolve, join, dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import * as readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ytDlpPath = join(__dirname, '..', 'yt-dlp.exe');

// 創建命令行介面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

// 檢查 yt-dlp
function checkYtDlp(): boolean {
  return existsSync(ytDlpPath);
}

// 下載音訊
async function downloadAudio(url: string, outputPath: string, format: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎵 開始下載...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const args = [
      '-x',
      '--audio-format', format,
      '--audio-quality', '0',
      '-o', join(outputPath, '%(title)s.%(ext)s'),
      '--progress',
      '--no-playlist',
      url
    ];

    const ytDlp = spawn(ytDlpPath, args, {
      stdio: 'inherit'
    });

    ytDlp.on('error', (error) => {
      reject(new Error(`執行失敗: ${error.message}`));
    });

    ytDlp.on('close', (code) => {
      if (code === 0) {
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ 下載完成！');
        console.log(`📁 檔案位置: ${outputPath}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        resolve();
      } else {
        reject(new Error(`下載失敗 (錯誤代碼: ${code})`));
      }
    });
  });
}

async function main() {
  console.clear();
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║     🎵 YouTube 音訊下載器 🎵                  ║');
  console.log('╚═══════════════════════════════════════════════╝\n');

  // 檢查 yt-dlp
  if (!checkYtDlp()) {
    console.error('❌ 錯誤: 找不到 yt-dlp.exe');
    console.log(`請確保 yt-dlp.exe 位於: ${ytDlpPath}\n`);
    rl.close();
    process.exit(1);
  }

  // 確保下載目錄存在
  const defaultOutput = resolve('./downloads');
  if (!existsSync(defaultOutput)) {
    mkdirSync(defaultOutput, { recursive: true });
  }

  while (true) {
    console.log('');
    const url = await question('請貼上 YouTube 連結 (或輸入 q 離開): ');

    if (url.toLowerCase() === 'q' || url.toLowerCase() === 'quit' || url.toLowerCase() === 'exit') {
      console.log('\n👋 再見！\n');
      break;
    }

    if (!url) {
      console.log('⚠️  請輸入有效的連結\n');
      continue;
    }

    // 詢問格式
    const format = await question('選擇格式 (1=MP3, 2=M4A, 3=WAV) [預設: 1]: ');
    let audioFormat = 'mp3';
    
    if (format === '2') {
      audioFormat = 'm4a';
    } else if (format === '3') {
      audioFormat = 'wav';
    }

    // 詢問輸出目錄
    const customPath = await question(`輸出目錄 [預設: ${defaultOutput}]: `);
    const outputPath = customPath || defaultOutput;

    // 確保輸出目錄存在
    if (!existsSync(outputPath)) {
      mkdirSync(outputPath, { recursive: true });
    }

    try {
      await downloadAudio(url, outputPath, audioFormat);
      
      const continueChoice = await question('繼續下載其他影片？(Y/n): ');
      if (continueChoice.toLowerCase() === 'n' || continueChoice.toLowerCase() === 'no') {
        console.log('\n👋 再見！\n');
        break;
      }
    } catch (error) {
      console.error('\n❌ 錯誤:', error instanceof Error ? error.message : error);
      console.log('');
    }
  }

  rl.close();
}

main();
