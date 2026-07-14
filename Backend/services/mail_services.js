const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.BREVO_API_KEY,
    },
});

const sendOTP = async (email, otp) => {
    try {
        await transporter.verify();
        console.log("SMTP Connected Successfully");

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Verify your HireSync Account",
            html: `
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
            `,
        });

        console.log("Email Sent:", info.messageId);
    } catch (err) {
        console.error("Mail Error:", err);
        throw err;
    }
};

module.exports = { sendOTP };