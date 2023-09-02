//
// ✅✅✅  Steps: POS APP in Laravel 
// 👉 Step 1: Fresh Laravel project
// 👉 Step 2: setup .env file
// 👉 Step 3: Comment CSRF token middleware from kernel.php for test purposes
// //\App\Http\Middleware\VerifyCsrfToken::class,


// ✅✅✅ Phase 1: 
// User Authentication with JWT Token
// ✅ 1: user profile table
// ✅ 2: user profile auth backend
// ✅ 3: user profile auth front-end

// ✅ 1: user profile table

// 👉 step 1: user table migration
// php artisan make:migration create_users_table

// $table->id();
// $table->string('firstName',50);
// $table->string('lastName',50);
// $table->string('email',50)->unique();
// $table->string('mobile',50);
// $table->string('password',50);
// $table->string('otp',10);
// $table->timestamps();

// 👉 step 2: user model
// php artisan make:model User

// protected $fillable = [
//     'firstName',
//     'lastName',
//     'email',
//     'mobile',
//     'password',
//     'otp'
// ];

// protected  $attributes = [
//     'otp' => '0'
// ];

// ✅ 2: user profile auth backend

// ✅ step 1: user controller
// php artisan make:controller UserController

// 👉👉👉 step 1.1: Registration proccess

// 👉 registration function in user controller
// function UserRegistration(Request $request){
//     try {
//         $user = User::create([
//             'firstName' => $request->input('firstName'),
//             'lastName' => $request->input('lastName'),
//             'email' => $request->input('email'),
//             'mobile' => $request->input('mobile'),
//             'password' => $request->input('password'),
//         ]);

//         return response()->json([
//             'status' => 'success',
//             'message' => 'User Registration Successfully'
//         ],201);

//     } catch (Exception $e){

//         return response()->json([
//             'status' => 'failed',
//             'message' => 'User Registration Failed',
//             // 'message' => $e->getMessage()
//         ]);

//     }
// }

// 👉👉👉 step 1.2: Login proccess

// 👉 install jwt token
// composer require firebase/php-jwt

// 👉 create a folder (Helper) and file (JWTToken.php) 
// app\Helper\JWTToken.php

// 👉 define key in .env
// JWT_KEY = 145ssfSsjfw4Sfe4

// 👉 define functions in JWTToken.php file
// public static function CreateToken($userEmail,$userID):string
// {
//     $key = env('JWT_KEY');

//     $payload = [
//         'iss' => 'laravel-token',
//         'iat' => time(),
//         'exp' => time() + 60*60,
//         'userEmail' => $userEmail,
//         'userID' => $userID
//     ];

//     return JWT::encode($payload,$key,'HS256');
// }

// public static function CreateTokenForSetPassword($userEmail):string
// {
//     $key = env('JWT_KEY');

//     $payload = [
//         'iss' => 'laravel-token',
//         'iat' => time(),
//         'exp' => time() + 60*5,
//         'userEmail' => $userEmail,
//         'userID' => '0'
//     ];

//     return JWT::encode($payload,$key,'HS256');
// }

// public static function VerifyToken($token):object|string
// {
//     try {
//         if($token == null){
//             return 'unauthorized';
//         }else{
//             $key = env('JWT_KEY');
//             $decode = JWT::decode($token,new Key($key,'HS256'));
//             return $decode;
//         }

//     }catch (Exception $e){
//         return 'unauthorized';
//     }
// }

// 👉 login function in user controller
// function UserLogin(Request $request){
//   $count = User::where('email', '=', $request->input('email'))
//           ->where('password', '=', $request->input('password'))
//           ->select('id')->first();

//   if($count !== null){
//       // JWT Token Issue
//       $token = JWTToken::CreateToken($request->input('email'),$count->id);
//       return response()->json([
//           'status' => 'success',
//           'message' => 'User Login Successfully'
//       ],200)->cookie('token',$token,60,'/');
//   }else{
//       return response()->json([
//           'status' => 'failed',
//           'message' => 'Incorrect login credential'
//       ]);
//   }
// }

// 👉👉👉 step 1.3: sent OTP proccess (if forgot password)

// 👉 setup mail config from .env
// https://mailtrap.io/
// MAIL_MAILER=smtp
// MAIL_HOST=sandbox.smtp.mailtrap.io
// MAIL_PORT=2525
// MAIL_USERNAME=302a2d2c198a2e
// MAIL_PASSWORD=********751d

// 👉 create a folder (email) and file (OTPMail.blade.php) 
// resources\views\email\OTPMail.blade.php
// https://codepen.io/abhndv/pen/rNebjGo

// 👉 create and setup mail
// php artisan make:mail OTPMail

