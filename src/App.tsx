import LanguageSelector from "./components/LanguageSelector.tsx";
import TextArea from "./components/TextArea.tsx";
import { ArrowLeftRight, Clear, Copy } from "./components/Icons.tsx";
import { useEffect } from "react";
import { useStore } from "./hooks/useStore.ts";
import { useDebounce } from './hooks/useDebounce.ts';
import { SectionTypes } from './types.d';

function App() {
  const { fromText, result, fromLanguage, toLanguage, loading,
          setFromText, setResult, setFromLanguage, setToLanguage, interchangeLanguage } = useStore();
  const debounce = useDebounce(fromText, 1000);

  function clearFromText() {
    setFromText("");
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
  }

  useEffect(() => {
    if (debounce === "") return;
    
    fetch("/.netlify/functions/translate", {
      method: "POST",
      body: JSON.stringify({
        text: debounce,
        fromLanguage: "es",
        toLanguage: "en-US"
      })
    })
      .then(response => response.json())
      .then(data => setResult(data))
      .catch(() => setResult("Error"));
    // setResult(debounce);
  }, [debounce, fromLanguage, toLanguage])

  return (
    <>
      <h1>Clon Google Traductor</h1>
      <form className="form">
        <div className="select-language">
          <LanguageSelector type={SectionTypes.From} onChange={setFromLanguage} value={fromLanguage}/>
          <button type="button" onClick={interchangeLanguage} aria-label="Intercambiar Idiomas">
            <ArrowLeftRight />
          </button>
          <LanguageSelector type={SectionTypes.To} onChange={setToLanguage} value={toLanguage} />
        </div>

        <div className="translate-content">
          <div className="from-text">
            <TextArea type={SectionTypes.From} onChange={setFromText} value={fromText} />
            { fromText !== "" && <button type="button" onClick={clearFromText} aria-label="Limpiar texto del usuario"><Clear /></button> }
          </div>
          <div className="result">
            <TextArea type={SectionTypes.To} onChange={setResult} value={result} loading={loading} />
            {
              (result !== "" && result !== "Error") &&
              <div className="buttons">
                <button type="button" onClick={copyResult} aria-label="Copia el resultado en el portapapeles"><Copy /></button>
              </div>
            }
          </div>
        </div>
      </form>
    </>
  );
}

export default App
