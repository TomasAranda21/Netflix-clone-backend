import nodemailer from 'nodemailer';

const emailChange = async (data) => {
    

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
      }
    });


    // Contenido del email
   const { email, token } = data;

   const info = await transporter.sendMail({
    
    from: '"CLON DE NETFLIX" misitio.online.web@gmail.com',
    to: email,
    subject: 'solicitud para cambiar email en NETFLIX',
    text: 'solicitud para cambiar email en NETFLIX',
    html: 
    
    `<p>¡Hola!, solicitaste cambiar tu email de tu cuenta de Netflix.</p>
    <p> Para cambiar el email ingresa al siguiente enlace: </p>
    <a href="${process.env.FRONTEND_URL}/change-email/${token}"> Cambiar Email<a></p>

    <p> Si tú no solicitaste cambiar el email de tu cuenta puedes ignorar este mensaje.</p>
    
    `,

   });

   console.log("Mensaje enviado", info.messageId)
}
export default emailChange