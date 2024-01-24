import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tbcgulfmarketing@gmail.com",
      pass: "gyqj dwxp nrmo qobv",
    },
  });

export default async function sendEmail(email) {
    try {
        const a = await transporter.sendMail({
            from: "tbcgulfmarketing@gmail.com",
            to: email.email,
            subject: email.subject,
            text: email.text,
        });
        console.log(a);
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email", error);
    }
};
