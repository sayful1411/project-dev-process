//
// ✅✅✅  Steps: POS APP in Laravel 

// ✅ 3: user profile auth front-end

// 👉👉👉 step 1: create necessary file and folder
// pages/auth/registration.blade.php
// pages/auth/login.blade.php
// pages/auth/send-otp.blade.php
// pages/auth/verify-otp.blade.php
// pages/auth/reset-password.blade.php
// pages/dashboard/profile.blade.php

// 👉👉👉 step 2: pages function in user controller
// function RegistrationPage(){
//     return view('pages.auth.registration');
// }

// function LoginPage(){
//     return view('pages.auth.login');
// }

// function SendOtpPage(){
//     return view('pages.auth.send-otp');
// }

// function VerifyOtpPage(){
//     return view('pages.auth.verify-otp');
// }

// function ResetPasswordPage(){
//     return view('pages.auth.reset-password');
// }

// function UserProfilePage(){
//     return view('pages.dashboard.profile');
// }

// 👉👉👉 step 3: define function

// 👉 define function in Registration page
{/* <script>

async function Registration(){
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let mobile = document.getElementById('mobile').value;
    let password = document.getElementById('password').value;

    if(fname.length === 0){
        errorToast("First Name is Required")
    }
    else if(lname.length === 0){
        errorToast("Last Name is Required")
    }else if(email.length === 0){
        errorToast("Email is Required")
    }else if(mobile.length === 0){
        errorToast("Mobile number is Required")
    }else if(password.length === 0){
        errorToast("Password is Required")
    }else{
        showLoader();
        let response = await axios.post("/user-registration", {
            firstName: fname,
            lastName: lname,
            email: email,
            mobile: mobile,
            password: password
        });
        showLoader();

        if (response.data['status'] === 'success' && response.status === 201) {
            successToast(response.data['message']);
            setTimeout(function(){
                window.location.href = "/login";
            },2000);
        } else {
            errorToast(response.data['message']);
        }
    }
}

</script> */}

// 👉 define function in submitLogin page
{/* <script>

async function submitLogin(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(email.length === 0){
        errorToast("Email is Required")
    }
    else if(password.length === 0){
        errorToast("Password is Required")
    }else{
        try {
            showLoader();
            let response = await axios.post("/user-login", {
                email: email,
                password: password
            });
            hideLoader();

            if (response.data['status'] === 'success' && response.status === 200) {
                successToast(response.data['message']);
                window.location.href = "/dashboard";
            } else {
                errorToast(response.data['message']);
            }
        } catch (error) {
            // Handle the error here
            console.error("An error occurred:", error);
            errorToast("An error occurred. Please try again later.");
        }
    }
}

</script> */}

// 👉 define function in VerifyEmail page
{/* <script>

async function VerifyEmail(){
    let email = document.getElementById('email').value;

    if(email.length === 0){
        errorToast("Please Enter Your Email Address")
    }else{
        showLoader();
        let response = await axios.post("/send-otp", {
            email: email
        });
        hideLoader();

        if (response.data['status'] === 'success' && response.status === 200) {
            successToast(response.data['message']);
            sessionStorage.setItem('email',email);
            setTimeout(function(){
                window.location.href = "/verifyOTP";
            },2000);
        } else {
            errorToast(response.data['message']);
        }
    }
}

</script> */}

// 👉 define function in verifyOTP page
{/* <script>

async function verifyOTP(){
    let otp = document.getElementById('otp').value;

    if(otp.length !== 6){
        errorToast("Invalid OTP")
    }
    else{
        showLoader();
        let response = await axios.post("/verify-otp", {
            otp: otp,
            email: sessionStorage.getItem('email')
        });
        hideLoader();

        if (response.data['status'] === 'success' && response.status === 200) {
            successToast(response.data['message']);
            sessionStorage.clear();
            setTimeout(function(){
                window.location.href = "/resetPassword";
            },1000);
        } else {
            errorToast(response.data['message']);
        }
    }
}

</script> */}

// 👉 define function in ResetPassword page
{/* <script>

async function ResetPassword(){
    let password = document.getElementById('password').value;
    let cpassword = document.getElementById('cpassword').value;

    if(password.length === 0){
        errorToast("Password is Required!")
    }else if(cpassword.length === 0){
        errorToast("Confirm Password is Required!")
    }if(password !== cpassword){
        errorToast("Password not match!")
    }else{
        showLoader();
        let response = await axios.post("/reset-password", {
            password: password
        });
        hideLoader();

        if (response.data['status'] === 'success' && response.status === 200) {
            successToast(response.data['message']);
            setTimeout(function(){
                window.location.href = "/login";
            },1000);
        } else {
            errorToast(response.data['message']);
        }
    }
}

</script> */}

// 👉 define function in profile page
{/* <script>
    profileDetails();
    async function profileDetails() {
        let res = await axios.get("/profile-details");
        if (res.status === 200 && res.data['status'] === "success") {
            let data = res.data['data'];
            document.getElementById('firstName').value = data['firstName'];
            document.getElementById('lastName').value = data['lastName'];
            document.getElementById('email').value = data['email'];
            document.getElementById('mobile').value = data['mobile'];
            document.getElementById('password').value = data['password'];
        } else {
            errorToast(res.data['message']);
        }
    }

    async function UserUpdate(){
        let fname = document.getElementById('firstName').value;
        let lname = document.getElementById('lastName').value;
        let mobile = document.getElementById('mobile').value;
        let password = document.getElementById('password').value;

        if(fname.length === 0){
            errorToast("First Name is Required")
        }
        else if(lname.length === 0){
            errorToast("Last Name is Required")
        }else if(mobile.length === 0){
            errorToast("Mobile number is Required")
        }else if(password.length === 0){
            errorToast("Password is Required")
        }else{
            // showLoader();
            let response = await axios.post("/user-profile-update", {
                firstName: fname,
                lastName: lname,
                mobile: mobile,
                password: password
            });
            // hideLoader();

            if (response.data['status'] === 'success' && response.status === 200) {
                successToast(response.data['message']);
                await profileDetails();
            } else {
                errorToast(response.data['message']);
            }
        }
    }

</script> */}