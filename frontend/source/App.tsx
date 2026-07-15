import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "./components/theme-switcher"
import { useStudents } from "./hooks/student.hook";

function App() {
  const {
    data: students,
    isLoading,
  } = useStudents({
    course: "BCA",
  });


  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <p>{isLoading ? "Loading" : students?.length}</p>
      <ThemeSwitcher />
    </div>
  )
}

export default App
