document.addEventListener('DOMContentLoaded', async () => {
  const divNotes = document.getElementById('notes-list-form-inner');
  const btnAddNote = document.getElementById('btn-add-note');

  btnAddNote.addEventListener('click', (e) => {
    divNotes.insertAdjacentHTML('beforeend', `
      <div class="card notes-list-item">
        <div class="card-header">
          Note 1
          <button type="button" class="btn btn-sm btn-outline-danger">Delete</button>
        </div>
        <div class="card-body">
          <input type="text" class="form-control card-title" value="Note title"></input>
          <textarea class="form-control card-text" rows="3" name="note1">Note text</textarea>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    `);
  });

  const response = await fetch('/notes/notes.php?json=true');
  const notes = await response.json();

  divNotes.innerHTML = `${
    notes.map((note, index) => `
      <div class="card notes-list-item">
        <div class="card-header">
          Note ${index + 1}
          <button id="delete-card-${index + 1}" type="button" class="btn btn-sm btn-outline-danger">Delete</button>
        </div>
        <div class="card-body">
          <input type="text" class="form-control card-title" value="${note}"></input>
          <textarea class="form-control card-text" rows="3" name="note${index + 1}">${note}</textarea>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    `).join('')
  }`;
});
