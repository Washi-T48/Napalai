import { transporter } from '../config/mail.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const from_name = "Napalai";
const from_mail = process.env.MAIL_USER;
const mail_subject = "Password Reset Link for Your Napalai Account"
const leading_text = 'Please head to this URL to reset your password: '
const trailing_text = ' . The link will expire in 5 minutes. Please do not share this link with anyone.'
const rootPage = process.env.ROOT_URL + '/auth/reset/';

export const generateToken = async () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buffer) => {
            if (err) { reject(err); }
            const token = buffer.toString('hex');
            const hash = crypto.createHash('sha256').update(token).digest('hex');
            resolve({ token, hash });
        });
    });
};

export const verifyToken = (token, hash) => {
    return new Promise((resolve, reject) => {
        try {
            const tokenhash = crypto.createHash('sha256').update(token).digest('hex');
            if (tokenhash === hash) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            console.error(error);
            reject(false);
        }
    });
};

export const forgetPasswordSender = async (recipient, id) => {
    const fullURL = rootPage + id;
    transporter.sendMail({
        from: `${from_name} ${from_mail}`,
        to: recipient,
        subject: mail_subject,
        text: leading_text + fullURL + trailing_text,
        envelope: {
            from: `${from_name} ${from_mail}`,
            to: recipient
        }
    }, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log(info);
        }
    });
};