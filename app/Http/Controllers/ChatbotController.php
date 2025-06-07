<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
  
    public function handle(Request $request)
    {
        $userQuestion = $request->get('question');

        if (!$userQuestion) {
            return response()->json(['error' => 'Pregunta no proporcionada'], 400);
        }

        $financialData = [
            'ingresos_mensuales' => 1500,
            'gastos_mensuales' => 1100,
            'ahorros_actuales' => 3000,
            'objetivo_financiero' => 'Comprar una casa en 10 años',
        ];

        $context = "Información financiera del usuario:\n" .
                   "- Ingresos mensuales: {$financialData['ingresos_mensuales']} EUR\n" .
                   "- Gastos mensuales: {$financialData['gastos_mensuales']} EUR\n" .
                   "- Ahorros actuales: {$financialData['ahorros_actuales']} EUR\n" .
                   "- Objetivo financiero: {$financialData['objetivo_financiero']}\n\n" .
                   "Teniendo en cuenta esta información, responde a la siguiente pregunta:\n" .
                   $userQuestion;

        $scriptPath = '"Z:/Proyectos/tfg ahora si/Fintrack/langchain-bot/chat.js"';

        $process = proc_open(
            "node $scriptPath",
            [
                0 => ['pipe', 'r'],
                1 => ['pipe', 'w'],
                2 => ['pipe', 'w'],
            ],
            $pipes
        );

        if (is_resource($process)) {
            fwrite($pipes[0], $context);
            fclose($pipes[0]);

            $output = stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            $errorOutput = stream_get_contents($pipes[2]);
            fclose($pipes[2]);

            $returnCode = proc_close($process);

            if ($returnCode !== 0) {
                return response()->json([
                    'error' => 'Error al ejecutar el bot',
                    'details' => $errorOutput,
                ], 500);
            }

            return response()->json(['response' => trim($output)]);
        }

        return response()->json(['error' => 'No se pudo iniciar el proceso Node.js'], 500);
    }
    }
    

