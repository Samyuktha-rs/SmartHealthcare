auth.onAuthStateChanged(function (user) {

    if (!user) {
        window.location.href = "/";
        return;
    }

    console.log("Logged-in user:", user.email);

    db.collection("healthData")
        .where("userId", "==", user.uid)
        .get()

        .then((snapshot) => {

            const historyBody =
                document.getElementById("historyBody");

            historyBody.innerHTML = "";

            if (snapshot.empty) {

                historyBody.innerHTML = `
                    <tr>
                        <td colspan="5" style="padding:20px;">
                            No health records found.
                        </td>
                    </tr>
                `;

                return;
            }


            // Convert Firebase documents into an array

            const records = [];

            snapshot.forEach((doc) => {

                records.push(doc.data());

            });


            // Sort newest record first

            records.sort((a, b) => {

                const timeA = a.timestamp
                    ? a.timestamp.toMillis()
                    : 0;

                const timeB = b.timestamp
                    ? b.timestamp.toMillis()
                    : 0;

                return timeB - timeA;

            });


            // Display records

            records.forEach((data) => {

                let dateText = "No date";

                if (data.timestamp) {

                    dateText =
                        data.timestamp
                            .toDate()
                            .toLocaleString("en-IN");

                }


                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td style="padding:15px;">
                        ${dateText}
                    </td>

                    <td style="padding:15px;">
                        ${data.heartRate} BPM
                    </td>

                    <td style="padding:15px;">
                        ${data.bloodPressure} mmHg
                    </td>

                    <td style="padding:15px;">
                        ${data.oxygenLevel}%
                    </td>

                    <td style="padding:15px;">
                        ${data.temperature} °C
                    </td>

                `;


                historyBody.appendChild(row);

            });

        })

        .catch((error) => {

            console.error(
                "Error loading health history:",
                error
            );

            document.getElementById(
                "historyBody"
            ).innerHTML = `

                <tr>

                    <td colspan="5" style="padding:20px;">

                        Error loading health records.

                    </td>

                </tr>

            `;

        });

});