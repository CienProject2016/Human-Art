var profile;

function onSignIn(googleUser) {
    profile = googleUser.getBasicProfile();

    var req = new XMLHttpRequest();
    req.open("POST", "/login", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4 && req.status == 200) {
            var userData = JSON.parse(req.response);
            if (userData.first) {
                document.getElementById("userName").innerText =
                profile.getName() + " 님 처음 접속하신 것을 환영합니다.";
            }
            else {
                document.getElementById("userName").innerText =
                profile.getName() + " 님 재접속하신 것을 환영합니다.";
            }
        }
    };
    req.send(JSON.stringify({ id: profile.getId() }));

    var dialog = document.getElementById("signInDialog");
    if (dialog.open)
        dialog.close();
};

function onSignOut() {
    console.log("온사인아웃");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        profile = undefined;
        document.getElementById("userName").innerText = "";
        document.getElementById("signInDialog").showModal();
    });
}