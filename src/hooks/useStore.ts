import { useReducer } from 'react';
import { AUTO_LANGUAGE, LANGUAGE_SELECTION } from '@/constants.ts';
import type {
  State,
  Action,
  FromLanguage,
  ToLanguage,
  LanguageSelection,
} from '@/types.d';

function getLocalStorageState(): LanguageSelection {
  const state = localStorage.getItem(LANGUAGE_SELECTION);
  if (!state) return { fromLanguage: 'auto', toLanguage: 'en' };

  return JSON.parse(state) as LanguageSelection;
}

function setLocalStorageState(data: LanguageSelection) {
  localStorage.setItem(LANGUAGE_SELECTION, JSON.stringify(data));
}

const { fromLanguage, toLanguage } = getLocalStorageState();
const initialState: State = {
  fromLanguage,
  toLanguage,
  fromText: '',
  result: '',
  loading: false,
};

function reducer(state: State, action: Action): State {
  const { type } = action;

  if (type === 'INTERCHANGE_LANGUAGE') {
    // Si los idiomas son los mismos o esta en automatico
    if (
      state.fromLanguage === state.toLanguage ||
      state.fromLanguage === AUTO_LANGUAGE
    )
      return state;

    const { fromLanguage, toLanguage } = state;
    setLocalStorageState({
      fromLanguage: toLanguage,
      toLanguage: fromLanguage,
    });

    return {
      fromLanguage: toLanguage,
      toLanguage: fromLanguage,
      fromText: state.result,
      result: state.fromText,
      loading: false,
    };
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state;
    setLocalStorageState({
      fromLanguage: action.payload,
      toLanguage: state.toLanguage,
    });

    return {
      ...state,
      fromLanguage: action.payload,
    };
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state;

    const loading = state.fromText !== '';
    setLocalStorageState({
      fromLanguage: state.fromLanguage,
      toLanguage: action.payload,
    });

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading,
    };
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload.trim() !== '';

    return {
      ...state,
      fromText: action.payload,
      result: '',
      loading,
    };
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      result: action.payload,
      loading: false,
    };
  }

  return state;
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  function interchangeLanguage() {
    dispatch({ type: 'INTERCHANGE_LANGUAGE' });
  }

  function setFromLanguage(payload: FromLanguage) {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  }

  function setToLanguage(payload: ToLanguage) {
    dispatch({ type: 'SET_TO_LANGUAGE', payload });
  }

  function setFromText(payload: string) {
    dispatch({ type: 'SET_FROM_TEXT', payload });
  }

  function setResult(payload: string) {
    dispatch({ type: 'SET_RESULT', payload });
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
    setResult,
  };
}
