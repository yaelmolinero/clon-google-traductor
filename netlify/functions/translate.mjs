import * as deepl from "deepl-node";

const apiKey = process.env.API_KEY;
const translator = new deepl.Translator(apiKey);

export default async function (req)  {
  const data = await req.json();
  const { text, fromLanguage, toLanguage } = data;
  const handlFromLanguage = fromLanguage === "auto" ? null : fromLanguage;

  try {
    const response = await translator.translateText(text, handlFromLanguage, toLanguage);
    const result = JSON.stringify(response.text);
    return new Response(result);
  } catch {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "November", "December"];
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const errorMessage = `Free api use terminated this month, try again on ${months[date.getMonth()]} 12 👋`;
    return new Response(JSON.stringify(errorMessage));
  }
}
