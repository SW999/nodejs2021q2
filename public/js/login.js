const $form = document.getElementById('form');
const $login = document.getElementById('login');

$form.addEventListener('send', e => e.preventDefault());

$login.addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData($form);
  const options = {
    method: 'POST',
    body: formData
  };
  try {
    const response = await fetch('/login', options);
    const result = await response.json();

    if (result.error) {
      alert(result.error);
    } else {
      sessionStorage.setItem('jwt', `Bearer ${result}`);
      setTimeout(() => location.reload(), 100);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
