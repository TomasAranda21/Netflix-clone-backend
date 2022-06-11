import nodemailer from 'nodemailer';

const emailRegister = async (data) => {
    

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
   const { email, nombre, token } = data;

   const info = await transporter.sendMail({
    
    from: '"NETFLIX" misitio.online.web@gmail.com',
    to: email,
    subject: 'Comprueba tu cuenta en NETFLIX',
    text: 'Comprueba tu cuenta en NETFLIX',
    html: 
    
    `<p>¡Hola!, Comprueba tu cuenta en NETFLIX.</p>
    <p> ¡Tu cuenta ya esta casi lista! Solo debes comprobarla en el siguiente enlace: </p>
    <a href="${process.env.FRONTEND_URL}/signup/account-confirmed/${token}"> Comprobar Cuenta Ahora<a></p>

    <p> Si tu no creaste esta cuenta puedes ignorar este mensaje. </p>
    
    `,



   });

   console.log("Mensaje enviado", info.messageId)
}
export default emailRegister