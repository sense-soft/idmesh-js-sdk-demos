let idmeshClient = null;
const fetchAuthConfig = () => fetch("/auth_config.json");
const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
    idmeshClient = await idmesh.createIdmeshClient({
        domain: config.domain,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        // authorizeTimeoutInSeconds: 5,
    });
};

window.onload = async () => {
    await configureClient();

    updateUI();
    const isAuthenticated = await idmeshClient.isAuthenticated();

    if (isAuthenticated) {
        return;
    }

    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await idmeshClient.handleRedirectCallback();
        updateUI();
        window.history.replaceState({}, document.title, "/");
    }
}

const updateUI = async () => {
    const isAuthenticated = await idmeshClient.isAuthenticated();

    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;

    if (isAuthenticated) {
        document.getElementById("gated-content").classList.remove("hidden");

        document.getElementById(
            "ipt-access-token"
        ).innerHTML = await idmeshClient.getTokenSilently();

        document.getElementById("ipt-user-profile").textContent = JSON.stringify(
            await idmeshClient.getUser()
        );

    } else {
        document.getElementById("gated-content").classList.add("hidden");
    }
}
const login = async () => {
    await idmeshClient.loginWithRedirect({
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });
}

const logout = () => {
    idmeshClient.logout({
        logoutParams: {
            redirect_uri: window.location.origin
        }
    });
};
