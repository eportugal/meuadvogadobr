import { Handler } from "aws-lambda";
import * as cheerio from "cheerio";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.MISTRAL_API_KEY!,
  baseURL: "https://api.mistral.ai/v1",
});

async function searchDuckDuckGo(query: string): Promise<string> {
  const response = await fetch(
    `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  const results: string[] = [];
  $(".result")
    .slice(0, 5)
    .each((_, elem) => {
      const title = $(elem).find(".result__a").text();
      const url = $(elem).find(".result__a").attr("href");
      const snippet = $(elem).find(".result__snippet").text();
      results.push(`**${title}**\n${snippet}\nURL: ${url}`);
    });

  return results.join("\n\n");
}

export const handler: Handler = async (event) => {
  try {
    const { question } = JSON.parse(event.body!);

    const webContext = await searchDuckDuckGo(question);

    const completion = await openai.chat.completions.create({
      model: "mistral-medium",
      messages: [
        {
          role: "system",
          content: `Você é um assistente jurídico. Use APENAS as informações abaixo como referência para responder.\n\n### Informações disponíveis:\n${webContext}`,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: completion.choices[0].message.content,
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
