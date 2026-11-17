/** Map thrown errors to HTTP status + safe client message. */
export function chatRouteErrorToHttp(e: unknown): { status: number; message: string } {
  if (!(e instanceof Error)) {
    return { status: 500, message: "Chat failed" };
  }

  const name = e.name;
  const msg = e.message || "";
  const status =
    (e as { status?: number }).status ??
    (e as { statusCode?: number }).statusCode ??
    undefined;

  if (
    name === "RateLimitError" ||
    status === 429 ||
    /rate.?limit|too many requests|throttl/i.test(msg)
  ) {
    return {
      status: 429,
      message:
        "Azure AI rate limit reached. Wait a moment and try again.",
    };
  }

  if (
    name === "AuthenticationError" ||
    status === 401 ||
    /unauthorized|invalid.?api.?key|authentication/i.test(msg)
  ) {
    return {
      status: 401,
      message:
        "Azure AI rejected the API key. Check AZURE_OPENAI_API_KEY in .env (local) or Vercel Environment Variables (deployed), then restart / redeploy.",
    };
  }

  if (status === 403) {
    return {
      status: 403,
      message:
        "Azure AI access denied. Verify the API key, endpoint, and that the deployment is enabled in Azure AI Foundry.",
    };
  }

  if (
    status === 404 ||
    /deployment.?not.?found|model.?not.?found|404/i.test(msg)
  ) {
    return {
      status: 400,
      message:
        "Azure deployment not found. Set AZURE_OPENAI_DEPLOYMENT_NAME to your Foundry deployment name and restart.",
    };
  }

  if (/Azure AI Foundry is not configured/i.test(msg)) {
    return { status: 503, message: msg };
  }

  if (name === "APIConnectionError" || /fetch failed|ECONNREFUSED|ENOTFOUND/i.test(msg)) {
    return {
      status: 503,
      message:
        "Could not reach Azure AI Foundry. Check AZURE_OPENAI_ENDPOINT and your network connection.",
    };
  }

  return { status: status && status >= 400 ? status : 500, message: msg || "Chat failed" };
}
