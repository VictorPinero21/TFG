<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\OpenAIService; 
use Resend\Laravel\Facades\Resend;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class EnviarNewsletterSemanal implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $openai = new OpenAIService();
        $contenido = $openai->generarNewsletter('Últimas noticias económicas internacionales');
          
        //El pluck es para sacar la columna que cumpla la condicion anterior , es decir , donde el usuario tenga la columna news a true , devuelveme los emails
        $usuarios = User::where('newsletter', true)->pluck('email');

        foreach ($usuarios as $email) {
            Resend::emails()->send([
                'from' => 'support@fintrack.space',
                'to' => [$email],
                'subject' => '📰 Tu newsletter semanal de economía',
                'html' => "<html><body>$contenido</body></html>",
            ]);
        }
    }
}
