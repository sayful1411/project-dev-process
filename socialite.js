//
// ✅ Steps :Google Login Authentication in Laravel (Laravel, Socialite, Breeze/Jetstream)
// 👉 Step 1: fresh laravel project
// 👉 Step 2: install breeze / jetstream
// 👉 Step 3: install socialite
// 	 - composer require laravel/socialite

// 👉 Step 4: update user migration file 
// $table->string('nickname')->nullable();
// $table->string('google_id')->nullable();
// $table->string('auth_type')->nullable();

// 👉 Step 5: update user model
// protected $fillable = [
//         'google_id',
//         'auth_type',
// ];

// 👉 Step 6: setup .env
// GOOGLE_CLIENT_ID=
// GOOGLE_CLIENT_SECRET=
// GOOGLE_CALLBACK_URI=http://127.0.0.1:8000/auth/google/callback

// 👉 Step 7: setup config/service.php
// 'google' => [
//         'client_id' => env('GOOGLE_CLIENT_ID'),
//         'client_secret' => env('GOOGLE_CLIENT_SECRET'),
//         'redirect' => env('GOOGLE_CALLBACK_URI'),
// ],

// 👉 Step 8: setup GoogleController
// public function redirect()
//     {
//         return Socialite::driver('google')->redirect();
//     }

//     public function callback()
//     {
//         try {
//             $user = Socialite::driver('google')->user();
//             // dd($user);

//             $googleUser = User::updateOrCreate([
//                 'google_id' => $user->id,
//             ],[
//                 'name' => $user->name,
//                 'email' => $user->email,
//                 'auth_type' => 'google',
//                 'password' => Hash::make(Str::random(10))
//             ]);

//             Auth::login($googleUser);

//             return redirect()->route('dashboard');
//         } catch(Exception $e) {
//             // dd($e->getMessage());
//         }
// }

// 👉 Step 9: setup route
// Route::get( 'auth/google', [GoogleController::class, 'redirect'] )->name( 'google.login' );
// Route::get( 'auth/google/callback', [GoogleController::class, 'callback'] );


// ✅ # how to generate google client_id and client_secret
// 👉 Step 1: go to - https://console.developers.google.com/apis
// 👉 Step 2: click on Select a project, create a New Project, then press on Create button
// 👉 Step 3: On the left side of the screen, click on the OAuth consent screen, then choose the External radio button and click on Create button
// 👉 Step 4: Define Application name, User Support email, App domain, Developer contact information, then click on the Save and Continue button
// 👉 Step 5: Click on Credentials, then click on the CREATE CREDENTIALS button; after the dropdown opens, click on the OAuth client ID
// 👉 Step 6: After the Create OAuth the client ID page opens; fill Application type and App Name
// 👉 Step 7: add the site path in the Authorized JavaScript origins tab and then add the path in the Authorized redirect URIs
// 👉 Step 8: Now, the google OAuth client id and secret key created.