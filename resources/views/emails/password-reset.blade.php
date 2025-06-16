<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Restablecer contraseña</title>
</head>
<body>
    <h2>Hola,</h2>
    <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para continuar:</p>
    <p>
        <a href="{{ $resetUrl }}" style="display:inline-block;padding:10px 20px;background-color:#4f46e5;color:#fff;text-decoration:none;border-radius:5px;">
            Restablecer Contraseña
        </a>
    </p>
    <p>Si no solicitaste esto, puedes ignorar este correo.</p>
    <p>Gracias,<br>El equipo de {{ config('app.name') }}</p>
</body>
</html>
