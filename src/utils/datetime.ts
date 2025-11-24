import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Unix timestampをAsia/Tokyoタイムゾーンでyyyy-mm-dd hh:ii:ss形式の文字列に変換
 * @param timestamp Unix timestamp（秒単位）
 * @returns フォーマットされた日時文字列（例: "2024-01-15 14:30:45"）
 */
export function formatTimestamp(timestamp: number): string {
  return dayjs.unix(timestamp).tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
}
