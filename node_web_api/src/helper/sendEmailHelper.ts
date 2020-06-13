import * as nodemailer from 'nodemailer';
import SendEmailInterface from '../interfaces/sendEmail.interface';


export async function SendEmailHelper(emailTo: string, subject: string, content: string, contentHtml: string) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAIL_PASS
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_SEND,
        to: emailTo,
        subject: subject,
        text: content,
        html: contentHtml
    };
    return await transporter.sendMail(mailOptions);
}

// export class SendEmailHelper {

//     private emailTo: string;
//     private subject: string;
//     private content: string;
//     private contentHtml: string;
//     private mailOptions: SendEmailInterface;

//     constructor(emailTo: string, subject: string, content: string, contentHtml: string) {
//         this.emailTo = emailTo;
//         this.subject = subject;
//         this.content = content;
//         this.contentHtml = contentHtml;
//     }
//     private transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_SEND,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     public sendMail() {
//         this.mailOptions = {
//             from: process.env.EMAIL_SEND,
//             to: this.emailTo,
//             subject: this.subject,
//             text: this.content,
//             html: this.contentHtml
//         };
//         this.transporter.sendMail(this.mailOptions, function (error, info) {
//             if (error) {
//                 return { status: false, error: error };
//             }
//             else {
//                 return { status: true, res: info };
//             }
//         });
//     }

// }


