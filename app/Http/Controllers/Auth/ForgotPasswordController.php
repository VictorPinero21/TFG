<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\PasswordResetMail;

class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);
    
        // Aquí normalmente crearías un token y guardarlo en la tabla password_resets
        $token = Str::random(60);
    
        // Genera la URL con el token (ajusta la ruta según tus rutas)
        $resetUrl = url('/password/reset', $token) . '?email=' . urlencode($request->email);
    
        // Envía el correo
        Mail::to($request->email)->send(new PasswordResetMail($resetUrl));
    
        return response()->json(['message' => 'Correo de restablecimiento enviado.']);
    }
}
