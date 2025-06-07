@component('mail::message')
# Restablecer contraseña

Haz click en el botón para restablecer tu contraseña.

@component('mail::button', ['url' => $resetUrl])
Restablecer Contraseña
@endcomponent

Gracias,<br>
{{ config('app.name') }}
@endcomponent
