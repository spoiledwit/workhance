import nodemailer from "nodemailer";

export const sendEmail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            service: "gmail",
            auth: {
                user: "tbcgulfmarketing@gmail.com",
                pass: "gyqj dwxp nrmo qobv",
            },
        });
       const a = await transporter.sendMail({
            from: "tbcgulfmarketing@gmail.com",
            to: email.email,
            subject: email.subject,
            text: email.text,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email", error);
    }
};