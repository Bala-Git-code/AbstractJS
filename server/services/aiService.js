const OpenAI = require('openai');
const env = require('../config/env');

let client;

function getClient() {
  if (!env.openAiApiKey) {
    throw new Error('OPENAI_API_KEY is not configured.');
  }

  if (!client) {
    client = new OpenAI({ apiKey: env.openAiApiKey });
  }

  return client;
}

async function withRetry(task, attempts = 3, delayMs = 500) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw lastError;
}

async function generateStructuredResponse({ prompt, systemPrompt, model }) {
  const openai = getClient();

  const response = await withRetry(() =>
    openai.responses.create({
      model: model || env.openAiModel,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text:
                systemPrompt ||
                'You are a workflow execution assistant. Always return valid JSON.',
            },
          ],
        },
        {
          role: 'user',
          content: [{ type: 'input_text', text: prompt }],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'workflow_ai_result',
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              summary: { type: 'string' },
              data: {},
            },
            required: ['summary', 'data'],
          },
        },
      },
    })
  );

  const outputText = response.output_text;
  return JSON.parse(outputText);
}

module.exports = {
  generateStructuredResponse,
};
