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
const $createGroup = document.getElementById('createGroup');
const $createGroupForm = document.getElementById('createGroupForm');
const $updateGroup = document.getElementById('updateGroup');
const $updateGroupForm = document.getElementById('updateGroupForm');
const $deleteGroup = document.getElementById('deleteGroup');
const $deleteGroupForm = document.getElementById('deleteGroupForm');

const $addUserToGroupForm = document.getElementById('addUserToGroupForm');
const $addUserToGroup = document.getElementById('addUserToGroup');
const getHeader = () => {
  const token = sessionStorage.getItem('jwt');
  return token ? {  headers: {
    'mode': 'corse',
    'Authorization': token
  } } : {};
};

forms.forEach(item => {
  item.addEventListener('send', e => e.preventDefault());
});

// ************* Users *************
$get.addEventListener('click', async e => {
  e.preventDefault();
  const formData = new FormData($getUser);
  const id = formData.get('id');
  const url = id ? `/users/${id}` : '/users';

  const response = await fetch(url, { ...getHeader() });
  const result = await response.json();
  document.getElementById('userById').innerHTML = JSON.stringify(result, null, 2);
});

$create.addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData($createForm);
  formData.append('isDeleted', false);
  const options = {
    method: 'POST',
    body: formData,
    ...getHeader()
  };

  try {
    const response = await fetch('/users', options);
    const result = await response.json();
    document.getElementById('newUser').innerHTML = JSON.stringify(result, null, 2);
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
    body: formData,
    ...getHeader()
  };
  const id = formData.get('id') ? formData.get('id') : null;
  try {
    const response = await fetch(`/users/${id}`, options);
    const result = await response.json();
    document.getElementById('updatedUser').innerHTML = JSON.stringify(result, null, 2);
  } catch (error) {
    console.error('Error:', error);
  }
});

$delete.addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData($deleteForm);
  const options = {
    method: 'DELETE',
    ...getHeader()
  };
  try {
    const response = await fetch(`/users/${formData.get('id')}`, options);
    const result = await response.json();
    document.getElementById('deletedUser').innerHTML = JSON.stringify(result, null, 2);
  } catch (error) {
    console.error('Error:', error);
  }
});

$send.addEventListener('click', async e => {
  e.preventDefault();
  const formData = new FormData($form);
  const options = {
    method: 'POST',
    body: formData,
    ...getHeader()
  };

  try {
    const response = await fetch('/users/selected', options);
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
  let result;
  try {
    const response = await fetch(url, { ...getHeader() });
    result = await response.json();
  } catch (error) {
    result = { error: error.message };
  } finally {
    document.getElementById('groupById').innerHTML = JSON.stringify(result, null, 2);
  }
});

$createGroup.addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData($createGroupForm);
  const options = {
    method: 'POST',
    body: formData,
    ...getHeader()
  };
  let result;
  try {
    const response = await fetch('/groups', options);
    result = await response.json();
    document.getElementById('newGroup').innerHTML = JSON.stringify(result, null, 2);
  } catch (error) {
    result = { error: error.message };
  } finally {
    document.getElementById('newGroup').innerHTML = JSON.stringify(result, null, 2);
  }
});

$updateGroup.addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData($updateGroupForm);
  const options = {
    method: 'PUT',
    body: formData,
    ...getHeader()
  };
  const id = formData.get('id') ? formData.get('id') : null;
  let result;
  try {
    const response = await fetch(`/groups/${id}`, options);
    result = await response.json();
  } catch (error) {
    result = { error: error.message };
  } finally {
    document.getElementById('updatedGroup').innerHTML = JSON.stringify(result, null, 2);
  }
});

$deleteGroup.addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData($deleteGroupForm);
  const options = {
    method: 'DELETE',
    ...getHeader()
  };
  try {
    const response = await fetch(`/groups/${formData.get('id')}`, options);
    document.getElementById('deletedGroup').innerHTML = response.ok ? 'Deleted' : response.statusText;
  } catch (error) {
    console.error('Error:', error);
  }
});

$addUserToGroup.addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData($addUserToGroupForm);
  const options = {
    method: 'POST',
    body: formData,
    ...getHeader()
  };
  try {
    const response = await fetch('/groups/user_groups', options);
    const result = await response.json();
    document.getElementById('userToGroup').innerHTML = JSON.stringify(result, null, 2);
  } catch (error) {
    console.error('Error:', error);
  }
});
