import {
  useState
} from "react";


import {
  useStudents
} from "@/hooks/student.hook";
import { StudentTable } from "./student-table";

export default function StudentsPage() {


  const [
    search,
    setSearch
  ] = useState("");



  const {
    data = [],
    isLoading
  } = useStudents({

    search,

  });



  if (isLoading)
    return <div>
      Loading...
    </div>



  return (

    <div>


      <h1>
        Students
      </h1>



      <input

        value={search}

        onChange={
          e => setSearch(e.target.value)
        }

      />



      <StudentTable

        data={data}

      />



    </div>

  )

}
