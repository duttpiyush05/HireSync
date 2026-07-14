require("dotenv").config();

const sendOTP = async (email, otp) => {
    try {
        const apiKey = process.env.BREVO_API_KEY || process.env.EMAIL_PASS;
        if (!apiKey) {
            throw new Error("Brevo API key / EMAIL_PASS is missing in environment variables.");
        }

        const emailFrom = process.env.EMAIL_FROM || "Team HireSync <hiresync.noreply@gmail.com>";
        const match = emailFrom.match(/^(.*?)\s*<(.*?)>$/);
        const senderName = match ? match[1].trim() : "Team HireSync";
        const senderEmail = match ? match[2].trim() : emailFrom;

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": apiKey
            },
            body: JSON.stringify({
                sender: {
                    name: senderName,
                    email: senderEmail
                },
                to: [
                    {
                        email: email
                    }
                ],
                subject: "Verify your HireSync Account",
                htmlContent: `
                <div style="font-family:Segoe UI,Arial,sans-serif;max-width:480px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">

                    <div style="background:#4f46e5;padding:24px;text-align:center">
                        <h1 style="color:white;margin:0">HireSync</h1>
                    </div>

                    <div style="padding:30px">
                        <h2>Verify your email</h2>

                        <p>Use the OTP below to complete your registration.</p>

                        <div style="
                            text-align:center;
                            font-size:34px;
                            font-weight:bold;
                            letter-spacing:8px;
                            background:#f4f4f4;
                            padding:20px;
                            border-radius:8px;
                        ">
                            ${otp}
                        </div>

                        <p style="margin-top:25px">
                            This OTP expires in <b>5 minutes</b>.
                        </p>
                    </div>

                    <div style="
                        text-align:center;
                        padding:20px;
                        background:#fafafa;
                        color:#777;
                    ">
                        © ${new Date().getFullYear()} HireSync
                    </div>

                </div>
                `
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Email Sent via Brevo HTTP API:", data.messageId || data);
    } catch (err) {
        console.error("Mail Error:", err);
        throw err;
    }
};

module.exports = { sendOTP };