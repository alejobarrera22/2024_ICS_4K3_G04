import emailjs from "@emailjs/browser";
import * as React from 'react'
export default function sendEmail(details){
  console.log("Enviando email...");
  console.log("Detalles: ", details);
  emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);
  
  emailjs
    .send( 
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      {
        to_email: details.to_email,
        to_name: details.to_name,  // Agregada la variable para el destinatario
        tipoDeCarga: details.tipoDeCarga,
        domicilioEntrega_calle: details.domicilioEntrega_calle,
        domicilioEntrega_numero: details.domicilioEntrega_numero,
        domicilioEntrega_localidad: details.domicilioEntrega_localidad,
        domicilioEntrega_provincia: details.domicilioEntrega_provincia,
        fechaEntrega: details.fechaEntrega,
        domicilioRetiro_calle: details.domicilioRetiro_calle,
        domicilioRetiro_numero: details.domicilioRetiro_numero,
        domicilioRetiro_localidad: details.domicilioRetiro_localidad,
        domicilioRetiro_provincia: details.domicilioRetiro_provincia,
        fechaRetiro: details.fechaRetiro,
      }
    )
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch((err) => {
      console.log("FAILED...", err);
    });
};

