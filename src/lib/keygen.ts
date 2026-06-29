const KEYGEN_API = `https://api.keygen.sh/v1/accounts/${process.env.KEYGEN_ACCOUNT_ID}`;

const headers = {
  Authorization: `Bearer ${process.env.KEYGEN_PRODUCT_TOKEN}`,
  "Content-Type": "application/vnd.api+json",
  Accept: "application/vnd.api+json",
};

export async function createLicense(email: string): Promise<string> {
  const res = await fetch(`${KEYGEN_API}/licenses`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "licenses",
        attributes: { metadata: { email } },
        relationships: {
          policy: {
            data: { type: "policies", id: process.env.KEYGEN_POLICY_ID },
          },
        },
      },
    }),
  });

  if (!res.ok) throw new Error(`Keygen license creation failed (${res.status}): ${await res.text()}`);
  const body = await res.json();
  return body.data.attributes.key as string;
}

export async function getLicenseByEmail(email: string): Promise<string | null> {
  const res = await fetch(
    `${KEYGEN_API}/licenses?metadata[email]=${encodeURIComponent(email)}&limit=1`,
    { headers }
  );

  if (!res.ok) return null;
  const body = await res.json();
  const license = body.data?.[0];
  return license ? (license.attributes.key as string) : null;
}
