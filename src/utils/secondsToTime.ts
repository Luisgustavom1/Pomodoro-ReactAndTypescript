import { zeroLeft } from "./zeroLeft"

export default function secondsToTime(seconds: number): string{
  const hours = zeroLeft(seconds / 3600)
  const min = zeroLeft((seconds / 60) % 60)
  const seg = zeroLeft((seconds % 60) % 60)
  
  return `${hours}:${min}:${seg}`
}
