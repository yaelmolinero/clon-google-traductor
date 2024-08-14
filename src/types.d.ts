import { type SOURCE_LANGUAGES, type TARGET_LANGUAGES, type AUTO_LANGUAGE } from './constants.ts';

export type SourceLanguage = keyof typeof SOURCE_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;

export type FromLanguage = SourceLanguage | AutoLanguage;
export type ToLanguage = keyof typeof TARGET_LANGUAGES;

export interface State {
  fromLanguage: FromLanguage,
  toLanguage: ToLanguage,
  fromText: string,
  result: string,
  loading: boolean
}

export type Action =
  | { type: "SET_FROM_LANGUAGE", payload: FromLanguage }
  | { type: "INTERCHANGE_LANGUAGE" }
  | { type: "SET_TO_LANGUAGE", payload: ToLanguage }
  | { type: "SET_FROM_TEXT", payload: string }
  | { type: "SET_RESULT", payload: string }

export enum SectionTypes  {
  From = "from",
  To = "to"
}
