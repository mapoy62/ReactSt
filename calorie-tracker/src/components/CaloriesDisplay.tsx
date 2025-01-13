type CalorieDisplayProps = {
    calories: number
    text: string
    color: string
}

export default function CaloriesDisplay({calories, text, color }: CalorieDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                <span className={`font5-black text-6xl ${color}`}>{calories}</span>
                {text}
            </p>
  )
}
