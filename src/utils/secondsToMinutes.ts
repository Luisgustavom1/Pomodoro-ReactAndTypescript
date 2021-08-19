import { zeroLeft } from "./zeroLeft"

export default function secondsToMinutes(seconds: number): string{
  const min = zeroLeft((seconds / 60) % 60)
  const seg = zeroLeft((seconds % 60) % 60)
  
  return `${min}:${seg}`
}
