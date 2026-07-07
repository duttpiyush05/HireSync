const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth:{
    user : process.env.EMAIL_USER,
    pass : process.env.EMAIL_PASS
  }
})

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"HireSync" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your HireSync Account",
    html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      
      <div style="background: #4f46e5; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">HireSync</h1>
      </div>

      <div style="padding: 32px 24px;">
        <h2 style="color: #111827; font-size: 18px; margin-top: 0;">Verify your email</h2>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
          Use the verification code below to complete your sign-up. This code is valid for the next <strong>5 minutes</strong>.
        </p>

        <div style="background: #f3f4f6; border-radius: 6px; padding: 16px; text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #4f46e5;">
            ${otp}
          </span>
        </div>

        <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
          If you didn't request this code, you can safely ignore this email — no changes will be made to your account.
        </p>
      </div>

      <div style="background: #f9fafb; padding: 16px 24px; text-align: center;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          &copy; ${new Date().getFullYear()} HireSync. All rights reserved.
        </p>
      </div>

    </div>
    `,
    text: `Your HireSync verification code is ${otp}. It expires in 5 minutes. If you didn't request this, ignore this email.`,
  });
};

module.exports = {sendOTP}