#!/bin/bash

# librerías que requiere el proyecto (no incluidas en el repositorio de GutHub)
# Ejecutar este script para instalarlas
npm i express
npm i mysql
npm i ejs
npm i body-parser
npm i dotenv
npm i nodemailer
npm i nodemailer-smtp-transport
npm i socket.io
# Development dependences:
read -p "Desea instalar dependencias? (si/no) " user

if [ "$user" == "si" ] || [ "$user" == "SI" ]; then
	echo "Instalando dependencias de desarrollo . . ."
	npm i nodemon
else
	echo "No se instalarán las dependencias de desarrollo";
	sleep 2;
	clear
fi

