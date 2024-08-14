import { useReducer } from 'react';
import { AUTO_LANGUAGE } from '../constants.ts';
import { type State, type  Action, FromLanguage, ToLanguage } from '../types.d';

const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en-US",
  fromText: "",
  result: "",
  loading: false
}

function reducer(state: State, action: Action): State {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGE") {
    // Si los idiomas son los mismos o esta en automatico
    if (state.fromLanguage === state.toLanguage || state.fromLanguage === AUTO_LANGUAGE) return state;

    const languageMap: any = {
      "en": "en-US",
      "en-US": "en",
      "en-GB": "en",
      "pt": "pt-BR",
      "pt-BR": "pt",
      "pt-PT": "pt"
    }

    if (state.fromLanguage === languageMap[state.toLanguage]) return state;

    const handleLanguages = { fromLanguage: state.fromLanguage, toLanguage: state.toLanguage };

    if (state.fromLanguage in languageMap) {
      handleLanguages.fromLanguage = languageMap[state.fromLanguage];
    }

    if (state.toLanguage in languageMap) {
      handleLanguages.toLanguage = languageMap[state.toLanguage];
    }

    return {
      fromLanguage: handleLanguages.toLanguage as FromLanguage,
      toLanguage: handleLanguages.fromLanguage as ToLanguage,
      fromText: state.result,
      result: state.fromText,
      loading: false
    }
  }

  if (type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state;

    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === "SET_TO_LANGUAGE") {
    if (state.toLanguage === action.payload) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      toLanguage: action.payload,
      result: "",
      loading
    }
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload.trim() !== "";

    return {
      ...state,
      fromText: action.payload,
      result: "",
      loading
    }
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      result: action.payload,
      loading: false
    }
  }

  return state;
}

export function useStore() {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState);

  function interchangeLanguage() {
    dispatch({ type: "INTERCHANGE_LANGUAGE" });
  }

  function setFromLanguage(payload: FromLanguage) {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  }

  function setToLanguage(payload: ToLanguage) {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  }

  function setFromText(payload: string) {
    dispatch({ type: "SET_FROM_TEXT", payload });
  }

  function setResult(payload: string) {
    dispatch({ type: "SET_RESULT", payload });
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,

    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
