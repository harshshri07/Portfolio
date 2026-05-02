/** Read AWS / Bedrock configuration from environment variables. */
export interface BedrockConfig {
  region: string;
  modelId: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
}

export function getBedrockConfig(): BedrockConfig {
  return {
    region: process.env.AWS_REGION?.trim() || "us-east-1",
    modelId:
      process.env.BEDROCK_MODEL_ID?.trim() ||
      "us.anthropic.claude-haiku-4-5-20251001-v1:0",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID?.trim() || undefined,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY?.trim() || undefined,
    sessionToken: process.env.AWS_SESSION_TOKEN?.trim() || undefined,
  };
}
