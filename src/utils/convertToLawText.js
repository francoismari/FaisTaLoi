import axios from "axios";

export async function convertToLawText(inputText) {
  const apiEndpoint = "https://api.openai.com/v1/completions";

  const prompt = `Traduis le texte suivant comme un texte de loi (avec un ensemble d'articles), qui peut ensuite être soumis à l'Assemblée nationale française: "${inputText}"`;

  try {
    const response = await axios.post(
      apiEndpoint,
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      return response.data.choices[0].text;
    } else {
      throw new Error("No text conversion received from the OpenAI API");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
