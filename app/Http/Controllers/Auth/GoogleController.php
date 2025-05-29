<?php 

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Exception;
use App\Models\User;
class GoogleController extends Controller
{
    public function redirectToGoogle (Request $request) {
        return Socialite::driver('google')->redirect();
    }

   
    public function handleGoogleCallback(Request $request)
    {
        try {
            // Obtener el usuario desde Google
            $user = Socialite::driver('google')->user();
    
            // Hacer algo con el usuario, como iniciar sesión o crear uno nuevo
            dd($user);  // Esto te permitirá inspeccionar el objeto $user
            $finduser = User::where('google_id', $user->id)->first();
            if ($finduser) {
                Auth::login($finduser);
            } else {
               User::create([
                "name"=> $user->name,
                "email"=> $user->email,
                "google_id"=> $user->id,
                "password"=> encrypt("1234"),
                ]);
                 Auth::login($finduser);
            
                return redirect()->route('home');
            }
    
        } catch (Exception $e) {
            // Capturar cualquier error y devolver el mensaje de error
            return redirect()->route('login')->with('error', 'Error al intentar autenticarte con Google: ' . $e->getMessage());
        }
    } 
    
        
  /*
  En este contexto, dd($user); te permitirá inspeccionar los datos del usuario autenticado que Google devuelve, como:
Nombre del usuario.
Correo electrónico.
ID único de Google.
Token de acceso, entre otros
*/
   


}