<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\SubscriptionPlan;

class ProfileController extends Controller
{
  
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'authUser' => $request->user(),
            'plans' => SubscriptionPlan::all(['id', 'name']),
        ]);
    }
    


    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
    
      
        $validated = $request->validated();
    
       
        $validated['newsletter'] = $request->boolean('newsletter');
    
        // Asignar los datos validados
        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'age' => $validated['age'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'subscription_plan_id' => $validated['subscription_plan_id'] ?? null,
            'newsletter' => $validated['newsletter'],
        ]);
    
     
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
        }
    
        // Resetear verificación si cambia el correo
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
    
  
        $user->save();
    
        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }
    

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
