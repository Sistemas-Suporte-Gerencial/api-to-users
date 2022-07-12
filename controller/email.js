import {createTransport} from 'nodemailer';

export const sendEmail = async (req, res) =>{
    try {
        const { to, subject, text, html } = req.body;

        let transporter = createTransport({
            host: process.env.SMTP_HOST,
            auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            }
        });

        await transporter.sendMail({
            from: 'SGEDU-SUPORTEGERENCIAL 👻" <suportegerencial@sgedu.com>',
            to,
            subject,
            text,
            html
        });

        return res.status(200).json({
            message: 'Email sent'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error sending email',
            error
        });
    }
}