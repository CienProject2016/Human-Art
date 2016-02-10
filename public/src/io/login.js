var profile;

function onSignIn(googleUser) {
    profile = googleUser.getBasicProfile();
    console.log(profile.getId() + " 님이 로그인하셨습니다.");
    document.getElementById("userName").innerText = profile.getName() + " 님 접속하신 것을 환영합니다.";
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