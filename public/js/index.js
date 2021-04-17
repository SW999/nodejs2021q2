const forms = document.querySelectorAll('form');
const $form = document.getElementById('form');
const $createForm = document.getElementById('createForm');
const $updateForm = document.getElementById('updateForm');
const $deleteForm = document.getElementById('deleteForm');
const $send = document.getElementById('send');
const $create = document.getElementById('create');
const $update = document.getElementById('update');
const $delete = document.getElementById('delete');
const $getUser = document.getElementById('getUser1');

$getUser.addEventListener('click', async e => {
    e.preventDefault();
    const response = await fetch('/users/1');
    const result = await response.json();
    document.getElementById('user1').innerHTML = JSON.stringify(result, null, 4);
});

forms.forEach(item => {
    item.addEventListener('send', e => e.preventDefault());
});

$create.addEventListener('click', async e => {
    e.preventDefault();

    const formData = new FormData($createForm);
    formData.append('isDeleted', false);
    const options = {
        method: 'POST',
        body: formData
    };
    try {
        const response = await fetch('/users', options);
        const result = await response.json();
        document.getElementById('newUser').innerHTML = JSON.stringify(result, null, 4);
    } catch (error) {
        console.error('Error:', error);
    }
});


$update.addEventListener('click', async e => {
    e.preventDefault();

    const formData = new FormData($updateForm);
    formData.append('isDeleted', false);
    const options = {
        method: 'PUT',
        body: formData
    };
    try {
        const response = await fetch(`/users/${formData.get('id')}`, options);
        const result = await response.json();
        document.getElementById('updatedUser').innerHTML = JSON.stringify(result, null, 4);
    } catch (error) {
        console.error('Error:', error);
    }
});

$delete.addEventListener('click', async e => {
    e.preventDefault();

    const formData = new FormData($deleteForm);
    const options = {
        method: 'DELETE'
    };
    try {
        const response = await fetch(`/users/${formData.get('id')}`, options);
        const result = await response.json();
        document.getElementById('deletedUser').innerHTML = JSON.stringify(result, null, 4);
    } catch (error) {
        console.error('Error:', error);
    }
});

$send.addEventListener('click', async e => {
    e.preventDefault();

    try {
        const response = await fetch(`/users?${new URLSearchParams(new FormData($form)).toString()}`);
        const result = await response.json();
        document.getElementById('list').innerHTML =
          result.length > 0 ? result.map(item => `<li>${item}</li>`).join('') : '<p>Nothing found</p>';
    } catch (error) {
        console.error('Error:', error);
    }
});
