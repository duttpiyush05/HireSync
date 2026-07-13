const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
    await resend.emails.send({
        from: "HireSync <hiresync.noreply@gmail.com>",
        to: email,
        subject: "Verify your HireSync Account",

        html: `
        <div style="font-family:Segoe UI,Arial,sans-serif;max-width:480px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">

            <div style="background:#4f46e5;padding:24px;text-align:center">
                <h1 style="color:white;margin:0">
                    HireSync
                </h1>
            </div>

            <div style="padding:30px">

                <h2>Verify your email</h2>

                <p>
                    Use the OTP below to complete your registration.
                </p>

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
    });
};

module.exports = { sendOTP };