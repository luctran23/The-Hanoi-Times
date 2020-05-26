document.addEventListener('DOMContentLoaded', function(e) {
    var input = document.getElementById('input');
    input.addEventListener('change', saveKey);
    input.value = sessionStorage.getItem('draft');

    function saveKey(){
        sessionStorage.setItem('draft', input.value);
    }
})

