/** Map thrown errors to HTTP status + safe client message. */
export function chatRouteErrorToHttp(e: unknown): { status: number; message: string } {
  if (!(e instanceof Error)) {
    return { status: 500, message: "Chat failed" };
  }

  const name = e.name;
  const msg = e.message || "";

  // AWS SDK v3 error names from BedrockRuntime
  if (name === "ThrottlingException" || name === "TooManyRequestsException") {
    return {
      status: 429,
      message:
        "AWS Bedrock rate limit reached. Wait a moment and try again, or request a quota increase in the AWS console.",
    };
  }

  if (name === "AccessDeniedException") {
    return {
      status: 403,
      message:
        "AWS Bedrock access denied. Verify that your IAM credentials have the bedrock:InvokeModel permission and that the model is enabled in your AWS account (Bedrock console → Model access).",
    };
  }

  if (name === "ValidationException") {
    if (/model.*not.*found|no such model|not supported/i.test(msg)) {
      return {
        status: 400,
        message: `Bedrock model not found or not supported: ${msg}. Set BEDROCK_MODEL_ID to a valid inference-profile ID (e.g. us.anthropic.claude-haiku-4-5-20251001-v1:0) and restart.`,
      };
    }
    return { status: 400, message: `Bedrock validation error: ${msg}` };
  }

  if (name === "ModelNotReadyException") {
    return { status: 503, message: "The Bedrock model is not ready yet. Try again in a moment." };
  }

  if (name === "ServiceUnavailableException") {
    return { status: 503, message: "AWS Bedrock is temporarily unavailable. Try again later." };
  }

  if (name === "ModelErrorException") {
    return { status: 500, message: `Bedrock model error: ${msg}` };
  }

  // Credential / config errors surfaced as generic Error
  if (
    /could not load credentials|no credentials|credential/i.test(msg)
  ) {
    return {
      status: 503,
      message:
        "AWS credentials not configured. Locally: add AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY to .env and restart the dev server. Deployed: set the same variables in your host environment (e.g. Vercel project → Environment Variables) and redeploy.",
    };
  }

  // Fall back to the HTTP status embedded in AWS SDK $metadata if present
  const meta = (e as unknown as { $metadata?: { httpStatusCode?: number } }).$metadata;
  if (meta?.httpStatusCode) {
    return { status: meta.httpStatusCode, message: msg || "AWS Bedrock request failed" };
  }

  return { status: 500, message: msg || "Chat failed" };
}
