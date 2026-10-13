import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { PlatformSettings } from "@/types";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY ?? "";
const fromEmail =
  process.env.RESEND_FROM_EMAIL ?? "no-reply@interlinkchain.com";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const {
      fullName,
      email,
      walletAddress,
      itlAmount,
      usdtPayout,
      transactionProof,
    } = payload || {};

    // Read the admin notification email from Firestore settings
    let adminEmail = "";
    if (isFirebaseConfigured) {
      try {
        const snap = await getDoc(doc(db, "settings", "platform"));
        if (snap.exists()) {
          const data = snap.data() as PlatformSettings;
          adminEmail = data.adminEmail || "";
        }
      } catch {
        adminEmail = "";
      }
    }

    if (!adminEmail) {
      // No admin email configured — silently succeed so the user flow is unaffected.
      return NextResponse.json({
        ok: true,
        skipped: true,
        reason: "no-admin-email",
      });
    }

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    const subject = `New ITL Redemption Request — ${itlAmount || "—"} ITL`;

    const html = buildEmailHtml({
      fullName,
      email,
      walletAddress,
      itlAmount,
      usdtPayout,
      transactionProof,
    });

    await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send admin notification email:", err);
    return NextResponse.json(
      { error: "Failed to send admin notification." },
      { status: 500 },
    );
  }
}

function buildEmailHtml(data: {
  fullName: string;
  email: string;
  walletAddress: string;
  itlAmount: string;
  usdtPayout: string;
  transactionProof: string;
}) {
  const {
    fullName,
    email,
    walletAddress,
    itlAmount,
    usdtPayout,
    transactionProof,
  } = data;
  const adminUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin`
    : "/admin";

  return `
  <div style="margin:0;padding:0;background:#050508;font-family:'Poppins',Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
      <!-- Header -->
      <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #2a2a3a;">
        <div style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
          ITL<span style="color:#a78bfa;">Coin</span>
        </div>
        <div style="font-size:12px;color:#9ca3af;margin-top:4px;text-transform:uppercase;letter-spacing:1.5px;">
          Redemption Alert
        </div>
      </div>

      <!-- Badge -->
      <div style="margin-top:28px;text-align:center;">
        <span style="display:inline-block;background:rgba(167,139,250,0.15);color:#c4b5fd;font-size:12px;font-weight:600;padding:6px 16px;border-radius:999px;border:1px solid rgba(167,139,250,0.3);">
          New Redemption Request
        </span>
      </div>

      <!-- Title -->
      <h1 style="font-size:22px;font-weight:700;color:#ffffff;text-align:center;margin:20px 0 8px;">
        A user has requested a redemption
      </h1>
      <p style="font-size:14px;color:#9ca3af;text-align:center;margin:0 0 28px;">
        Please review the details below and process the request in your admin dashboard.
      </p>

      <!-- Details card -->
      <div style="background:#0f0f17;border:1px solid #2a2a3a;border-radius:14px;padding:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:10px 0;color:#9ca3af;width:40%;vertical-align:top;">Full Name</td>
            <td style="padding:10px 0;color:#ffffff;font-weight:600;">${fullName || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#9ca3af;vertical-align:top;">Email</td>
            <td style="padding:10px 0;color:#ffffff;">${email || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#9ca3af;vertical-align:top;">BEP-20 Wallet</td>
            <td style="padding:10px 0;color:#a78bfa;font-family:monospace;font-size:12px;word-break:break-all;">${walletAddress || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#9ca3af;vertical-align:top;">ITL Amount</td>
            <td style="padding:10px 0;color:#ffffff;font-weight:700;">${itlAmount || "—"} ITL</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#9ca3af;vertical-align:top;">USDT Payout</td>
            <td style="padding:10px 0;color:#34d399;font-weight:700;">${usdtPayout || "—"} USDT</td>
          </tr>
        </table>

        ${
          transactionProof
            ? `
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #2a2a3a;">
          <div style="font-size:12px;color:#9ca3af;margin-bottom:8px;">Transaction Proof</div>
          <a href="${transactionProof}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:rgba(167,139,250,0.15);color:#c4b5fd;text-decoration:none;font-size:13px;font-weight:600;padding:10px 18px;border-radius:8px;border:1px solid rgba(167,139,250,0.3);">
            View Proof of Transaction
          </a>
        </div>`
            : ""
        }
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-top:28px;">
        <a href="${adminUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:10px;">
          Review in Admin Dashboard
        </a>
      </div>

      <!-- Footer -->
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #2a2a3a;text-align:center;font-size:12px;color:#6b7280;">
        <p style="margin:0 0 6px;">This is an automated notification from ITLCoin.</p>
        <p style="margin:0;">© ${new Date().getFullYear()} InterlinkChain. All rights reserved.</p>
      </div>
    </div>
  </div>`;
}
