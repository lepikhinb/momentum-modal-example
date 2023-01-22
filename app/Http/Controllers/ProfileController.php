<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit()
    {
        /** @var \App\Models\User */
        $user = auth()->user();

        return Inertia::modal('Profile/Show')
            ->with([
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'deleted_at' => $user->deleted_at,
                ],
            ])
            ->baseRoute('dashboard');
    }

    public function update()
    {
        /** @var \App\Models\User */
        $user = auth()->user();

        if (App::environment('demo') && $user->isDemoUser()) {
            return Redirect::back()->with('error', 'Updating the demo user is not allowed.');
        }

        Request::validate([
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'email' => ['required', 'max:50', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable'],
        ]);

        $user->update(Request::only('first_name', 'last_name', 'email'));

        return Redirect::back()->with('success', 'User updated.');
    }
}
