<?php

namespace App\Http\Controllers;

use OpenAI\Laravel\Facades\OpenAI;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function query(Request $request)
    {
        $user = Auth::user();
        // 1. Mensaje del usuario
        $message = $request->input('message');
        $prompt = "Eres un asesor financiero personal llamado FinBot. El usuario tiene los siguientes datos:
Edad: {$user->age}
Ingresos: {$user->monthly_income} €
Gastos mensuales:
- Alquiler: {$user->housing_expense} €
- Comida: {$user->food_expense} €
- Transporte: {$user->transport_expense} €
- Ocio: {$user->leisure_expense} €
- Otros: {$user->other_expenses} €

Responde de forma clara y sencilla, con consejos útiles y prácticos.";

        //Llamada a la api 
        $response = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo', // Gratuito
            'messages' => [
                ['role' => 'system', 'content' => $prompt],
                ['role' => 'user', 'content' => $message],
            ],
        ]);
        // 4. Devolver la respuesta
        return response()->json([
            'reply' => $response['choices'][0]['message']['content'],
        ]);
    }
}
