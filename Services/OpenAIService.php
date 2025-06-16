<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAIService
{
    public function generarNewsletter($tema )
    {
        $response = Http::withToken(env('OPENAI_API_KEY'))
        ->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'system', 'content' => 'Eres un redactor profesional de newsletters.'],
                ['role' => 'user', 'content' => "Redacta un email tipo newsletter sobre el tema: $tema. Usa un tono atractivo y profesional, pero siendo breve ten en cuenta que este mensaje es un newsletter por email, añade imágenes si crees conveniente o emojis"],
            ],
            'temperature' => 0.7,
        ]);

        $content = $response->json()['choices'][0]['message']['content'] ?? '';

        if (!$response->ok()) {
            //Esto no va , mirar el log 
            Log::error('Fallo al generar newsletter', ['response' => $response->body()]);
            return "<p>Error al generar el contenido del newsletter.</p>";
        }
       //HTML del email , cambiar luego 
        return "
            <html>
            <head>
                <title>Newsletter sobre $tema</title>
                <style>
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.8;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #2c3e50;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                p {
                    color: #555;
                    font-size: 16px;
                    margin-bottom: 15px;
                }
                a {
                    color: #3498db;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
                </style>
            </head>
            <body>
                <div class='container'>
                <h1>Newsletter sobre $tema</h1>
                <div>
                    " . nl2br(e($content)) . "
                </div>
                </div>
            </body>
            </html>
        ";
    }
}
