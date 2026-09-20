const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)

        .then((userCredential) => {

            console.log("Login successful:", userCredential.user.email);

            window.location.href = "/dashboard";
        })

        .catch((error) => {

            console.error("Login error:", error);

            if (error.code === "auth/invalid-credential") {
                alert("Invalid email or password.");
            }
            else if (error.code === "auth/user-not-found") {
                alert("No account found with this email.");
            }
            else if (error.code === "auth/wrong-password") {
                alert("Incorrect password.");
            }
            else if (error.code === "auth/invalid-email") {
                alert("Please enter a valid email address.");
            }
            else {
                alert(error.message);
            }
        });
});