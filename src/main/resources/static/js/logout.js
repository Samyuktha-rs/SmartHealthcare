const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        auth.signOut()
            .then(() => {

                console.log("User logged out successfully.");

                window.location.href = "/";

            })
            .catch((error) => {

                console.error("Logout error:", error);

                alert("Unable to logout. Please try again.");

            });

    });

}