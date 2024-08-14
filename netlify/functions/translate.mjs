const URL = "https://api-free.deepl.com/v2/translate";
const apiKey = process.env.API_KEY;
console.log(apiKey);

export default async function (req) {
  const { text, fromLanguage, toLanguage } = JSON.parse(req.body);

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      Connection: "keep-alive"
    },
    body: JSON.stringify({
      text: [text],
      "target_lang": toLanguage,
      "source_lang": fromLanguage
    })
  });
  const result = await response.json();

  return new Response(result.traslations[0].text);
}
