import {
  RESET_PASSWORD_EMAIL_TEMPLATE,
  RESET_PASSWORD_SUCCESS_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Verification email sent successfully", response);
  } catch (error) {
    console.log("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "5aa2b824-7708-42eb-82ce-426226ece42a",
      template_variables: {
        company_info_name: "Authora",
        name: name,
      },
    });

    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.log("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (email, resetTokenURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: RESET_PASSWORD_EMAIL_TEMPLATE.replace("{RESET_URL}", resetTokenURL),
      category: "Password Reset",
    });

    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.log("Error sending reset password email:", error);
    throw new Error(`Error sending reset password email: ${error}`);
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: RESET_PASSWORD_SUCCESS_EMAIL_TEMPLATE,
      category: "Reset Password",
    });
  } catch (error) {
    console.log("Error sending password reset success:", error);
    throw new Error(`Error sending password reset success: ${error}`);
  }
};
