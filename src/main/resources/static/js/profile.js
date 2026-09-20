auth.onAuthStateChanged(function (user) {

    if (!user) {
        window.location.href = "/";
        return;
    }

    console.log("Logged-in user:", user);

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const profileEmailDetails =
        document.getElementById("profileEmailDetails");

    const profileUid =
        document.getElementById("profileUid");


    // Display name
    if (user.displayName) {

        profileName.textContent =
            user.displayName;

    } else {

        profileName.textContent =
            "SmartHealthcare User";

    }


    // Email
    profileEmail.textContent =
        user.email;

    profileEmailDetails.textContent =
        user.email;


    // User ID
    profileUid.textContent =
        user.uid;

});