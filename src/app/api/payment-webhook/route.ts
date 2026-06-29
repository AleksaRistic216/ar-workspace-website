import { NowPaymentsSDK } from "@nowpaymentsio/nowpayments-sdk-nodejs";
import { createLicense } from "@/lib/keygen";

const sdk = new NowPaymentsSDK({
  ipnSecret: process.env.NOWPAYMENTS_IPN_SECRET!,
});

export async function POST(request: Request) {
  const payload = await request.json();
  const sig = request.headers.get("x-nowpayments-sig") ?? "";

  let event;
  try {
    event = sdk.parseWebhook(payload, sig);
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (event.type !== "payment.status_changed" || event.payment.status !== "paid") {
    return Response.json({ ok: true });
  }

  const email = payload.order_description;
  if (!email || !String(email).includes("@")) {
    console.error("[webhook] No customer email in order_description", payload);
    return Response.json({ error: "Missing customer email" }, { status: 400 });
  }

  try {
    await createLicense(String(email));
    console.log(`[webhook] License created for ${email} (payment ${event.payment.payment_id})`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[webhook] License creation failed:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }

  return Response.json({ ok: true });
}
