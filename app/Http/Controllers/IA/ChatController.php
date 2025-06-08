<?php

namespace App\Http\Controllers\IA;

use OpenAI\Laravel\Facades\OpenAI;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Income;
use App\Models\Expense;

class ChatController extends Controller
{
    public function query(Request $request)
    {
        $user = Auth::user();
        $userId = $user->id;

        // Datos de usuario y finanzas (igual que antes)
        $monthly_income = Income::where('user_id', $userId)->sum('amount') ?: 'desconocido';
        $total_expenses = Expense::where('user_id', $userId)->sum('amount') ?: 'desconocido';

        $housing_expense = Expense::where('user_id', $userId)->where('category', 'Alquiler')->sum('amount') ?: 'desconocido';
        $food_expense = Expense::where('user_id', $userId)->where('category', 'Comida')->sum('amount') ?: 'desconocido';
        $transport_expense = Expense::where('user_id', $userId)->where('category', 'Transporte')->sum('amount') ?: 'desconocido';
        $leisure_expense = Expense::where('user_id', $userId)->where('category', 'Ocio')->sum('amount') ?: 'desconocido';
        $other_expenses = Expense::where('user_id', $userId)
            ->whereNotIn('category', ['Alquiler', 'Comida', 'Transporte', 'Ocio'])
            ->sum('amount') ?: 'desconocido';

        $edad = $user->edad ?? 'desconocida';

        // Recoger inputs
        $message = $request->input('message');
        $history = $request->input('history', []);

        // Construir prompt base con info financiera
        $prompt = <<<EOT
Eres un asesor financiero personal llamado FinBot, experto en ayudar a personas a gestionar su dinero de manera eficiente y práctica. El usuario tiene los siguientes datos aproximados:

- Edad: {$edad}
- Ingresos mensuales: {$monthly_income} €
- Gastos mensuales totales aproximados: {$total_expenses} €

Los gastos mensuales están distribuidos en las siguientes categorías:

- Alquiler: {$housing_expense} €
- Comida: {$food_expense} €
- Transporte: {$transport_expense} €
- Ocio: {$leisure_expense} €
- Otros: {$other_expenses} €

Basándote en estos datos, ofrece consejos claros, personalizados y prácticos para ahorrar, optimizar gastos y mejorar la salud financiera del usuario.

Además:

- Explica por qué son importantes ciertos hábitos financieros.
- Propón metas financieras realistas y alcanzables.
- Sugiere herramientas o métodos para controlar y mejorar el presupuesto.
- Si los gastos superan a los ingresos, ofrece estrategias para equilibrar la situación.
- Sé positivo y motivador, adaptando el tono a que el usuario pueda entenderlo fácilmente.

Cuando el usuario te haga preguntas, responde con base en estos datos y consejos.
EOT;

        // Armar array de mensajes para OpenAI, empezando por sistema con prompt
        $chatMessages = [
            ['role' => 'system', 'content' => $prompt]
        ];

        // Agregar el historial (memoria)
        foreach ($history as $entry) {
            $role = $entry['role'] === 'bot' ? 'assistant' : 'user';
            $chatMessages[] = [
                'role' => $role,
                'content' => $entry['content'],
            ];
        }

        // Finalmente agregar el mensaje actual del usuario
        $chatMessages[] = [
            'role' => 'user',
            'content' => $message,
        ];

        // Llamar a la API OpenAI
        $response = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => $chatMessages,
        ]);

        return response()->json([
            'reply' => $response['choices'][0]['message']['content'],
        ]);
    }
}
