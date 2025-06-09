<?php
namespace App\Http\Controllers;

use App\Services\OpenAIService;
use Resend\Laravel\Facades\Resend;

class NewsletterController extends Controller
{
   
    public function enviarNewsletter()
    {
        $openai = new OpenAIService();
        $contenido = $openai->generarNewsletter('Últimas tendencias y noticias sobre economía internacional');
    
        // Enviamos el correo directamente
        Resend::emails()->send([
            'from' => 'support@fintrack.space',
            'to' => ['victorpinero21@gmail.com'],
            'subject' => '📰 Tu newsletter semanal sobre economía',
            'html' => "<html><body>$contenido</body></html>",
        ]);
    
        return response()->json(['mensaje' => 'Newsletter enviado']);
    }
    
    

       
    
}

