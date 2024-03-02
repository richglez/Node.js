async function loadData() {
    try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await resp.json();
        console.log(data);
    } 
    catch (error) {
        console.log(error)
    }
}

loadData();
