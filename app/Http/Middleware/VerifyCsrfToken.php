<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * URIs que no requieren verificación CSRF.
     *
     * @var array<int, string>
     */
    protected $except = [
        // Puedes excluir rutas aquí si quieres, ej:
        // 'api/*',
        // '/api/chatbot',
    ];
}
