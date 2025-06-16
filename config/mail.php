<?php

return [

    'default' => env('MAIL_MAILER', 'resend'), 

    'mailers' => [
        'smtp' => [
            'transport' => 'smtp',
            'host' => env('MAIL_HOST', 'smtp.mailtrap.io'),
            'port' => env('MAIL_PORT', 2525),
            'encryption' => env('MAIL_ENCRYPTION', null),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'timeout' => null,
            'auth_mode' => null,
        ],
        'resend' => [
            'transport' => 'resend',
            'api_key' => env('RESEND_API_KEY'), // API key de Resend en .env
        ],
        'ses' => [
            'transport' => 'ses',
        ],
        'mailgun' => [
            'transport' => 'mailgun',
        ],
        'postmark' => [
            'transport' => 'postmark',
        ],
        'sendmail' => [
            'transport' => 'sendmail',
            'path' => '/usr/sbin/sendmail -bs',
        ],
        'log' => [
            'transport' => 'log',
            'channel' => env('MAIL_LOG_CHANNEL'),
        ],
        'array' => [
            'transport' => 'array',
        ],
    ],

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'support@fintrack.space'),
        'name' => env('MAIL_FROM_NAME', 'Fintrack'),
    ],

    'markdown' => [
        'theme' => 'default',

        'paths' => [
            resource_path('views/vendor/mail'),
        ],
    ],

];
