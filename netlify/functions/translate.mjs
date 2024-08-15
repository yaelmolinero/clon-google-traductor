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
  } catch(err) {
    return new Response("Error");
  }
}
