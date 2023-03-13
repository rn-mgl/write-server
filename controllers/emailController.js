const sg = require("@sendgrid/mail");

const url = "https://write-rltn.vercel.app";

const sendMail = async (email, name) => {
  sg.setApiKey(process.env.SENDGRID);

  const msg = {
    to: email,
    from: process.env.SENDGRID_USER,
    subject: "Account Verification",
    html: `<p>
                Greetings ${name},
                <br />
                This email is to verify your account in <a href="https://write-rltn.vercel.app">write-rltn.vercel.app</a>.
                <br /><br />
                Please click the link below to proceed in your verification process. This link will expire
                in 15 days.
                <br /><br />
                If you did not register in our website, please ignore this email, and be assured that your account
                is secured.
                <br /><br />
                <a href="${url}/auth/verify">Verify my account</a>
                <br /><br />
                Thank you!
            </p>`,
  };

  const data = await sg.send(msg);

  return data;
};

module.exports = { sendMail };
