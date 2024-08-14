import { SectionTypes } from "../types.d";

interface Props {
  type: SectionTypes
  loading?: boolean
  value: string
  onChange: (text: string) => void
}

function getPlaceholder({ type, loading }: { type: SectionTypes, loading?: boolean }) {
  if (type === SectionTypes.From) return "Introducir texto";
  if (loading === true) return "Cargando...";
  return "Traducción";
}

function TextArea({ type, value, loading, onChange }: Props) {

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  return (
    <textarea
      rows={5}
      disabled={type === SectionTypes.To}
      placeholder={getPlaceholder({ type, loading })}
      onChange={handleChange}
      value={value}
    />
  );
}

export default TextArea;
