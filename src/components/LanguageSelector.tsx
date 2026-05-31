import { SUPPORTED_LAGUAGES } from '@/constants.ts';
import { type FromLanguage, type ToLanguage, SectionTypes } from '@/types.d';

type Props =
  | { type: SectionTypes.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionTypes.To, value: ToLanguage, onChange: (language: ToLanguage) => void  }

function LanguageSelector({ type, value, onChange: changeLanguage }: Props) {

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    type === SectionTypes.From
      ? changeLanguage(event.target.value as FromLanguage)
      : changeLanguage(event.target.value as ToLanguage);
  }

  return (
    <select name='fromLanguage' onChange={handleChange} value={value}>
      { type === SectionTypes.From && <option value='auto'>Detectar idioma</option> }

      {Object.entries(SUPPORTED_LAGUAGES).map(([key, value]) => (
        <option value={key} key={`${type}-${key}`}>
          { value }
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
