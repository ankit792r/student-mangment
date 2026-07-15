interface Props {

  value: string;

  onChange: (value: string) => void;

}


export function StudentFilters({
  value,
  onChange,
}: Props) {


  return (

    <input

      placeholder="Search students..."

      value={value}

      onChange={
        e => onChange(e.target.value)
      }

    />

  )

}
