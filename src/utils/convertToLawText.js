import axios from "axios";

export async function convertToLawText(inputText) {
  const apiEndpoint = "https://api.openai.com/v1/completions";

  const prompt = `Convertis cette proposition en un texte de loi formel et extremement complet et rigoureux (avec un ou plusieurs articles), prêt à être soumis à l'Assemblée Nationale française: "${inputText}"`;

  console.log('PROMPT: ', prompt)

  try {
    const response = await axios.post(
      apiEndpoint,
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 500,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
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
