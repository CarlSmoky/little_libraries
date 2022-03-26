import { getAuth, signInWithCustomToken } from "firebase/auth";

const firebaseSignIn = (firebaseToken) => {
  // const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY0ODMxMTg2OSwiZXhwIjoxNjQ4MzE1NDY5LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mcHgwaUBsaXR0bGUtbGlicmFyaWVzLWVhM2NiLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstZnB4MGlAbGl0dGxlLWxpYnJhcmllcy1lYTNjYi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6InRlc3QtdWlkIn0.x4kYz1yC0XQKBfYA7bbGVGTNjmIRaVlP-bBW40UrDEfpeVCpCUt7O9BCAUD1CSSHHfyd1JA0dLQij28U4TF7SUUpvR8QaDpcQvPdnSTiQTUFi_JLgIyptsgeNyWNh6r98usVGrJUU-1yDLk2hFqcnr3tJ4kJC2yXysO7rd6zbYHN5r9kSkF-t2VwXCSQEhVGBO1MTN7VbLXzfdOpTT-brnKdIy9gq_0Ju355U_MLuetHQKy6lwBW2WQgK4B0Nmm88gAD7vRa_INWJr2MbZH6gv2qBc-v-Q4B6WUo_HbZfx5joWN7VIq8JMe1uP9yJYquwLHPxA74mGNhOjQkk31xuw"

  // const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY0ODMxNjc3MSwiZXhwIjoxNjQ4MzIwMzcxLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mcHgwaUBsaXR0bGUtbGlicmFyaWVzLWVhM2NiLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstZnB4MGlAbGl0dGxlLWxpYnJhcmllcy1lYTNjYi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6InRlc3QtdWlkIn0.qxPUQ-9IpKp1mJ7ybJ2KgLSH_ns5T_QsW3SXqCIHhTOH3307qoYS9HRxASB58pn4jQL6cGz8NFmFu3MBmbml7M_OtQd_Y_vtpocCQvz2bC6Fh29M_ckYP6YAYvgsUWMDPCFqzO5DApT2VNehLJ-HP5MQDmCA8wpB8Z-Y68150QaOsbuBzZKOhnHzDRKBk4ZXO4TpEYOc9RpeZHoxnv3Xy8oPT4ApUaVUrVbycg-1BE6rmhZnH_IuSzWcnkKW3OqxM4yVIlSt6Auo7Kh6wbYIrlxcEhJHQpxNfObp398qx_Hh5gJOGCiQYc9thfU5JSJQOIpwrdL5W6rHNnkNqtS_jw"
  const auth = getAuth();
  signInWithCustomToken(auth, firebaseToken)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("success", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("failed", errorMessage);
    });
}

export default firebaseSignIn;
