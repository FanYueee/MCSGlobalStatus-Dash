# MCSGlobalStatus Dash

這個 repo 是前端。

主要就是首頁查詢、一般模式 / 分散式模式切換、API Docs、FAQ，還有中英文切換。

## 快速開始

先裝套件：

```bash
npm install
```

把 env 範例複製成自己的本機設定：

```bash
cp .env.example .env.local
```

開發模式：

```bash
npm run dev
```

正式啟動：

```bash
npm run build
npm run start -- -H 0.0.0.0 -p 3101
```

如果你是在 WSL 裡跑，通常會建議用 `0.0.0.0`，這樣 Windows 瀏覽器才連得到。

## 常用指令

```bash
npm run lint
npm run build
```

目前 `npm run lint` 是走 `Biome`。如果你想另外跑 ESLint，也有保留：

```bash
npm run lint:eslint
```

## env

最重要的就是這兩個：

| 變數 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_API_BASE` | 前端要打哪個 API，例如 `http://localhost:3000` 或 `http://172.x.x.x:3000` |
| `ALLOWED_DEV_ORIGINS` | 開發環境需要時可補自訂 origin，逗號分隔 |

範例：

```env
NEXT_PUBLIC_API_BASE=http://172.20.186.83:3000
ALLOWED_DEV_ORIGINS=http://172.20.186.83:3101
```

## 頁面

- `/`
- `/api-docs`
- `/faq`

## 小提醒

- 右上角語言按鈕會一起切首頁、API Docs、FAQ。
- 如果 API 沒開或 `NEXT_PUBLIC_API_BASE` 指錯，首頁查詢會直接失敗。
- 正式啟動時如果要讓別台機器連進來，記得 `next start` 要加 `-H 0.0.0.0`。
