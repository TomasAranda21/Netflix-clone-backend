import nodemailer from 'nodemailer';

const emailForgetPass= async (datos) => {

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
   const { email, token } = datos;

   const info = await transporter.sendMail({
    
    from: '"CLON DE NETFLIX" misitio.online.web@gmail.com',
    to: email,
    subject: 'Reestablece tu contraseña',
    text: 'Reestablece tu contraseña',
    html: 
    
    `<p>¡Hola ${email}!, Has solucitado reestablecer tu contraseña.</p>
    <p> Sigue el siguiente enlace para generar una nueva contraseña: </p>
    <a href="${process.env.FRONTEND_URL}/loginHelp/${token}">Reestablecer Contraseña<a></p>

    <p> Si tu no creaste esta cuenta puedes ignorar este mensaje </p>
    
    `,



   });

   console.log("Mensaje enviado", info.messageId)
}
export default emailForgetPass