import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

// Define an interface for the function parameters
interface SendEmailParams {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    // TODO: Configure mail for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update the user based on the email type
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000
        }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000
        }
      });
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6ac7df8521c753", // add to environment variables for protection
        pass: "98216c05c7803f"
      }
    });

    // Define the email options
    const mailOptions = {
      from: 'omkar@omkarshelke.me', // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your account." : "Reset your password.", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify the account." : "reset the password."}
      or copy and paste the link in the browser.
      <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      <p>`,
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    // Specify the error type more explicitly
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};