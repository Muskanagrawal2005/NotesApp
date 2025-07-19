import nodemailer from 'nodemailer';

export const sendEmail= async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.EMAIL_PORT,
            service: process.env.SERVICE,
            secure:Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent successfully");
        return true;
    }
    catch(error){
        console.log(error);
        return error;
    }
}