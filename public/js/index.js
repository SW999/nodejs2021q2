const forms = document.querySelectorAll('form');
const $form = document.getElementById('form');
const $getUser = document.getElementById('getUserForm');
const $createForm = document.getElementById('createForm');
const $updateForm = document.getElementById('updateForm');
const $deleteForm = document.getElementById('deleteForm');
const $get = document.getElementById('getUserById');
const $send = document.getElementById('send');
const $create = document.getElementById('create');
const $update = document.getElementById('update');
const $delete = document.getElementById('delete');

const $getGroup = document.getElementById('getGroupById');
const $groupForm = document.getElementById('getGroupForm');

forms.forEach(item => {
    item.addEventListener('send', e => e.preventDefault());
});

$get.addEventListener('click', async e => {
    e.preventDefault();
    const formData = new FormData($getUser);

    const response = await fetch(`/users/${formData.get('id')}`);
    const result = await response.json();
    document.getElementById('userById').innerHTML = JSON.stringify(result, null, 4);
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

// ************* Groups *************
$getGroup.addEventListener('click', async e => {
    e.preventDefault();
    const formData = new FormData($groupForm);
    const id = formData.get('id');
    const url = id ? `/groups/${id}` : '/groups';

    const response = await fetch(url);
    const result = await response.json();
    document.getElementById('groupById').innerHTML = JSON.stringify(result, null, 4);
});