// public $otp;
// public function __construct($otp)
// {
//     $this->otp = $otp;
// }

// public function content(): Content
// {
//     return new Content(
//         view: 'email.otp-mail',
//     );
// }

// 👉 sendotp function in user controller
// function SendOTPCode(Request $request){
//     $email = $request->input('email');
//     $otp = rand(100000,999999);
//     $count = User::where('email', '=', $request->input('email'))->count();

//     if($count === 1){
//         // OTP Code Send
//         Mail::to($email)->send(new OTPMail($otp));
//         // OTP Code Update in database
//         User::where('email','=',$email)->update(['otp' => $otp]);

//         return response()->json([
//             'status' => 'success',
//             'message' => '6 digit OTP code has been sent to your email!'
//         ],200);

//     }else{
//         return response()->json([
//             'status' => 'failed',
//             'message' => 'Unauthorized'
//         ]);
//     }
// }

// 👉👉👉 step 1.4: verify otp

// 👉 verifyotp function in user controller
// function VerifyOTP(Request $request){
//     $email = $request->input('email');
//     $otp = $request->input('otp');

//     $count = User::where('email', '=', $request->input('email'))
//                     ->where('otp','=', $request->input('otp'))
//                     ->count();

//     if($count === 1){
//         // OTP update in database
//         User::where('email','=',$email)->update(['otp' => '0']);
//         // JWT Token Issue For Reset Password
//         $token = JWTToken::CreateTokenForSetPassword($request->input('email'));
//         return response()->json([
//             'status' => 'success',
//             'message' => 'OTP Verification Successfully',
//         ],200)->cookie('token',$token,5,'/');
//     }else{
//         return response()->json([
//             'status' => 'failed',
//             'message' => 'unauthorized'
//         ]);
//     }
// }

// 👉👉👉 step 1.5: reset password 

// 👉 create a new middleware 
// php artisan make:middleware TokenVerificationMiddleware

// 👉 define logic in handle function
// $token = $request->cookie('token');
// $result = JWTToken::VerifyToken($token);

// if($result == "unauthorized"){
//     return redirect('/login');
// }else{
//     $request->headers->set('email',$result->userEmail);
//     $request->headers->set('id',$result->userID);
//     return $next($request);
// }

// 👉 reset function in user controller
// function ResetPassword(Request $request){
//     try{
//         $email = $request->header('email');
//         $password = $request->input('password');

//         User::where('email','=', $email)->update(['password' => $password]);

//         return response()->json([
//             'status' => 'success',
//             'message' => 'Password Reset Successfully'
//         ],200);

//     }catch(Exception $e){
//         return response()->json([
//             'status' => 'failed',
//             'message' => 'Something Went Wrong!'
//         ]);
//     }
// }

// 👉👉👉 step 1.6: user profile function in user controller
// function UserProfile(Request $request){
//     $email = $request->header('email');
//     $user = User::where('email','=',$email)->first();

//     return response()->json([
//         'status' => 'success',
//         'message' => 'Request Success',
//         'data' => $user,
//     ],200);
// }

// 👉👉👉 step 1.7: user profile update function in user controller
// function UserProfileUpdate(Request $request){
//     $email = $request->header('email');
//     $user = User::where('email','=',$email)->update([
//         'firstName' => $request->input('firstName'),
//         'lastName' => $request->input('lastName'),
//         'mobile' => $request->input('mobile'),
//         'password' => $request->input('password')
//     ]);

//     return response()->json([
//         'status' => 'success',
//         'message' => 'User Information Updated Successfully'
//     ],200);
// }

// 👉👉👉 step 1.8: user logout function in user controller
// function UserLogout(){
//     return redirect('/login')->cookie('token','',-1);
// }

// ✅ step 2: user route
// 👉 step 2.1: user registration route
// Route::post('/user-registration',[UserController::class,'UserRegistration']);

// 👉 step 2.2: user login route
// Route::post('/user-login',[UserController::class,'UserLogin']);

// 👉 step 2.3: send otp route
// Route::post('/send-otp',[UserController::class,'SendOTPCode']);

// 👉 step 2.4: verify otp route
// Route::post('/verify-otp',[UserController::class,'VerifyOTP']);

// 👉 step 2.5: reset password route
// Route::post('/reset-password',[UserController::class,'ResetPassword'])->middleware([TokenVerificationMiddleware::class]);

// 👉 step 2.6: profile details route
// Route::get('/profile-details',[UserController::class,'UserProfile'])->middleware([TokenVerificationMiddleware::class]);

// 👉 step 2.7: user profile update route
// Route::post('/user-profile-update',[UserController::class,'UserProfileUpdate'])->middleware([TokenVerificationMiddleware::class]);


// ✅ step 3: test in postman
