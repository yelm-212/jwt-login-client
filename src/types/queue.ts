export interface QueueItem {
  resolve: (value: string | null) => void
  reject: (reason?: unknown) => void
}
