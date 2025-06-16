<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Resend\Laravel\Facades\Resend;

class ForgotPasswordController extends Controller
{
    
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Forzar usar el mailer 'resend'
        config(['mail.default' => 'resend']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Reset link sent via Resend!']);
        } else {
            return response()->json(['error' => 'Unable to send reset link.'], 400);
        }
    }
}
