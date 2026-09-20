const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Create Firebase account
    auth.createUserWithEmailAndPassword(email, password)

        .then((userCredential) => {

            const user = userCredential.user;

            // Save user's name in Firebase Authentication
            return user.updateProfile({
                displayName: name
            });
        })

        .then(() => {

            alert("Account created successfully!");

            // Go to dashboard
            window.location.href = "/dashboard";
        })

        .catch((error) => {

            console.error("Registration error:", error);

            if (error.code === "auth/email-already-in-use") {
                alert("This email is already registered.");
            }
            else if (error.code === "auth/invalid-email") {
                alert("Please enter a valid email address.");
            }
            else if (error.code === "auth/weak-password") {
                alert("Password is too weak. Please use a stronger password.");
            }
            else {
                alert(error.message);
            }
        });
});