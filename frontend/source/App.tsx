import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "./components/theme-switcher"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <ThemeSwitcher />
    </div>
  )
}

export default App
