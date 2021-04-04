const $form = document.getElementById('form');
const $button = document.getElementById('send');
const $getUser = document.getElementById('getUser1');

$form.addEventListener('send', e => e.preventDefault());
$getUser.addEventListener('click', () => window.location = 'user/1');

$button.addEventListener('click', async e => {
    e.preventDefault();

    const response = await fetch(`/user?${new URLSearchParams(new FormData($form)).toString()}`);
    const result = await response.json();
    document.getElementById('list').innerHTML =
    result.length > 0 ? result.map(item => `<li>${item}</li>`).join('') : '<p>Nothing found</p>';
});
