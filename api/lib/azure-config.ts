/** Read Azure AI Foundry / Azure OpenAI configuration from environment variables. */
export interface AzureConfig {
  endpoint: string;
  apiKey: string;
  deployment: string;
  apiVersion: string;
}

export function getAzureConfig(): AzureConfig {
  const endpoint = (
    process.env.AZURE_OPENAI_ENDPOINT?.trim() ||
    process.env.AZURE_AI_ENDPOINT?.trim() ||
    ""
  ).replace(/\/+$/, "");

  const apiKey =
    process.env.AZURE_OPENAI_API_KEY?.trim() ||
    process.env.AZURE_AI_API_KEY?.trim() ||
    "";

  const deployment =
    process.env.AZURE_OPENAI_DEPLOYMENT_NAME?.trim() ||
    process.env.AZURE_AI_DEPLOYMENT_NAME?.trim() ||
    process.env.AZURE_OPENAI_MODEL?.trim() ||
    "";

  const apiVersion =
    process.env.AZURE_OPENAI_API_VERSION?.trim() || "2024-12-01-preview";

  if (!endpoint || !apiKey || !deployment) {
    throw new Error(
      "Azure AI Foundry is not configured. Locally: add AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, and AZURE_OPENAI_DEPLOYMENT_NAME to .env and restart the dev server. Deployed: set the same variables in Vercel Environment Variables and redeploy.",
    );
  }

  return { endpoint, apiKey, deployment, apiVersion };
}
