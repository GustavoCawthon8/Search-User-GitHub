async function buscarUsuario() {
    const username = document.getElementById('username').value;
    const userInfo = document.getElementById('userInfo');
    const avatar= document.getElementById('avatar');
    const bio = document.getElementById('bio');
    const repos = document.getElementById('repos');
    const name = document.getElementById('name');

    if(!username) return;

    userInfo.classList.add("hidden");
    repos.innerHTML = "";

    try{
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if(!userRes.ok) throw new Error("Erro ao buscar usuário");
        const user = await userRes.json();
        //console.log(user)

        avatar.src = user.avatar_url;
        name.textContent = user.name;
        bio.textContent = user.bio;
        userInfo.classList.remove("hidden");

        const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
        const repo = await repoRes.json();

        repo.forEach(r => {
            const link = document.createElement("a");
            link.href = r.html_url;
            link.target = "_blank";
            link.className = "block bg-gray-200 p-3 rounded hover:bg-blue-100 transition mb-2"
            link.textContent = r.name;
            repos.appendChild(link);
        })


    }catch(err){
        console.log(err);
    }


   
   

}
