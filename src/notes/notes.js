class $NoteCard {
  constructor(id, text, title) {
    this.id = id;
    this.text = text;
    this.title = title;

    this.element = document.createElement('div');
    this.element.classList.add('divNoteCard', 'card', 'notes-list-item');
    this.element.innerHTML = `
      <div class="card-header">
        Note ${id}
        <button id="delete-card-${id}" type="button" class="btnDeleteCard btn btn-sm btn-outline-danger">Delete</button>
      </div>
      <div class="card-body">
        <input type="text" class="form-control card-title" value="${title}"></input>
        <textarea class="form-control card-text" rows="3" name="note${id}">${text}</textarea>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    `;
  }

  setOnDeleteButton(handler) {
    const deleteButton = this.element.getElementsByClassName('btnDeleteCard').item(0);

    if (deleteButton) {
      deleteButton.addEventListener('click', () => handler(this.element));
    }

    return this;
  }

  getElement() {
    return this.element;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const divNotes = document.getElementById('notes-list-form-inner');
  const btnAddNote = document.getElementById('btn-add-note');

  btnAddNote.addEventListener('click', () => {
    const id = divNotes.childElementCount + 1;

    divNotes.insertAdjacentElement(
      'beforeend', 
      new $NoteCard(id, 'Note text', 'Note title')
        .setOnDeleteButton((element) => element.remove())
        .getElement()
    );
  });

  const response = await fetch('/notes/notes.php?json=true');
  const notes = await response.json();

  divNotes.innerHTML = '';
  notes.forEach((note, index) => {
    divNotes.appendChild(
      new $NoteCard(index + 1, note, note)
        .setOnDeleteButton((element) => element.remove())
        .getElement()
    );
  });
});
